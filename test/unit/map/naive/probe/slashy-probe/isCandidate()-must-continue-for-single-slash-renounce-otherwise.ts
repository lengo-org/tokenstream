/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Sample } from "../../../../../../lib/index";
import { SlashyProbe } from "../../../../../../lib/index";
import { Result } from "../../../../../../lib/index";
import { Token } from "../../../../../../lib/index";

export const test = () => {

    const probe = new SlashyProbe("DIV", "DIV-A", "COM", "DOC", "REX");
    const positives = [ "/", "/\0" ];

    const makeSample = (code: number, offset: number): Sample => {
        return {
            code:   code,
            offset: offset,
            prev:   new Token("X", "Y")
        };
    };

    for (let i = 0, n = positives.length; i < n; ++i) {
        for (let j = 0; j < positives[ i ].length; j++) {
            const code = positives[ i ].charCodeAt(j);

            if (code === 0x00) {
                expect(probe.isCandidate(makeSample(code, j)))
                    .toBe(Result.RENOUNCE);

            } else {
                expect(probe.isCandidate(makeSample(code, j)))
                    .toBe(Result.CONTINUE);
            }
        }
    }

};
