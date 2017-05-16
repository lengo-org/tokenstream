/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Result } from "../../../../lib/index";

export const test = () => {

    expect(Result.RENOUNCE).toBe(0);
    expect(Result.CONTINUE).toBe(1);
    expect(Result.OVERSHOT).toBe(2);
    expect(Result.EOSTREAM).toBe(3);

};
