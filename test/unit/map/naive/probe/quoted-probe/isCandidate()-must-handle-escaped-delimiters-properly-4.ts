/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { QuotedProbe } from "../../../../../../lib/index";
import { Result } from "../../../../../../lib/index";

export const test = () => {

    const probe = new QuotedProbe("STRING");
    const input = [0x22, 0x5C, 0x5C, 0x22, 0x5C];

    let i = 0;
    for (const n = input.length - 1; i < n; ++i) {
        const code = input[i];
        expect(probe.isCandidate({ code: code, offset: i }))
            .toBe(Result.CONTINUE);
    }

    const code = input[i];
    expect(probe.isCandidate({ code: code, offset: i }))
        .toBe(Result.RENOUNCE);

};
