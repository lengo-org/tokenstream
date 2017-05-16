/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { ProbeMap } from "../../../../lib/index";
import { NaiveMap } from "../../../../lib/index";
import { Scanner } from "../../../../lib/index";

export const test = () => {

    for (let i = 0x00; i < 0x20; ++i) {

        const scanner = createScanner();
        expect(scanner.getError()).toBeUndefined();

        scanner.scan(String.fromCharCode(i));

        if ([ 0x00, 0x09, 0x0A ].indexOf(i) > -1) {
            expect(scanner.getError()).toBeUndefined();

        } else {
            expect(scanner.getError()).toBeDefined();
        }
    }

    const scanner = createScanner();

    scanner.scan(String.fromCharCode(0x7F));
    expect(scanner.getError()).toBeInstanceOf(Error);

};

const createScanner = (probeMap?: ProbeMap): Scanner => {
    return new Scanner(probeMap || new NaiveMap());
};
