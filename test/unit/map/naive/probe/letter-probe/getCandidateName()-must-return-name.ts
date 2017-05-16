/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { LetterProbe } from "../../../../../../lib/index";

export const test = () => {

    expect(new LetterProbe("IDENT").getCandidateName())
        .toBe("IDENT");

};
