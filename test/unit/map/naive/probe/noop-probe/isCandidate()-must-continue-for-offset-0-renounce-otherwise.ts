/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { NoOpProbe } from "../../../../../../lib/index";
import { Result } from "../../../../../../lib/index";

export const test = () => {

    const probe = new NoOpProbe("NOOP");

    for (let i = 0x00; i <= 0x7F; ++i) {

        expect(probe.isCandidate({ code: i, offset: 0 }))
            .toBe(Result.CONTINUE);

        expect(probe.isCandidate({ code: i, offset: 1 }))
            .toBe(Result.RENOUNCE);
    }

};
