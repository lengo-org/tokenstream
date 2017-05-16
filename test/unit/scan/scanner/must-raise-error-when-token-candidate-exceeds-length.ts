/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Probe } from "../../../../lib/index";
import { Sample } from "../../../../lib/index";
import { ProbeMap } from "../../../../lib/index";
import { Result } from "../../../../lib/index";
import { NaiveMap } from "../../../../lib/index";
import { Scanner } from "../../../../lib/index";

export const test = () => {

    const MAX_TOKEN_LENGTH = 256 * 1024;

    const scanner = createScanner({
        obtainProbe: () => {
            return <Probe>{
                isComment:        () => false,
                getCandidateName: () => "FOO",
                isCandidate:      (sample: Sample): Result => {
                    return Result.CONTINUE;
                }
            };
        }
    });

    expect(scanner.getError()).toBeUndefined();

    scanner.scan("X".repeat(MAX_TOKEN_LENGTH));
    expect(scanner.getError()).toBeUndefined();

    scanner.scan("X".repeat(MAX_TOKEN_LENGTH + 1));
    expect(scanner.getError()).toBeInstanceOf(Error);

    expect(scanner.getError().message).toMatch(
        `Token value size exceeds ${MAX_TOKEN_LENGTH} characters`
    );
};

const createScanner = (probeMap?: ProbeMap): Scanner => {
    return new Scanner(probeMap || new NaiveMap());
};
