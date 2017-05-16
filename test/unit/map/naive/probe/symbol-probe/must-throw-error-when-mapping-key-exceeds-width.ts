/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { SymbolProbe } from "../../../../../../lib/index";

export const test = () => {

    expect(() => { new SymbolProbe({ [">".repeat(4 + 1)]: "FOO" }); })
        .toThrowError(TypeError);

    expect(() => { new SymbolProbe({ [">".repeat(4 + 1)]: "FOO" }); })
        .toThrowError(/Expected mapping key \(token pattern\) to be 1-4 characters long/);
};
