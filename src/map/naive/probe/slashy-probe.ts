/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Probe } from "../../../index";
import { Sample } from "../../../index";
import { Result } from "../../../scan/result";

// Naive ECMA 262 regular expression recognition assumption:
//
// When one of the following token values is found as the *last character*
// in the previous token (any but not type 'comment') value, a single forward
// slash won't be a division token.

const REGEXP_INDICATOR_SYMBOL = [
    0x00, // VoidToken - at start of stream
    0x21, // !         - exclamation mark
    0x25, // %         - percent
    0x26, // &         - ampersand
    0x28, // (         - opening parenthesis
    0x2B, // +         - plus
    0x2C, // ,         - comma
    0x2D, // -         - minus
    0x3A, // :         - colon
    0x3B, // ;         - semicolon
    0x3C, // <         - lower
    0x3D, // =         - equals
    0x3E, // >         - greater
    0x3F, // ?         - question mark
    0x5B, // [         - opening bracket
    0x5E, // ^         - circumflex
    0x7B, // {         - opening curly brace
    0x7C, // |         - pipe
];

const REGEXP_INDICATOR_KEYWORD = [
    "delete", "instanceof", "in", "new",
    "return", "typeof", "void",
];

export class SlashyProbe implements Probe {

    private _slashSingle = "";
    private _slashEquals = "";
    private _slashDouble = "";
    private _slashAstrsk = "";
    private _slashRegexp = "";

    private _detected = 0;
    private _lastCode = 0;
    private _escaped  = false;
    private _complete = false;
    private _disarmed = false;

    public constructor(
        slashSingle: string,
        slashEquals: string,
        slashDouble: string,
        slashAstrsk: string,
        slashRegexp: string
    ) {
        this._slashSingle = slashSingle;
        this._slashEquals = slashEquals;
        this._slashDouble = slashDouble;
        this._slashAstrsk = slashAstrsk;
        this._slashRegexp = slashRegexp;
    }

    public isComment(): boolean {
        return this._detected === 3 // SLASH_DOUBLE
            || this._detected === 4 // SLASH_ASTRSK;
    }

    public getCandidateName(): string {

        switch (this._detected) {
            case 1: return this._slashSingle; // /
            case 2: return this._slashEquals; // /=
            case 3: return this._slashDouble; // //
            case 4: return this._slashAstrsk; // /* */
            case 5: return this._slashRegexp; // /foo/g
        }

        return "";
    }

    public isCandidate(sample: Sample): Result {
        const offset = sample.offset;

        if (offset === 0) { return this._probeOffset_0(sample); }
        if (offset === 1) { return this._probeOffset_1(sample); }

        return this._probeOffset_2_ff(sample);
    }

    private _probeOffset_0(sample: Sample): Result {
        this._detected = 1; // SLASH_SINGLE;

        if (this._mightBeRegExp(sample)) {
            this._detected = 5 // SLASH_REGEXP;
        }

        this._lastCode = 0;
        this._complete = false;
        this._escaped  = false;
        this._disarmed = false;

        return 1; // CONTINUE
    }

    private _probeOffset_1(sample: Sample): Result {
        const code = sample.code;

        if (code === 0x2F) { this._detected = 3; return 1; } // SLASH_DOUBLE
        if (code === 0x2A) { this._detected = 4; return 1; } // SLASH_ASTRSK

        if (this._detected !== 5) { // SLASH_REGEXP
            if (code === 0x3D) {
                this._detected = 2; // SLASH_EQUALS;
                this._complete = true;
                return 1;
            }
        }

        if (code === 0x5C) { this._escaped = true;  }
        if (code === 0x5B) { this._disarmed = true; }

        return this._detected === 5 // SLASH_REGEXP
            ? 1 : 0;
    }

    private _probeOffset_2_ff(sample: Sample): Result {
        const code = sample.code;
        const detected = this._detected;

        if (this._complete || code === 0x00) {
            return 0;
        }

        if (detected === 3) { // SLASH_DOUBLE
            return code === 0x0A ? 0 : 1;
        }

        if (detected === 4) { // SLASH_ASTRSK
            if (code === 0x2F) {
                this._complete = (this._lastCode === 0x2A);
            }
            this._lastCode = code;
        }

        if (detected === 5) { // SLASH_REGEXP
            this._consumeRegExp(code);
        }

        return 1;
    }

    private _mightBeRegExp(sample: Sample): boolean {
        const value = sample.prev.value;
        const lastCode = value.charCodeAt(value.length - 1);

        return REGEXP_INDICATOR_SYMBOL.indexOf(lastCode) > -1
            || REGEXP_INDICATOR_KEYWORD.indexOf(value) > -1;
    }

    private _consumeRegExp(code: number): void {

        if (this._escaped) { this._escaped = false; return; }

        if (code === 0x5C) { this._escaped = true; return; }
        if (code === 0x5B) { this._disarmed = true; return; }
        if (code === 0x5D) { this._disarmed = false; return; }

        if (code === 0x2F && !this._escaped && !this._disarmed) {
            this._complete = true;
        }
    }
}
