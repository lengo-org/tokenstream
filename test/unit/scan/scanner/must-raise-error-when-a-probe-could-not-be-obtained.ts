/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { ProbeMap } from "../../../../lib/index";
import { NaiveMap } from "../../../../lib/index";
import { Scanner } from "../../../../lib/index";

export const test = () => {

    const scanner = createScanner(<ProbeMap>{
        obtainProbe: () => undefined
    });

    expect(scanner.scan("123")).toMatchObject([]);
    expect(scanner.getError()).toBeInstanceOf(Error);

};

const createScanner = (probeMap?: ProbeMap): Scanner => {
    return new Scanner(probeMap || new NaiveMap());
};

