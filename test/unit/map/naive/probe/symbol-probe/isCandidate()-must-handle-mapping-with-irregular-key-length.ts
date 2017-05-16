/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { SymbolProbe } from "../../../../../../lib/index";
import { Result } from "../../../../../../lib/index";

const CONTINUE = Result.CONTINUE;
const OVERSHOT = Result.OVERSHOT;
const RENOUNCE = Result.RENOUNCE;

export const test = () => {

    const probe = new SymbolProbe({ ">>": "FOO", ">>>>": "BAR" });

    const char1 = ">".charCodeAt(0);
    const char2 = "X".charCodeAt(0);

    expect(probe.isCandidate({ code: char1, offset: 0 })).toBe(CONTINUE);
    expect(probe.isCandidate({ code: char2, offset: 1 })).toBe(OVERSHOT);

    expect(probe.isCandidate({ code: char1, offset: 0 })).toBe(CONTINUE);
    expect(probe.isCandidate({ code: char1, offset: 1 })).toBe(CONTINUE);
    expect(probe.isCandidate({ code: char2, offset: 2 })).toBe(RENOUNCE);

    expect(probe.isCandidate({ code: char1, offset: 0 })).toBe(CONTINUE);
    expect(probe.isCandidate({ code: char1, offset: 1 })).toBe(CONTINUE);
    expect(probe.isCandidate({ code: char1, offset: 2 })).toBe(CONTINUE);
    expect(probe.isCandidate({ code: char2, offset: 3 })).toBe(OVERSHOT);

    expect(probe.isCandidate({ code: char1, offset: 0 })).toBe(CONTINUE);
    expect(probe.isCandidate({ code: char1, offset: 1 })).toBe(CONTINUE);
    expect(probe.isCandidate({ code: char1, offset: 2 })).toBe(CONTINUE);
    expect(probe.isCandidate({ code: char1, offset: 3 })).toBe(CONTINUE);
    expect(probe.isCandidate({ code: char2, offset: 4 })).toBe(RENOUNCE);

};
