/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { ParseError } from "../../../../lib/index";

export const test = () => {

    const err = new ParseError("foo", 1, 2, 3);

    expect(err.name).toBe("ParseError");
    expect(err.message).toBe("foo");
    expect(err.line).toBe(1);
    expect(err.column).toBe(2);
    expect(err.cursor).toBe(3);
    expect(err.stack).toBeDefined();

};
