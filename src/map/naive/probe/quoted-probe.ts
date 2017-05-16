/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Probe } from "../../../index";
import { Sample } from "../../../index";
import { Result } from "../../../scan/result";

export class QuotedProbe implements Probe {

    private _name      = "";
    private _delimiter = 0;
    private _complete  = false;
    private _escaped   = false;

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
        const code = sample.code;

        if (sample.offset === 0) {
            this._delimiter = code;
            this._complete  = false;
            this._escaped   = false;
            return 1;
        }

        if (this._complete) {
            return 0;
        }

        if (code === 0x00) {
            return 3;
        }

        if (this._escaped) {
            this._escaped = false;
            return 1;
        }

        if (code === 0x5C) {
            this._escaped = true;
            return 1;
        }

        if (code === this._delimiter && !this._escaped) {
            this._complete = true;
        }

        return 1;
    }
}
