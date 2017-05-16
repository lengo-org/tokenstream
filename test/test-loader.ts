/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import * as fs from "fs";

export class TestLoader {

    public static loadTests(dirName: string) {

        const names = fs.readdirSync(dirName);
        const tests: any = {};

        for (let i = 0, n = names.length; i < n; ++i) {

            if (!names[ i ].match(/\.js$/)) {
                continue;
            }

            if (names[ i ].match(/^spec.js$/)) {
                continue;
            }

            const name = names[ i ].replace(/\.js$/, "")
                                   .replace(/-/g, " ");

            tests[ name ] = dirName + "/" + names[ i ];
        }

        return tests;
    }
}
