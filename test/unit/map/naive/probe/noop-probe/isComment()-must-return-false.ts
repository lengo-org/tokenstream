/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { NoOpProbe } from "../../../../../../lib/index";

export const test = () => {

    expect(new NoOpProbe("NOOP").isComment())
        .toBe(false);

};
