/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Factory } from "../../../lib/index";
import { TokenStream } from "../../../lib/index";

export const test = () => {

    expect(new Factory().createTokenStream())
        .toBeInstanceOf(TokenStream);

};
