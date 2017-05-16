/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { SymbolProbe } from "../../../../../../lib/index";

export const test = () => {

    const probe = new SymbolProbe({ ">": "FOO" });
    expect(probe.getCandidateName()).toBe("");

};
