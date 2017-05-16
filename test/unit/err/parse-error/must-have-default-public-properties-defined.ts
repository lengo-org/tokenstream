/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { ParseError } from "../../../../lib/index";

export const test = () => {

    const err = new ParseError();

    expect(err.name).toBe("ParseError");
    expect(err.message).toBe("");
    expect(err.line).toBe(0);
    expect(err.column).toBe(0);
    expect(err.cursor).toBe(0);
    expect(err.stack).toBeDefined();

};
