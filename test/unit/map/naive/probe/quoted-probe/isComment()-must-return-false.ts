/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { QuotedProbe } from "../../../../../../lib/index";

export const test = () => {

    expect(new QuotedProbe("STRING").isComment())
        .toBe(false);

};
