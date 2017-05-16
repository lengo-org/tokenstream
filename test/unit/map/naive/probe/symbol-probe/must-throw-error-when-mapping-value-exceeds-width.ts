/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { SymbolProbe } from "../../../../../../lib/index";

export const test = () => {

    expect(() => { new SymbolProbe({ ">>>": "X".repeat(64 + 1) }); })
        .toThrowError(TypeError);

    expect(() => { new SymbolProbe({ ">>>": "X".repeat(64 + 1) }); })
        .toThrowError(/Expected mapping value \(token name\) to be 1-64 characters long/);
};
