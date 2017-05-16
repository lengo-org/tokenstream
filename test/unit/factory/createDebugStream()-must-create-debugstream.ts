/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Factory } from "../../../lib/index";
import { DebugStream } from "../../../lib/index";

export const test = () => {

    expect(new Factory().createDebugStream())
        .toBeInstanceOf(DebugStream);

};
