/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { ProbeMap } from "../../../../lib/index";
import { NaiveMap } from "../../../../lib/index";
import { Scanner } from "../../../../lib/index";

export const test = () => {

    const BUFFER_SIZE = 0x10000;

    const input = " ".repeat(BUFFER_SIZE - 1) + "// at buffer boundary";
    expect(input.substr(BUFFER_SIZE - 1)).toBe("// at buffer boundary");

    // | 0000fff0: 2020 2020 2020 2020 2020 2020 2020 202f                 / |
    // | 00010000: 2f20 6174 2062 7566 6665 7220 626f 756e  / at buffer boun |
    // | 00010010: 6461 7279                                dary             |
    expect(Buffer.from(input).readUInt8(BUFFER_SIZE - 1)).toBe(0x2F);
    expect(Buffer.from(input).readUInt8(BUFFER_SIZE)).toBe(0x2F);

    const scanner = createScanner();
    const tokens = scanner.scan(input + "\0");

    expect(tokens).toMatchObject([
        {
            name:   "SLASH_COMMENT",
            value:  "// at buffer boundary",
            line:   1,
            column: 65536,
            cursor: 65535
        },
        {
            name:   "END_OF_STREAM",
            value:  "\u0000",
            line:   1,
            column: 65557,
            cursor: 65556
        }
    ]);
};

const createScanner = (probeMap?: ProbeMap): Scanner => {
    return new Scanner(probeMap || new NaiveMap());
};
