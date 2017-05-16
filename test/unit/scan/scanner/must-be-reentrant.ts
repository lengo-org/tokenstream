/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { ProbeMap } from "../../../../lib/index";
import { QuotedProbe } from "../../../../lib/index";
import { NaiveMap } from "../../../../lib/index";
import { Scanner } from "../../../../lib/index";

export const test = () => {

    const scanner = createScanner({
        obtainProbe: () => new QuotedProbe("FOO")
    });

    expect(scanner.scan("'FOO")).toMatchObject([]);
    expect(scanner.scan("BAR'")).toMatchObject([]);

    expect(scanner.scan("\0")).toMatchObject([
        { name: "FOO", value: "'FOOBAR'", line: 1, column: 1, cursor: 0 },
        { name: "END_OF_STREAM", value: "\0", line: 1, column: 9, cursor: 8 }
    ]);

};

const createScanner = (probeMap?: ProbeMap): Scanner => {
    return new Scanner(probeMap || new NaiveMap());
};
