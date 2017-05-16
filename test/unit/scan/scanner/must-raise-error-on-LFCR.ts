/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { ProbeMap } from "../../../../lib/index";
import { NaiveMap } from "../../../../lib/index";
import { Scanner } from "../../../../lib/index";

export const test = () => {

    const scanner = createScanner();

    // FIXME: Broken, does not test what it claims.
    expect(scanner.scan(" \n\r ")).toMatchObject([]);
    expect(scanner.getError()).toBeInstanceOf(Error);

};

const createScanner = (probeMap?: ProbeMap): Scanner => {
    return new Scanner(probeMap || new NaiveMap());
};
