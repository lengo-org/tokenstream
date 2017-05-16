/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { NumberProbe } from "../../../../../../lib/index";

export const test = () => {

    expect(new NumberProbe("NUMBER").getCandidateName())
        .toBe("NUMBER");

};
