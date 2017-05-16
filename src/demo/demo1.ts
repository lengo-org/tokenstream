/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

// For Node Streams documentation, see:
// <https://nodejs.org/api/stream.html>

import { createTokenStream, createDebugStream } from "../index";
import { ParseError, Token } from "../index";

const tokenStream = createTokenStream();
const debugStream = createDebugStream();

tokenStream.on("data", (tokens: Token[]) => {
    // process the Token objects ...
});

tokenStream.on("error", (e: ParseError) => {
    const msg = "%s: %s in line %d column %d";
    console.error(msg, e.name, e.message, e.line, e.column);
    process.exit(1);
});

if (process.stdin.isTTY) {
    const i = console.info;
    i("┌───────────────────────────────────────────────┐");
    i("│ stdin => TokenStream => DebugStream => stdout │");
    i("│ Type anything, press <Enter> (<Ctrl-D> exits) │");
    i("└───────────────────────────────────────────────┘");

    process.on("SIGINT", () => {
        tokenStream.write("\0");
        process.exit(0);
    });
}

process.stdin
    .pipe(tokenStream)
    .pipe(debugStream)
    .pipe(process.stdout);
