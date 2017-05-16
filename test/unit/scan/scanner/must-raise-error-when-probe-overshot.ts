/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { ProbeMap } from "../../../../lib/index";
import { Scanner } from "../../../../lib/index";
import { SymbolProbe } from "../../../../lib/index";
import { NaiveMap } from "../../../../lib/index";

export const test = () => {

    const scanner = createScanner({
        obtainProbe: () => new SymbolProbe({ "|X": "FOO" })
    });

    expect(scanner.scan("||")).toMatchObject([]);
    expect(scanner.getError()).toBeInstanceOf(Error);

};

const createScanner = (probeMap?: ProbeMap): Scanner => {
    return new Scanner(probeMap || new NaiveMap());
};

