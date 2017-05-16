/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Readable } from "stream";
import { Token } from "../../lib/index";
import { TokenStream } from "../../lib/index";
import { Factory } from "../../lib/index";

export const test = () => {

    const inputStream = createInputStream();
    const tokenStream = createTokenStream();
    inputStream.pipe(tokenStream);

    feedStreamSync(" " + String.fromCharCode(0x5C) + " ", inputStream);

    return new Promise(resolve => {
        const tokens: Token[] = [];

        tokenStream.on("data", (chunk: Token[]) => {
            chunk.length ? tokens.push.apply(tokens, chunk) : null;
        });

        tokenStream.on("error", () => {
            resolve(tokens);
        });

    }).then(tokens => {
        expect(tokens).toMatchObject([
            new Token("END_OF_STREAM", "\0", 1, 2, 1)
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
