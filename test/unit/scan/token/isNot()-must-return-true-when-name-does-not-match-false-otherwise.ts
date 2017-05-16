/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Token } from "../../../../lib/index";

export const test = () => {

    const token = new Token("FOO");

    expect(token.isNot("FOO")).toBe(false);
    expect(token.isNot("BAR")).toBe(true);

};
