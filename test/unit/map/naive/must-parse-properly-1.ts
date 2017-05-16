/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Readable } from "stream";
import { Factory } from "../../../../lib/index";
import { Token } from "../../../../lib/index";
import { TokenStream } from "../../../../lib/index";
import { NaiveMap } from "../../../../lib/index";

import * as fs from "fs";

export const test = () => {

    const inputStream = createInputStream();
    const tokenStream = createTokenStream();

    inputStream.pipe(tokenStream);

    const sourcePath = __dirname + "/data/source-1.txt";
    const expectPath = __dirname + "/data/expect-1.txt";

    const sourceFile = fs.readFileSync(sourcePath).toString("utf8");
    const expectFile = fs.readFileSync(expectPath).toString("utf8");

    feedStreamSync(sourceFile, inputStream);

    return new Promise((resolve) => {
        let out = "";

        tokenStream.on("data", (chunk: Token[]) => {
            for (let i = 0, n = chunk.length; i < n; ++i) {
                out += JSON.stringify(chunk[i]) + "\n";
            }
        });

        tokenStream.on("end", () => {
            resolve(out);
        });

    }).then(out => {
        expect(out).toMatch(expectFile);
    });
};

const createInputStream = (): Readable => {
    const inputStream = new Readable();
    (inputStream as any)._read = () => {};
    return inputStream;
};

const createTokenStream = (): TokenStream => {
    return new Factory().createTokenStream({ probeMap: new NaiveMap() });
};

const feedStreamSync = (text: string, inputStream: Readable): void => {
    inputStream.push(text);
    inputStream.push(null);
};
