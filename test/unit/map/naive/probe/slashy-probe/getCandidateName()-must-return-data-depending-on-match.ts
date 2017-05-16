/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Sample } from "../../../../../../lib/index";
import { SlashyProbe } from "../../../../../../lib/index";
import { Token } from "../../../../../../lib/index";

export const test = () => {

    let probe;

    const makeSample = (code: number, offset: number, prev?: Token): Sample => {
        return {
            code:   code,
            offset: offset,
            prev:   prev || new Token("\0")
        };
    };

    probe = new SlashyProbe("DIV", "DIV-A", "COM", "DOC", "REX");

    probe.isCandidate(makeSample(0x2F, 0, new Token("X", "Y")));
    expect(probe.getCandidateName()).toBe("DIV");
    expect(probe.isComment()).toBe(false);

    probe.isCandidate(makeSample(0x2F, 1));
    expect(probe.getCandidateName()).toBe("COM");
    expect(probe.isComment()).toBe(true);

    // ---

    probe = new SlashyProbe("DIV", "DIV-A", "COM", "DOC", "REX");

    probe.isCandidate(makeSample(0x2F, 0, new Token("X", "Y")));
    expect(probe.getCandidateName()).toBe("DIV");
    expect(probe.isComment()).toBe(false);

    probe.isCandidate(makeSample(0x3D, 1));
    expect(probe.getCandidateName()).toBe("DIV-A");
    expect(probe.isComment()).toBe(false);

    // ---

    probe = new SlashyProbe("DIV", "DIV-A", "COM", "DOC", "REX");

    probe.isCandidate(makeSample(0x2F, 0));
    expect(probe.getCandidateName()).toBe("REX");
    expect(probe.isComment()).toBe(false);

    probe.isCandidate(makeSample(0x2F, 1));
    expect(probe.getCandidateName()).toBe("COM");
    expect(probe.isComment()).toBe(true);

    // ---

    probe = new SlashyProbe("DIV", "DIV-A", "COM", "DOC", "REX");

    probe.isCandidate(makeSample(0x2F, 0));
    expect(probe.getCandidateName()).toBe("REX");
    expect(probe.isComment()).toBe(false);

    probe.isCandidate(makeSample(0x2A, 1));
    expect(probe.getCandidateName()).toBe("DOC");
    expect(probe.isComment()).toBe(true);

};
