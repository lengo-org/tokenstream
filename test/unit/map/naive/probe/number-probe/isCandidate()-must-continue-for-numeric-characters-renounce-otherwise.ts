/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { NumberProbe } from "../../../../../../lib/index";
import { Result } from "../../../../../../lib/index";

export const test = () => {

    const probe = new NumberProbe("NUMBER");

    for (let code = 0x00; code <= 0x7F; code++) {

        if (code <= 0x39 && code >= 0x30) {
            expect(probe.isCandidate({ code: code, offset: 0 }))
                .toBe(Result.CONTINUE);

        } else {
            expect(probe.isCandidate({ code: code, offset: 0 }))
                .toBe(Result.RENOUNCE);
        }
    }

};
