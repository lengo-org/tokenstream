/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { TestLoader } from "../../test-loader";

describe("Factory", () => {

    const tests = TestLoader.loadTests(__dirname);

    for (const name in tests) {
        if (!tests.hasOwnProperty(name)) { continue; }
        test(name, require(tests[name]).test);
    }

});
