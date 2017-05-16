/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Transform } from "stream";
import { StringDecoder } from "string_decoder";
import { NodeStringDecoder } from "string_decoder";
import { Scanner } from "../scan/scanner";

export class TokenStream extends Transform {

    private _scanner: Scanner;
    private _decoder = new StringDecoder("utf8") as NodeStringDecoder;

    public constructor(scanner: Scanner) {
        super({
            readableObjectMode: true,
            encoding: null
        });
        this._scanner = scanner;
    }

    public setEncoding(encoding: string): this {
        throw new Error(
            "Encoding can not be applied to object stream"
        );
    }

    _transform(buffer: Buffer, enc: string, callback: (err?: any) => void): void {

        const source = this._decoder.write(buffer)
            .replace(/\r\n|\r/g, "\n");

        this.push(this._scanner.scan(source));

        if (this._scanner.hasError()) {
            /* istanbul ignore else */
            if (!this._scanner.hasTerminated()) {
                this.push(this._scanner.scan("\0"));
            }
        }

        if (this._scanner.hasError()
            || this._scanner.hasTerminated()) {
            this.end();
        }

        callback(this._scanner.getError());
    }

    _flush(callback: (err?: any) => void): void {
        this.push(this._scanner.scan("\0"));
        callback(this._scanner.getError());
    }
}
