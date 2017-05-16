const file = require("fs").readFileSync;
const json = require("./../package.json");

const read = (n) => file(n).toString();
const load = (n, m) => read(`lib/${m}.d.ts`);

const typings = read("lib/index.d.ts")
    .replace(/^import.*"(.+)".*$/gm, load)
    .replace(/^(ex|im)port\s+\{.*$/gm, "")
    .replace(/^\/.*$/gm, "")
    .replace(/^\s*\n/gm, "")
    .replace(/^(export)/gm, "\n$1");

process.stdout.write(
    `// ${json.name} ${json.version} / <${json.homepage}>\n\n` +
    `import { Transform } from "stream";\n${typings}`
);
