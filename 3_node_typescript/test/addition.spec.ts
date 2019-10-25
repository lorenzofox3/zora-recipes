import {test} from 'zora';
import {sum} from '../src/';

test('sum two integers', t => {
    t.eq(sum(2, 2), 4, `2 + 2 = 4`);
    t.eq(sum(0, -2), -2, `0 + (-2) = -2`);
});