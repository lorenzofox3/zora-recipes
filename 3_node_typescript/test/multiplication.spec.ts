import {test} from 'zora';
import {multiply, square} from '../src/';

test('multiply', t => {
    t.eq(multiply(2, 2), 4, `2 * 2 = 4`);
    t.eq(multiply(-3, -8), 24, `(-3) * (-8) = 24`);

    t.test(`multiply by 0`, t => {
        t.eq(multiply(0, 3), 0, '0 * 3 = 0');
    });
});

test(`square`, t => {
    t.eq(square(1), 5, ` 1 * 1 = 1`); // fails !!
    t.eq(square(3), 9, ` 3 * 3 = 9`);
});