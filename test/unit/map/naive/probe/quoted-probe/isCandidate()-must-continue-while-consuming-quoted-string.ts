/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { QuotedProbe } from "../../../../../../lib/index";
import { Result } from "../../../../../../lib/index";

export const test = () => {

    const probe = new QuotedProbe("STRING");
    const input = "'FOO §£Đƒã ó '";

    for (let i = 0, n = input.length; i < n; ++i) {
        const code = input.charCodeAt(i);

        expect(probe.isCandidate({ code: code, offset: i }))
            .toBe(Result.CONTINUE);
    }

};
