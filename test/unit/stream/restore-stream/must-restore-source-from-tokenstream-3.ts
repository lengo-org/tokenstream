/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Readable } from "stream";
import { Factory } from "../../../../lib/index";
import { TokenStream } from "../../../../lib/index";
import { RestoreStream } from "../../../../lib/index";

export const test = () => {

    const source = `
        foo    /*
            multi
             line
          comment
        */    bar
              baz
              `;

    const inputStream = createInputStream();
    const tokenStream = createTokenStream();
    const restoreStream = createRestoreStream();

    inputStream.pipe(tokenStream).pipe(restoreStream);
    inputStream.push(source);
    inputStream.push(null);

    return new Promise((resolve) => {
        let restored = "";

        restoreStream.on("data", (chunk: string) => {
            restored += chunk;
        });

        restoreStream.on("end", () => {
            resolve(restored);
        });

    }).then((restored) => {
        expect(restored).toBe(source);
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

const createRestoreStream = (): RestoreStream => {
    return new Factory().createRestoreStream();
};
