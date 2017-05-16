/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Probe } from "../../../index";
import { Sample } from "../../../index";
import { Result } from "../../../scan/result";

export class SymbolProbe implements Probe {

    private _mapping: { [value: string]: string } = {};

    private _symbols = [] as string[];
    private _symbol  = "";

    private _names   = [] as string[];
    private _name    = "";

    public constructor(mapping: { [value: string]: string }) {
        this._ensureIntegrity(mapping);
        this._mapping = mapping;

        for (const key in this._mapping) {
            if (this._mapping.hasOwnProperty(key)) {
                this._symbols.push(key);
                this._names.push(this._mapping[ key ]);
            }
        }
    }

    public isComment(): boolean {
        return false;
    }

    public getCandidateName(): string {
        return this._name;
    }

    public isCandidate(sample: Sample): Result {
        if (sample.offset === 0) {
            this._symbol = "";
            this._name = "";
        }

        const symbol = this._symbol;
        this._symbol += String.fromCharCode(sample.code);

        for (let i = 0, n = this._symbols.length; i < n; ++i) {
            if (this._symbolStartsWith(this._symbols[ i ], sample.offset)) {
                this._name = this._mapping[ this._symbol ];
                return 1;
            }
        }

        return this._symbols.indexOf(symbol) < 0 ? 2 : 0;
    }

    private _symbolStartsWith(symbol: string, offset: number) {
        return symbol.substr(0, offset + 1) === this._symbol;
    }

    private _ensureIntegrity(mapping: any) {
        this._ensureMappingNotEmpty(mapping);

        for (const key in mapping) {
            if (mapping.hasOwnProperty(key)) {
                this._ensureKeyLengthRange(key);
                this._ensureValLengthRange(mapping[ key ]);
            }
        }

        this._ensureKeysStartWithSameCharacter(mapping);
    }

    private _ensureMappingNotEmpty(mapping: any) {
        if (typeof mapping === "object") {
            for (const key in mapping) {
                if (mapping.hasOwnProperty(key)) { return; }
            }
        }
        throw new TypeError("Expected non empty mapping");
    }

    private _ensureKeyLengthRange(key: string) {
        if (typeof key !== "string" || !key.length || key.length > 4) {
            throw new TypeError(
                "Expected mapping key (token pattern) to be 1-4 characters long"
            );
        }
    }

    private _ensureValLengthRange(value: string) {
        if (typeof value !== "string" || !value.length || value.length > 64) {
            throw new TypeError(
                "Expected mapping value (token name) to be 1-64 characters long"
            );
        }
    }

    private _ensureKeysStartWithSameCharacter(mapping: any) {
        let char: string;

        for (const key in mapping) {
            if (!mapping.hasOwnProperty(key)) { continue; }

            if (char === undefined) {
                char = key.charAt(0);
                continue;
            }

            if (key.charAt(0) === char) {
                continue;
            }

            throw new TypeError(
                `Expected mapping keys to start with same character`
            );
        }
    }
}
