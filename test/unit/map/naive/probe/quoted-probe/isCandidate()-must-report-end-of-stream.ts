/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { QuotedProbe } from "../../../../../../lib/index";
import { Result } from "../../../../../../lib/index";

export const test = () => {

    const probe = new QuotedProbe("STRING");

    expect(probe.isCandidate({ code: 0x22, offset: 0 }))
        .toBe(Result.CONTINUE);

    expect(probe.isCandidate({ code: 0x00, offset: 1 }))
        .toBe(Result.EOSTREAM);

};
