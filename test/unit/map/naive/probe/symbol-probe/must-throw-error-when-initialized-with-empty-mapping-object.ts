/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { SymbolProbe } from "../../../../../../lib/index";

export const test = () => {

    expect(() => { new SymbolProbe({}); })
        .toThrowError(TypeError);

    expect(() => { new SymbolProbe({}); })
        .toThrowError(/Expected non empty mapping/);

};
