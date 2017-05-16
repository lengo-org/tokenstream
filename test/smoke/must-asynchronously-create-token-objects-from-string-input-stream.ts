/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Readable } from "stream";
import { Factory } from "../../lib/index";
import { Token } from "../../lib/index";
import { TokenStream } from "../../lib/index";

export const test = () => {

    const inputStream = createInputStream();
    const tokenStream = createTokenStream();

    inputStream.pipe(tokenStream);

    feedStreamAsync("First steps with Node Streams 2", inputStream);

    return new Promise((resolve) => {
        const tokens: Token[] = [];

        tokenStream.on("data", (token: Token[]) => {
            token.length ? tokens.push.apply(tokens, token) : null;
        });

        tokenStream.on("end", () => {
            resolve(tokens);
        });

    }).then((tokens) => {
        expect(tokens).toMatchObject([
            new Token("IDENTIFIER",     "First",   1, 1, 0),
            new Token("IDENTIFIER",     "steps",   1, 7, 6),
            new Token("IDENTIFIER",     "with",    1, 13, 12),
            new Token("IDENTIFIER",     "Node",    1, 18, 17),
            new Token("IDENTIFIER",     "Streams", 1, 23, 22),
            new Token("NUMBER_LITERAL", "2",       1, 31, 30),
            new Token("END_OF_STREAM",  "\0",      1, 32, 31)
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
