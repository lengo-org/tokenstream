/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Token } from "../scan/token";
import { Transform } from "stream";

export class DebugStream extends Transform {

    public constructor() {
        super({
            writableObjectMode: true,
            encoding: "utf8"
        });
    }

    public setEncoding(encoding: string): this {
        throw new Error(
            "Encoding can not be applied to object stream"
        );
    }

    _transform(tokens: Token[], enc: string, callback: (err?: any) => void): void {

        for (let i = 0, n = tokens.length; i < n; ++i) {
            let token = JSON.stringify(tokens[ i ]);

            token = token.replace(R1, " $1: ");
            token = token.replace(R2, " }\n");

            this.push(token);
        }

        callback();
    }
}

const R1 = /"(name|value|line|column|cursor)":/g;
const R2 = /}$/;
