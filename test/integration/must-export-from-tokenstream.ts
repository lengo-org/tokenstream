/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Options } from "../../lib/index";
import { Probe } from "../../lib/index";
import { ProbeMap } from "../../lib/index";
import { Sample } from "../../lib/index";

import { Factory } from "../../lib/index";
import { Result } from "../../lib/index";
import { Token } from "../../lib/index";
import { Scanner } from "../../lib/index";
import { DebugStream } from "../../lib/index";
import { RestoreStream } from "../../lib/index";
import { TokenStream } from "../../lib/index";

import { NaiveMap } from "../../lib/index";
import { LetterProbe } from "../../lib/index";
import { NoOpProbe } from "../../lib/index";
import { NumberProbe } from "../../lib/index";
import { QuotedProbe } from "../../lib/index";
import { SlashyProbe } from "../../lib/index";
import { SymbolProbe } from "../../lib/index";

import { ParseError } from "../../lib/index";

import { createTokenStream } from "../../lib/index";
import { createDebugStream } from "../../lib/index";
import { createRestoreStream } from "../../lib/index";

export const test = () => {

    expect(<Options>null);
    expect(<Probe>null);
    expect(<ProbeMap>null);
    expect(<Sample>null);

    expect(typeof Factory).toBe("function");
    expect(typeof Result).toBe("function");
    expect(typeof Token).toBe("function");
    expect(typeof Scanner).toBe("function");
    expect(typeof DebugStream).toBe("function");
    expect(typeof RestoreStream).toBe("function");
    expect(typeof TokenStream).toBe("function");

    expect(typeof NaiveMap).toBe("function");
    expect(typeof LetterProbe).toBe("function");
    expect(typeof NoOpProbe).toBe("function");
    expect(typeof NumberProbe).toBe("function");
    expect(typeof QuotedProbe).toBe("function");
    expect(typeof SlashyProbe).toBe("function");
    expect(typeof SymbolProbe).toBe("function");

    expect(new ParseError()).toBeInstanceOf(Error);

    expect(createTokenStream()).toBeInstanceOf(TokenStream);
    expect(createDebugStream()).toBeInstanceOf(DebugStream);
    expect(createRestoreStream()).toBeInstanceOf(RestoreStream);

};
