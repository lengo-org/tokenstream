/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { NaiveMap } from "../../../../lib/index";

export const test = () => {

    const probeMap = new NaiveMap();

    for (let i = 0x21; i <= 0x7E; ++i) {

        // Backslash
        if (i === 0x5C) {
            expect(probeMap.obtainProbe(i)).toBeUndefined();

        } else {
            expect(probeMap.obtainProbe(i)).toBeDefined();
        }
    }

};
