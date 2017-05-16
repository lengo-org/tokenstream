/*! MIT, dtg [at] lengo [dot] org · 05/2017 */

import { Probe } from "../../index";
import { ProbeMap } from "../../index";
import { LetterProbe } from "./probe/letter-probe";
import { NumberProbe } from "./probe/number-probe";
import { QuotedProbe } from "./probe/quoted-probe";
import { SlashyProbe } from "./probe/slashy-probe";
import { SymbolProbe } from "./probe/symbol-probe";

export class NaiveMap implements ProbeMap {

    public obtainProbe(code: number): Probe | undefined {
        return (this._probes as any)[ code ] || undefined;
    }

    // For demonstration purposes.
    private _probes = (() => {
        const $: any = [];

        const NUMBER_PROBE = new NumberProbe("NUMBER_LITERAL");
        const LETTER_PROBE = new LetterProbe("IDENTIFIER");
        const QUOTED_PROBE = new QuotedProbe("STRING_LITERAL");

        $[ 0x21 ] /* ! */ = new SymbolProbe({ "!": "LOGICAL_NOT", "!=": "NOT_EQUAL", "!==": "NOT_IDENTICAL" });
        $[ 0x22 ] /* " */ = QUOTED_PROBE;
        $[ 0x23 ] /* # */ = new SymbolProbe({ "#": "NUMBER_SIGN" });
        $[ 0x24 ] /* $ */ = LETTER_PROBE;
        $[ 0x25 ] /* % */ = new SymbolProbe({ "%": "MODULO", "%=": "MODULO_ASSIGN" });
        $[ 0x26 ] /* & */ = new SymbolProbe({ "&": "BITWISE_AND", "&&": "LOGICAL_AND", "&=": "BITWISE_AND_ASSIGN" });
        $[ 0x27 ] /* ' */ = QUOTED_PROBE;
        $[ 0x28 ] /* ( */ = new SymbolProbe({ "(": "LEFT_PARENTHESIS" });
        $[ 0x29 ] /* ) */ = new SymbolProbe({ ")": "RIGHT_PARENTHESIS" });
        $[ 0x2A ] /* * */ = new SymbolProbe({ "*": "MULTIPLICATION", "*=": "MULTIPLICATION_ASSIGN" });
        $[ 0x2B ] /* + */ = new SymbolProbe({ "+": "ADDITION", "+=": "ADDITION_ASSIGN" });
        $[ 0x2C ] /* , */ = new SymbolProbe({ ",": "COMMA" });
        $[ 0x2D ] /* - */ = new SymbolProbe({ "-": "SUBTRACTION" ,"-=": "SUBTRACTION_ASSIGN" });
        $[ 0x2E ] /* . */ = new SymbolProbe({ ".": "MEMBER_ACCESS" });
        $[ 0x2F ] /* / */ = new SlashyProbe("DIVISION", "DIVISION_ASSIGN", "SLASH_COMMENT", "BLOCK_COMMENT", "REGEXP");

        for (let i = 0x30; i <= 0x39; ++i) { $[ i ] = NUMBER_PROBE; }

        $[ 0x3A ] /* : */ = new SymbolProbe({ ":": "COLON" });
        $[ 0x3B ] /* ; */ = new SymbolProbe({ ";": "SEMICOLON" });
        $[ 0x3C ] /* < */ = new SymbolProbe({ "<": "LOWER_THAN", "<=": "LOWER_OR_EQUAL" });
        $[ 0x3D ] /* = */ = new SymbolProbe({ "=": "ASSIGN", "==": "EQUAL", "===": "IDENTICAL" });
        $[ 0x3E ] /* > */ = new SymbolProbe({ ">": "GREATER_THAN", ">=": "GREATER_OR_EQUAL" });
        $[ 0x3F ] /* ? */ = new SymbolProbe({ "?": "QUESTION_MARK" });
        $[ 0x40 ] /* @ */ = new SymbolProbe({ "@": "AT_SIGN" });

        for (let i = 0x41; i <= 0x5A; ++i) { $[ i ] = LETTER_PROBE; }

        $[ 0x5B ] /* [ */ = new SymbolProbe({ "[": "LEFT_BRACKET" });
        $[ 0x5C ] /* \ */ = undefined;
        $[ 0x5D ] /* ] */ = new SymbolProbe({ "]": "RIGHT_BRACKET" });
        $[ 0x5E ] /* ^ */ = new SymbolProbe({ "^": "BITWISE_XOR", "^=": "BITWISE_XOR_ASSIGN" });
        $[ 0x5F ] /* _ */ = LETTER_PROBE;
        $[ 0x60 ] /* ` */ = QUOTED_PROBE;

        for (let i = 0x61; i <= 0x7A; ++i) { $[ i ] = LETTER_PROBE; }

        $[ 0x7B ] /* { */ = new SymbolProbe({ "{": "LEFT_CURLY_BRACE" });
        $[ 0x7C ] /* | */ = new SymbolProbe({ "|": "BITWISE_OR", "||": "LOGICAL_OR", "|=": "BITWISE_OR_ASSIGN" });
        $[ 0x7D ] /* } */ = new SymbolProbe({ "}": "RIGHT_CURLY_BRACE" });
        $[ 0x7E ] /* ~ */ = new SymbolProbe({ "~": "BITWISE_NOT", "~=": "BITWISE_NOT_ASSIGN" });

        return $;
    })();
}
