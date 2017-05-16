/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Options } from "./index";
import { NaiveMap } from "./map/naive/naive-map";

import { Scanner } from "./scan/scanner";
import { DebugStream } from "./stream/debug-stream";
import { TokenStream } from "./stream/token-stream";
import { RestoreStream } from "./stream/restore-stream";

export class Factory {

    public createTokenStream(options?: Options): TokenStream {
        options = options || {};

        const probeMap = options.probeMap || new NaiveMap();

        return new TokenStream(
            new Scanner(probeMap)
        );
    }

    public createDebugStream(): DebugStream {
        return new DebugStream();
    }

    public createRestoreStream(): RestoreStream {
        return new RestoreStream();
    }

}
