/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Probe } from "../../../../lib/index";
import { Sample } from "../../../../lib/index";
import { ProbeMap } from "../../../../lib/index";
import { Result } from "../../../../lib/index";
import { NaiveMap } from "../../../../lib/index";
import { Scanner } from "../../../../lib/index";

export const test = () => {

    let iteration = 0;
    let renounceNext = false;

    const scanner = createScanner({
        obtainProbe: () => {
            return <Probe>{
                getCandidateName: () => "FOO",
                isComment:        () => false,
                isCandidate:      (sample: Sample): Result => {

                    if (renounceNext) {
                        renounceNext = false;
                        return Result.RENOUNCE;
                    }

                    expect(sample.offset).toBe(0);

                    switch (iteration) {
                        case 0: expect(sample.prev.value).toBe("\0"); break;
                        case 1: expect(sample.prev.value).toBe("1");  break;
                        case 2: expect(sample.prev.value).toBe("-");  break;
                        case 3: expect(sample.prev.value).toBe("2");  break;
                        case 4: expect(sample.prev.value).toBe("-");  break;
                    }

                    iteration++;
                    renounceNext = true;

                    return Result.CONTINUE;
                }
            };
        }
    });

    scanner.scan("1-2-3");
    expect(iteration).toBe(5);

};

const createScanner = (probeMap?: ProbeMap): Scanner => {
    return new Scanner(probeMap || new NaiveMap());
};
