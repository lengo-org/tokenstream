/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { SymbolProbe } from "../../../../../../lib/index";

export const test = () => {

    expect(() => { new SymbolProbe(1 as any); })
        .toThrowError(TypeError);

    expect(() => { new SymbolProbe(1 as any); })
        .toThrowError(/Expected non empty mapping/);
};
