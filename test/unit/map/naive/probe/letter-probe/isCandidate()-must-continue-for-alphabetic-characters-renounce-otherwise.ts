/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { LetterProbe } from "../../../../../../lib/index";
import { Result } from "../../../../../../lib/index";

export const test = () => {

    const probe = new LetterProbe("IDENT");

    for (let code = 0x00; code <= 0x7F; code++) {

        if (isAlphabetic(code)) {
            expect(probe.isCandidate({ code: code, offset: 0 }))
                .toBe(Result.CONTINUE);

        } else {
            expect(probe.isCandidate({ code: code, offset: 0 }))
                .toBe(Result.RENOUNCE);
        }
    }

};

const isAlphabetic = (code: number): boolean => {
    return (code <= 0x5A && code >= 0x41)
        || (code <= 0x7A && code >= 0x61)
        || code === 0x24  // $
        || code === 0x5F; // _
};
