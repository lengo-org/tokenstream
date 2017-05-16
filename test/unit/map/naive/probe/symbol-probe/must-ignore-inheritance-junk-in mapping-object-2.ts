/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { SymbolProbe } from "../../../../../../lib/index";
import { ParseError } from "../../../../../../lib/index";

export const test = () => {

    const mapping = { ">": "FOO" };
    Object.setPrototypeOf(mapping, new ParseError());

    expect(new SymbolProbe(mapping)).toBeTruthy();

};
