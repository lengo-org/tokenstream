/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { SymbolProbe } from "../../../../../../lib/index";

export const test = () => {

    expect(() => { new SymbolProbe({ ">": "A", ">>": "B", "!>>": "C" }); })
        .toThrowError(TypeError);

    expect(() => { new SymbolProbe({ ">": "A", ">>": "B", "!>>": "C" }); })
        .toThrowError(/Expected mapping keys to start with same character/);
};
