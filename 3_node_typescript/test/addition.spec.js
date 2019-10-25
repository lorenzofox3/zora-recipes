"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zora_1 = require("zora");
const src_1 = require("../src/");
zora_1.test('sum two integers', t => {
    t.eq(src_1.sum(2, 2), 4, `2 + 2 = 4`);
    t.eq(src_1.sum(0, -2), -2, `0 + (-2) = -2`);
});
//# sourceMappingURL=addition.spec.js.map