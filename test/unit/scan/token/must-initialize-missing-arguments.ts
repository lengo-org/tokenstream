/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Token } from "../../../../lib/index";

export const test = () => {

    const token = new Token("FOO");

    expect(token.name).toBe("FOO");
    expect(token.value).toBe("\0");
    expect(token.line).toBe(0);
    expect(token.column).toBe(0);
    expect(token.cursor).toBe(0);

};
