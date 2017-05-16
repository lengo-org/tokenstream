/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { NaiveMap } from "../../../../lib/index";

export const test = () => {

    const probeMap = new NaiveMap();

    for (let i = 0x00; i <= 0x20; ++i) {
        expect(probeMap.obtainProbe(i)).toBeUndefined();
    }

    const code = 0x7F;
    expect(probeMap.obtainProbe(code)).toBeUndefined();

};
