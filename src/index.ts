/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

export function createTokenStream(options?: Options): TokenStream {
    return new Factory().createTokenStream(options);
}

export function createDebugStream(): DebugStream {
    return new Factory().createDebugStream();
}

export function createRestoreStream(): RestoreStream {
    return new Factory().createRestoreStream();
}

// ---

export interface Options {
    probeMap?: ProbeMap;
}

export interface ProbeMap {
    obtainProbe(code: number): Probe | undefined;
}

export interface Probe {
    isComment(): boolean;
    isCandidate(sample: Sample): Result;
    getCandidateName(): string;
}

export interface Sample {
    code: number;
    offset: number;
    prev?: Token;
}

// ---

import { Factory } from "./factory";
export { Factory }

import { ParseError } from "./err/parse-error";
export { ParseError }

import { TokenStream } from "./stream/token-stream";
export { TokenStream }

import { DebugStream } from "./stream/debug-stream";
export { DebugStream}

import { RestoreStream } from "./stream/restore-stream";
export { RestoreStream }

import { Scanner } from "./scan/scanner";
export { Scanner }

import { Token } from "./scan/token";
export { Token }

import { Result } from "./scan/result";
export { Result }

import { NaiveMap } from "./map/naive/naive-map";
export { NaiveMap }

import { LetterProbe } from "./map/naive/probe/letter-probe";
export { LetterProbe }

import { NoOpProbe } from "./map/naive/probe/noop-probe";
export { NoOpProbe }

import { NumberProbe } from "./map/naive/probe/number-probe";
export { NumberProbe }

import { QuotedProbe } from "./map/naive/probe/quoted-probe";
export { QuotedProbe }

import { SlashyProbe } from "./map/naive/probe/slashy-probe";
export { SlashyProbe }

import { SymbolProbe } from "./map/naive/probe/symbol-probe";
export { SymbolProbe }

exports = { tokenstream: exports };
