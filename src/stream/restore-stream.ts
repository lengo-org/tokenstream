/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Token } from "../scan/token";
import { Transform } from "stream";

export class RestoreStream extends Transform {

    private _line =   1;
    private _column = 1;

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

    _transform(tokens: Token[], enc: string, callback: () => void): void {
        let source = "";

        for (let i = 0, n = tokens.length; i < n; ++i) {
            const token = tokens[i];

            if (token.line > this._line) {
                source += "\n".repeat(token.line - this._line);
                this._column = 1;
            }

            if (token.column > this._column) {
                source += " ".repeat(token.column - this._column);
            }

            if (token.is("END_OF_STREAM")) {
                break;
            }

            source += token.value;

            this._line   = this._adjustLine(token);
            this._column = this._adjustColumn(token);
        }

        this.push(source);

        callback();
    }

    private _adjustLine(token: Token): number {
        return token.line + this._countNewLines(token);
    }

    private _adjustColumn(token: Token): number {
        if (this._countNewLines(token) === 0) {
            return token.column  + token.value.length;
        }
        return token.value.match(R1)[0].length;
    }

    private _countNewLines(token: Token): number {
        const matches = token.value.match(R2);
        return matches !== null ? matches.length : 0;
    }

}

const R1 = /[\r\n]([^\r\n]+)$/g;
const R2 = /[\r\n]/g;
