/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Readable } from "stream";
import { Factory } from "../../../../lib/index";
import { Token } from "../../../../lib/index";
import { TokenStream } from "../../../../lib/index";

export const test = () => {

    const inputStream = createInputStream();
    const tokenStream = createTokenStream();

    inputStream.pipe(tokenStream);

    feedStreamAsync(String.fromCharCode(5), inputStream);

    return new Promise((resolve) => {
        const tokens: Token[] = [];

        tokenStream.on("data", (chunk: Token[]) => {
            chunk.length ? tokens.push.apply(tokens, chunk) : null;
        });

        tokenStream.on("error", () => {
            resolve(tokens);
        });

    }).then((tokens) => {
        expect(tokens).toMatchObject([
            new Token("END_OF_STREAM", "\0", 1, 1, 0)
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
