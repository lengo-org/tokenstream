/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

export class Token {

    public name: string;
    public value: string;
    public line: number;
    public column: number;
    public cursor: number;

    public constructor(
        name: string,
        value?: string,
        line?: number,
        column?: number,
        cursor?: number
    ) {
        this.name   = name;
        this.value  = value  || "\0";
        this.line   = line   || 0;
        this.column = column || 0;
        this.cursor = cursor || 0;
    }

    public is(name: string): boolean {
        return this.name === name;
    }

    public isNot(name: string): boolean {
        return this.name !== name;
    }
}
