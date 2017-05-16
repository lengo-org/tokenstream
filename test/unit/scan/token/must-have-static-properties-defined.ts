/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Token } from "../../../../lib/index";

export const test = () => {

    const token = new Token("FOO", "BAR", 1, 2, 3);

    expect(token.name).toBe("FOO");
    expect(token.value).toBe("BAR");
    expect(token.line).toBe(1);
    expect(token.column).toBe(2);
    expect(token.cursor).toBe(3);

};
