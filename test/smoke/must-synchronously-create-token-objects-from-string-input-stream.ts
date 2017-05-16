/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Readable } from "stream";
import { Token } from "../../lib/index";
import { TokenStream } from "../../lib/index";
import { Factory } from "../../lib/index";

export const test = () => {

    const inputStream = createInputStream();
    const tokenStream = createTokenStream();

    inputStream.pipe(tokenStream);

    feedStreamSync("First steps with Node Streams 2", inputStream);

    const tokens: Token[] = [];
    tokenStream.on("data", (chunk: Token[]) => {
        chunk.length ? tokens.push.apply(tokens, chunk) : null;
    });

    setImmediate(() => {
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

const feedStreamSync = (text: string, inputStream: Readable): void => {
    inputStream.push(text);
    inputStream.push(null);
};
