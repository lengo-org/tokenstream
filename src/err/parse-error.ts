/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

export class ParseError {

    public name: string;
    public message: string;
    public line: number;
    public column: number;
    public cursor: number;
    public stack: string;

    public constructor(message = "", line = 0, column = 0, cursor = 0) {

        this.message = message.replace(
            /([\x00-\x1F]|\x7F)/g,
            String.fromCharCode(0xFFFD)
        );

        this.line = line;
        this.column = column;
        this.cursor = cursor;

        let proto = Object.getPrototypeOf(this);

        while (!proto.hasOwnProperty("constructor")) {
            proto = Object.getPrototypeOf(proto);
        }

        this.name = proto.name = "ParseError";
        this.stack = new Error(this.message).stack;

        /* istanbul ignore next */
        if (typeof this.stack === "string") {
            this.stack = this.stack.replace(/\n[^\n]+/, "");
        }
    }
}

ParseError.prototype = Object.create(Error.prototype);
