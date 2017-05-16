/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { RestoreStream } from "../../../../lib/index";

export const test = () => {

    expect(() => { new RestoreStream().setEncoding("utf8"); })
        .toThrowError(Error);

    expect(() => { new RestoreStream().setEncoding("utf8"); })
        .toThrowError(/Encoding can not be applied to object stream/);
};
