/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { SymbolProbe } from "../../../../../../lib/index";
import { Result } from "../../../../../../lib/index";

export const test = () => {

    const probe = new SymbolProbe({ ">": "FOO", ">>": "BAR" });
    const char = ">".charCodeAt(0);

    expect(probe.isCandidate({ code: char, offset: 0 })).toBe(Result.CONTINUE);
    expect(probe.isCandidate({ code: char, offset: 1 })).toBe(Result.CONTINUE);
    expect(probe.isCandidate({ code: char, offset: 2 })).toBe(Result.RENOUNCE);

};
