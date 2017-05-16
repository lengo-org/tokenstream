/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { ParseError } from "../../../../lib/index";

export const test = () => {

    expect(new ParseError()).toBeInstanceOf(Error);

};
