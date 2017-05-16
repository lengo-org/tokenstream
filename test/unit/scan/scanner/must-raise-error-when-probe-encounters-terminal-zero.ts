/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { ProbeMap } from "../../../../lib/index";
import { NaiveMap } from "../../../../lib/index";
import { QuotedProbe } from "../../../../lib/index";
import { Scanner } from "../../../../lib/index";

export const test = () => {

    const scanner = createScanner({
        obtainProbe: () => new QuotedProbe("FOO")
    });

    scanner.scan("'\0");
    expect(scanner.hasError()).toBe(true);

};

const createScanner = (probeMap?: ProbeMap): Scanner => {
    return new Scanner(probeMap || new NaiveMap());
};

