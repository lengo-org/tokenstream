/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Probe } from "../index";
import { ProbeMap } from "../index";
import { Result } from "./result";
import { Token } from "./token";
import { ParseError } from "../err/parse-error";

class VoidToken extends Token {
    public constructor() { super("\0"); }
}

const MAX_TOKEN_LENGTH = 256 * 1024;

export class Scanner {

    private _terminated = 0;

    private _error: Error       = undefined;
    private _probe: Probe       = undefined;
    private _probeMap: ProbeMap = undefined;

    private _srcLine   = 1;
    private _srcColumn = 1;
    private _srcCursor = 0;

    private _buffer       = "";
    private _bufferLength = 0;
    private _bufferIndex  = 0;

    private _rangeBegin = 0;
    private _rangeEnd   = 0;

    private _tokenValue  = "";
    private _tokenLine   = 1;
    private _tokenColumn = 1;
    private _tokenCursor = 0;

    private _lastToken = new VoidToken();
    private _voidToken = this._lastToken;

    private _messages = {
        0: `Token value size exceeds ${MAX_TOKEN_LENGTH} characters`
    };

    public constructor(probeMap: ProbeMap) {
        this._probeMap = probeMap;
    }

    public hasTerminated(): boolean {
        return this._terminated === 1;
    }

    public hasError(): boolean {
        return !(this._error === undefined);
    }

    public getError(): Error {
        return this._error;
    }

    public scan(buffer: string): Token[] {
        let token;
        const tokens: Token[] = [];

        this._initBuffer(buffer);
        this._resetRange();

        if (this._hasProbe()) {
            token = this._continue();

            if (token !== this._voidToken) {
                tokens.push(token);
            }
        }

        while (this._terminated === 0) {
            if (this._bufferIndex >= this._bufferLength) {
                this._updateTokenValue();
                break;
            }

            const code = this._peek();

            if (code === 0x00) {
                this._prepareCandidate();
                tokens.push(this._createToken("END_OF_STREAM", "\0"));
                this._terminated = 1;
                continue;
            }

            if (this._isSkippable(code)) {
                this._next();
                continue;
            }

            this._prepareCandidate();

            if (this._isInvalid(code)) {
                this._createInputError(code);
                break;
            }

            this._installProbe(code);

            if (!this._hasProbe()) {
                this._createInputError(code);
                break;
            }

            token = this._continue();

            if (token !== this._voidToken) {
                tokens.push(token);
            }

            if (this.hasError()) { break; }
        }

        return tokens;
    }

    private _continue(): Token {
        let token = this._voidToken;

        while (this._terminated === 0) {
            if (this._bufferIndex >= this._bufferLength) {
                break;
            }

            const code = this._peek();
            const result = this._isCandidate(code);

            if (result === 1) { // CONTINUE
                this._rangeEnd++;
                this._next();
                continue;
            }

            if (result === 2) { // OVERSHOT
                this._createInputError(code);
                break;
            }

            if (result === 3) { // EOSTREAM
                this._createInputError(code);
                break;
            }

            // RENOUNCE
            token = this._completeToken();
            break;
        }

        return token;
    }

    private _initBuffer(buffer: string): void {
        this._buffer       = buffer;
        this._bufferLength = buffer.length;
        this._bufferIndex  = 0;
    }

    private _prepareCandidate(): void {
        this._tokenValue  = "";
        this._tokenLine   = this._srcLine;
        this._tokenColumn = this._srcColumn;
        this._tokenCursor = this._srcCursor;

        this._rangeBegin  = this._bufferIndex;
        this._rangeEnd    = this._bufferIndex;
    }

    private _resetRange(): void {
        this._rangeBegin = 0;
        this._rangeEnd   = 0;
    }

    private _installProbe(code: number): void {
        this._probe = this._probeMap.obtainProbe(code);
    }

    private _uninstallProbe(): void {
        this._probe = undefined;
    }

    private _hasProbe(): boolean {
        return !(this._probe === undefined);
    }

    private _isCandidate(code: number): Result {
        const offset = this._rangeEnd - this._rangeBegin;

        return this._probe.isCandidate({
            code:   code,
            offset: this._tokenValue.length + offset,
            prev:   this._lastToken
        });
    }

    private _getCandidateName(): string {
        return this._probe.getCandidateName();
    }

    private _updateTokenValue(): void {
        const offset = this._rangeEnd - this._rangeBegin;
        const newLen = this._tokenValue.length + offset;

        if (newLen > MAX_TOKEN_LENGTH) {
            this._createParseError(this._messages[0]);
            return;
        }

        this._tokenValue += this._buffer.substring(
            this._rangeBegin,
            this._rangeEnd
        );
    }

    private _completeToken(): Token {
        this._updateTokenValue();

        const token = this._createToken(
            this._getCandidateName(),
            this._tokenValue
        );

        if (!this._probe.isComment()) {
            this._lastToken = token;
        }

        this._uninstallProbe();
        this._resetRange();

        return token;
    }

    private _createToken(name: string, value: string): Token {
        return new Token(
            name,
            value,
            this._tokenLine,
            this._tokenColumn,
            this._tokenCursor
        );
    }

    private _peek(): number {
        return this._buffer.charCodeAt(this._bufferIndex);
    }

    private _next(): void {

        /* istanbul ignore next */
        if (this._terminated === 1) { return; }

        /* istanbul ignore next */
        if (this._bufferIndex >= this._bufferLength) { return; }

        const code = this._peek();

        this._srcColumn++;
        this._srcCursor++;
        this._bufferIndex++;

        this._srcLine = this._srcLine; // v8

        if (this._isNewLine(code)) {
            this._srcLine++;
            this._srcColumn = 1;
        }
    }

    private _isNewLine(code: number): boolean {
        return code === 0x0A;
    }

    private _isSkippable(code: number): boolean {
        return code === 0x20
            || this._isNewLine(code)
            || code === 0x09;
    }

    private _isInvalid(code: number): boolean {
        if (code > 0x7E) { return true; }
        if (code < 0x20) { return true; }
        return false;
    }

    private _createInputError(code: number): Error {
        let val = "?", hex = "??";

        /* istanbul ignore else */
        if (code !== undefined) {
            val = String.fromCharCode(code);
            hex = code.toString(16);
        }

        return this._createParseError(
            `Unexpected input "${val}" (0x${hex})`
        );
    }

    private _createParseError(message: string): Error {
        const error = new ParseError(
            message,
            this._tokenLine,
            this._tokenColumn,
            this._tokenCursor
        );

        error.stack = error.stack.replace(/\n([^\n]+\n){2}/, "\n");
        return this._error = error;
    }
}
