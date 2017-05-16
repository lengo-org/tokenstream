/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Readable } from "stream";
import { Factory } from "../../../../lib/index";
import { Token } from "../../../../lib/index";
import { TokenStream } from "../../../../lib/index";

export const test = () => {

    const BUFFER_SIZE = 0x10000;

    // § = 0xC2 0xA7 (utf8)
    const input = " ".repeat(BUFFER_SIZE - 2) + "'§' at buffer boundary";
    expect(input.substr(BUFFER_SIZE - 2)).toBe("'§' at buffer boundary");

    // | 0000fff0: 2020 2020 2020 2020 2020 2020 2020 27c2                '. |
    // | 00010000: a727 2061 7420 6275 6666 6572 2062 6f75  .' at buffer bou |
    // | 00010010: 6e64 6172 79                             ndary            |
    expect(Buffer.from(input).readUInt8(BUFFER_SIZE - 1)).toBe(0xC2);
    expect(Buffer.from(input).readUInt8(BUFFER_SIZE)).toBe(0xA7);

    const inputStream = createInputStream();
    const tokenStream = createTokenStream();

    inputStream.pipe(tokenStream);

    feedStreamSync(input, inputStream);

    return new Promise((resolve) => {
        const tokens: Token[] = [];

        tokenStream.on("data", (chunk: Token[]) => {
            chunk.length ? tokens.push.apply(tokens, chunk) : null;
        });

        tokenStream.on("end", () => {
            resolve(tokens);
        });

    }).then((tokens) => {
        expect(tokens).toMatchObject([
            { name: "STRING_LITERAL", value: "'§'",      line: 1, column: 65535, cursor: 65534 },
            { name: "IDENTIFIER",     value: "at",       line: 1, column: 65539, cursor: 65538 },
            { name: "IDENTIFIER",     value: "buffer",   line: 1, column: 65542, cursor: 65541 },
            { name: "IDENTIFIER",     value: "boundary", line: 1, column: 65549, cursor: 65548 },
            { name: "END_OF_STREAM",  value: "\u0000",   line: 1, column: 65557, cursor: 65556 }
        ]);
    });

};

const createInputStream = (): Readable => {
    const inputStream = new Readable();
    (inputStream as any)._read = () => {};
    return inputStream;
};

const createTokenStream = (): TokenStream => {
    return new Factory().createTokenStream();
};

const feedStreamSync = (text: string, inputStream: Readable): void => {
    inputStream.push(text);
    inputStream.push(null);
};
