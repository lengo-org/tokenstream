/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { LetterProbe } from "../../../../../../lib/index";
import { Result } from "../../../../../../lib/index";

export const test = () => {

    let code;

    const probe = new LetterProbe("IDENT");
    const positives = [ "foo1", "_12", "A1B2C", "_1_", "_A1", "$_12$", "x12$x", "$12" ];

    for (let i = 0, n = positives.length; i < n; ++i) {
        for (let j = 0; j < positives[ i ].length; j++) {

            code = positives[ i ].charCodeAt(j);

            expect(probe.isCandidate({ code: code, offset: j }))
                .toBe(Result.CONTINUE);
        }
    }

};
