/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { SlashyProbe } from "../../../../../../lib/index";

export const test = () => {

    expect(new SlashyProbe("DIV", "DIV-A", "COM", "DOC", "REX").getCandidateName())
        .toBe("");

};
