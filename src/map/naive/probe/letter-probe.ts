/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Probe } from "../../../index";
import { Sample } from "../../../index";
import { Result } from "../../../scan/result";

export class LetterProbe implements Probe {

    private _name = "";

    public constructor(name: string) {
        this._name = name;
    }

    public isComment(): boolean {
        return false;
    }

    public getCandidateName(): string {
        return this._name;
    }

    public isCandidate(sample: Sample): Result {
        let result = this._isAlphabetic(sample.code);

        if (sample.offset > 0) {
            result = result || this._isNumeric(sample.code);
        }

        return result ? 1 : 0;
    }

    private _isAlphabetic(code: number): boolean {
        return (code <= 0x5A && code >= 0x41)
            || (code <= 0x7A && code >= 0x61)
            || code === 0x24  // $
            || code === 0x5F; // _
    }

    private _isNumeric(code: number): boolean {
        return code <= 0x39 && code >= 0x30;
    }
}
