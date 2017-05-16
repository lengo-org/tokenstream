/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Writable } from "stream";
import { Token } from "../../../../lib/index";
import { DebugStream } from "../../../../lib/index";

export const test = () => {

    const debugStream = new DebugStream();

    const input: Token[][] = [
        [ new Token("FOO", "reg") ],
        [ new Token("BAR", "bar") ]
    ];

    feedStreamAsync(input, debugStream);

    return new Promise((resolve) => {
        const result: string[] = [];

        debugStream.on("data", (chunk: any) => { result.push(chunk); });
        debugStream.on("end", () => { resolve(result); });

    }).then((result) => {
        expect(result).toMatchObject([
            '{ name: "FOO", value: "reg", line: 0, column: 0, cursor: 0 }\n',
            '{ name: "BAR", value: "bar", line: 0, column: 0, cursor: 0 }\n'
        ]);
    });

};

const feedStreamAsync = (tokens: Token[][], stream: Writable): void => {
    let index = 0;
    const timer = setInterval(() => {
        index === tokens.length
            ? clearInterval(timer) || stream.end()
            : stream.write(tokens[ index++ ]);
    }, 20);
};
