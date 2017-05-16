/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { TokenStream } from "../../../../lib/index";

export const test = () => {

    expect(() => { new TokenStream(null).setEncoding("utf8"); })
        .toThrowError(Error);

    expect(() => { new TokenStream(null).setEncoding("utf8"); })
        .toThrowError(/Encoding can not be applied to object stream/);
};
