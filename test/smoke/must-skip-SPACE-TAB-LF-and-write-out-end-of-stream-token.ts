/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Readable } from "stream";
import { Token } from "../../lib/index";
import { Factory } from "../../lib/index";
import { TokenStream } from "../../lib/index";

export const test = () => {

    const inputStream = createInputStream();
    const tokenStream = createTokenStream();

    inputStream.pipe(tokenStream);

    feedStreamAsync(" \t\n", inputStream);

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
            { name: "END_OF_STREAM", value: "\0", line: 2, column: 1, cursor: 3 }
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

const feedStreamAsync = (text: string, inputStream: Readable): void => {
    let index = 0;
    const timer = setInterval(() => {
        index === text.length
            ? clearInterval(timer) || inputStream.push(null)
            : inputStream.push(text.substr(index++, 1));
    }, 20);
};
