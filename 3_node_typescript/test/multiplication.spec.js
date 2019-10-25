"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zora_1 = require("zora");
const src_1 = require("../src/");
zora_1.test('multiply', t => {
    t.eq(src_1.multiply(2, 2), 4, `2 * 2 = 4`);
    t.eq(src_1.multiply(-3, -8), 24, `(-3) * (-8) = 24`);
    t.test(`multiply by 0`, t => {
        t.eq(src_1.multiply(0, 3), 0, '0 * 3 = 0');
    });
});
zora_1.test(`square`, t => {
    t.eq(src_1.square(1), 5, ` 1 * 1 = 1`); // fails !!
    t.eq(src_1.square(3), 9, ` 3 * 3 = 9`);
});
//# sourceMappingURL=multiplication.spec.js.map