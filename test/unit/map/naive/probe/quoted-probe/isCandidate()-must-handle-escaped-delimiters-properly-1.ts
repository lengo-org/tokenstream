/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { QuotedProbe } from "../../../../../../lib/index";
import { Result } from "../../../../../../lib/index";

export const test = () => {

    const probe = new QuotedProbe("STRING");
    const input = '"FOO §£\\"Đƒã ó "\n';

    let i = 0;
    for (const n = input.length - 1; i < n; ++i) {
        const code = input.charCodeAt(i);
        expect(probe.isCandidate({ code: code, offset: i }))
            .toBe(Result.CONTINUE);
    }

    const code = input.charCodeAt(i);
    expect(probe.isCandidate({ code: code, offset: i }))
        .toBe(Result.RENOUNCE);

};
