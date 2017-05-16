/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Readable } from "stream";
import { Factory } from "../../lib/index";
import { Token } from "../../lib/index";
import { TokenStream } from "../../lib/index";

export const test = () => {

    const inputStream = createInputStream();
    const tokenStream = createTokenStream();

    inputStream.pipe(tokenStream);

    inputStream.push(Buffer.from("FOO"));
    inputStream.push(null);

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
            new Token("IDENTIFIER", "FOO", 1, 1, 0),
            new Token("END_OF_STREAM", "\0", 1, 4, 3)
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
