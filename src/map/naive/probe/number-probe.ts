/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Probe } from "../../../index";
import { Sample } from "../../../index";
import { Result } from "../../../scan/result";

export class NumberProbe implements Probe {

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
        return sample.code <= 0x39 && sample.code >= 0x30
            ? 1 : 0;
    }
}
