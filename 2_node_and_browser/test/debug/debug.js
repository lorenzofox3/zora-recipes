(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.zora = factory());
}(this, (function () { 'use strict';

const stringify = JSON.stringify;
const printTestHeader = test => console.log(`# ${test.description} - ${test.executionTime}ms`);
const printTestCase = (assertion, id) => {
	const pass = assertion.pass;
	const status = pass === true ? 'ok' : 'not ok';
	console.log(`${status} ${id} ${assertion.message}`);
	if (pass !== true) {
		console.log(`  ---
    operator: ${assertion.operator}
    expected: ${stringify(assertion.expected)}
    actual: ${stringify(assertion.actual)}
    at: ${(assertion.at || '')}
  ...
`);
	}
};
const printSummary = ({count, pass, skipped, fail}) => {
	console.log(`
1..${count}
# tests ${count} (${skipped} skipped)
# pass  ${pass}
${fail > 0 ? `# fail  ${fail}
` : `
# ok
`}`);
};

var tap = ({displaySkipped = false} = {}) => function * () {
	let pass = 0;
	let fail = 0;
	let id = 0;
	let skipped = 0;
	console.log('TAP version 13');
	try {
		/* eslint-disable no-constant-condition */
		while (true) {
			const test = yield;

			if (test.items.length === 0) {
				skipped++;
			}

			if (test.items.length > 0 || displaySkipped === true) {
				printTestHeader(test);
			}

			for (const assertion of test.items) {
				id++;
				if (assertion.pass === true) {
					pass++;
				} else {
					fail++;
				}
				printTestCase(assertion, id);
			}
		}
		/* eslint-enable no-constant-condition */
	} catch (err) {
		console.log('Bail out! unhandled exception');
		throw err;
	} finally {
		printSummary({count: id, pass, skipped, fail});
	}
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var keys = createCommonjsModule(function (module, exports) {
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}
});

var keys_1 = keys.shim;

var is_arguments = createCommonjsModule(function (module, exports) {
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
}
});

var is_arguments_1 = is_arguments.supported;
var is_arguments_2 = is_arguments.unsupported;

var deepEqual_1 = createCommonjsModule(function (module) {
var pSlice = Array.prototype.slice;



var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
};

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (is_arguments(a)) {
    if (!is_arguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = keys(a),
        kb = keys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}
});

const getAssertionLocation = () => {
	const err = new Error();
	const stack = (err.stack || '').split('\n');
	return (stack[3] || '').trim().replace(/^at/i, '');
};
const assertMethodHook = fn => function (...args) {
	const assertResult = fn(...args);

	if (assertResult.pass === false) {
		assertResult.at = getAssertionLocation();
	}

	this.collect(assertResult);
	return assertResult;
};

const Assertion = {
	ok: assertMethodHook((val, message = 'should be truthy') => ({
		pass: Boolean(val),
		actual: val,
		expected: true,
		message,
		operator: 'ok'
	})),
	deepEqual: assertMethodHook((actual, expected, message = 'should be equivalent') => ({
		pass: deepEqual_1(actual, expected),
		actual,
		expected,
		message,
		operator: 'deepEqual'
	})),
	equal: assertMethodHook((actual, expected, message = 'should be equal') => ({
		pass: actual === expected,
		actual,
		expected,
		message,
		operator: 'equal'
	})),
	notOk: assertMethodHook((val, message = 'should not be truthy') => ({
		pass: !val,
		expected: false,
		actual: val,
		message,
		operator: 'notOk'
	})),
	notDeepEqual: assertMethodHook((actual, expected, message = 'should not be equivalent') => ({
		pass: !deepEqual_1(actual, expected),
		actual,
		expected,
		message,
		operator: 'notDeepEqual'
	})),
	notEqual: assertMethodHook((actual, expected, message = 'should not be equal') => ({
		pass: actual !== expected,
		actual,
		expected,
		message,
		operator: 'notEqual'
	})),
	throws: assertMethodHook((func, expected, message) => {
		let caught;
		let pass;
		let actual;
		if (typeof expected === 'string') {
			[expected, message] = [message, expected];
		}
		try {
			func();
		} catch (err) {
			caught = {error: err};
		}
		pass = caught !== undefined;
		actual = caught && caught.error;
		if (expected instanceof RegExp) {
			pass = expected.test(actual) || expected.test(actual && actual.message);
			expected = String(expected);
		} else if (typeof expected === 'function' && caught) {
			pass = actual instanceof expected;
			actual = actual.constructor;
		}
		return {
			pass,
			expected,
			actual,
			operator: 'throws',
			message: message || 'should throw'
		};
	}),
	doesNotThrow: assertMethodHook((func, expected, message) => {
		let caught;
		if (typeof expected === 'string') {
			[expected, message] = [message, expected];
		}
		try {
			func();
		} catch (err) {
			caught = {error: err};
		}
		return {
			pass: caught === undefined,
			expected: 'no thrown error',
			actual: caught && caught.error,
			operator: 'doesNotThrow',
			message: message || 'should not throw'
		};
	}),
	fail: assertMethodHook((message = 'fail called') => ({
		pass: false,
		actual: 'fail called',
		expected: 'fail not called',
		message,
		operator: 'fail'
	}))
};

var assert = collect => Object.create(Assertion, {collect: {value: collect}});

const noop = () => {};

const skip = description => test('SKIPPED - ' + description, noop);

const Test = {
	async run() {
		const collect = assertion => this.items.push(assertion);
		const start = Date.now();
		await Promise.resolve(this.spec(assert(collect)));
		const executionTime = Date.now() - start;
		return Object.assign(this, {
			executionTime
		});
	},
	skip() {
		return skip(this.description);
	}
};

function test(description, spec, {only = false} = {}) {
	return Object.create(Test, {
		items: {value: []},
		only: {value: only},
		spec: {value: spec},
		description: {value: description}
	});
}

const onNextTick = val => new Promise(resolve => setTimeout(() => resolve(val), 0));

const PlanProto = {
	[Symbol.iterator]() {
		return this.items[Symbol.iterator]();
	},
	test(description, spec, opts) {
		if (!spec && description.test) {
			// If it is a plan
			this.items.push(...description);
		} else {
			this.items.push(test(description, spec, opts));
		}
		return this;
	},
	only(description, spec) {
		return this.test(description, spec, {only: true});
	},
	skip(description, spec) {
		if (!spec && description.test) {
			// If it is a plan we skip the whole plan
			for (const t of description) {
				this.items.push(t.skip());
			}
		} else {
			this.items.push(skip(description));
		}
		return this;
	},
	async run(sink = tap()) {
		const sinkIterator = sink();
		sinkIterator.next();
		try {
			const hasOnly = this.items.some(t => t.only);
			const tests = hasOnly ? this.items.map(t => t.only ? t : t.skip()) : this.items;
			const runningTests = tests.map(t => t.run());
			/* eslint-disable no-await-in-loop */
			for (const r of runningTests) {
				const executedTest = await onNextTick(r); // Force to resolve on next tick so consumer can do something with previous iteration result (until async iterator are natively supported ...)
				sinkIterator.next(executedTest);
			}
			/* eslint-enable no-await-in-loop */
		} catch (err) {
			sinkIterator.throw(err);
		} finally {
			sinkIterator.return();
		}
	}
};

function factory() {
	return Object.create(PlanProto, {
		items: {value: []}, length: {
			get() {
				return this.items.length;
			}
		}
	});
}

return factory;

})));
(function (zora) {
'use strict';

zora = zora && zora.hasOwnProperty('default') ? zora['default'] : zora;

var multiply = (a, b) => a * b;

var multiply$1 = zora()
	.test('integer multiplication', t => {
		t.equal(multiply(2, 3), 6, '2 * 3 = 6');
	});

var square = x => x * x;

var square$1 = zora()
	.test('integer square', t => {
		t.equal(square(2), 4, '2 * 2 = 4');
	});

zora()
	.test(multiply$1)
	.test(square$1)
	.run();

}(zora));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9Wb2x1bWVzL2RhdGEvQ29kZS96b3JhLXJlY2lwZXMvMl9ub2RlX2FuZF9icm93c2VyL3NyYy9tdWx0aXBseS5qcyIsIi9Wb2x1bWVzL2RhdGEvQ29kZS96b3JhLXJlY2lwZXMvMl9ub2RlX2FuZF9icm93c2VyL3Rlc3Qvc3BlY3MvbXVsdGlwbHkuanMiLCIvVm9sdW1lcy9kYXRhL0NvZGUvem9yYS1yZWNpcGVzLzJfbm9kZV9hbmRfYnJvd3Nlci9zcmMvc3F1YXJlLmpzIiwiL1ZvbHVtZXMvZGF0YS9Db2RlL3pvcmEtcmVjaXBlcy8yX25vZGVfYW5kX2Jyb3dzZXIvdGVzdC9zcGVjcy9zcXVhcmUuanMiLCIvVm9sdW1lcy9kYXRhL0NvZGUvem9yYS1yZWNpcGVzLzJfbm9kZV9hbmRfYnJvd3Nlci90ZXN0L2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IChhLCBiKSA9PiBhICogYjsiLCJpbXBvcnQgem9yYSBmcm9tICd6b3JhJztcbmltcG9ydCBtdWx0aXBseSBmcm9tICcuLi8uLi9zcmMvbXVsdGlwbHknO1xuXG5leHBvcnQgZGVmYXVsdCB6b3JhKClcblx0LnRlc3QoJ2ludGVnZXIgbXVsdGlwbGljYXRpb24nLCB0ID0+IHtcblx0XHR0LmVxdWFsKG11bHRpcGx5KDIsIDMpLCA2LCAnMiAqIDMgPSA2Jylcblx0fSk7IiwiZXhwb3J0IGRlZmF1bHQgeCA9PiB4ICogeDsiLCJpbXBvcnQgem9yYSBmcm9tICd6b3JhJztcbmltcG9ydCBzcXVhcmUgZnJvbSAnLi4vLi4vc3JjL3NxdWFyZSc7XG5cbmV4cG9ydCBkZWZhdWx0IHpvcmEoKVxuXHQudGVzdCgnaW50ZWdlciBzcXVhcmUnLCB0ID0+IHtcblx0XHR0LmVxdWFsKHNxdWFyZSgyKSwgNCwgJzIgKiAyID0gNCcpXG5cdH0pOyIsImltcG9ydCB6b3JhIGZyb20gJ3pvcmEnO1xuaW1wb3J0IG11bHRpcGx5IGZyb20gJy4vc3BlY3MvbXVsdGlwbHknO1xuaW1wb3J0IHNxdWFyZSBmcm9tICcuL3NwZWNzL3NxdWFyZSc7XG5cbnpvcmEoKVxuXHQudGVzdChtdWx0aXBseSlcblx0LnRlc3Qoc3F1YXJlKVxuXHQucnVuKCk7XG4iXSwibmFtZXMiOlsibXVsdGlwbHkiLCJzcXVhcmUiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7OytCQUFDLC9CQ0cvQixpQkFBZSxJQUFJLEVBQUU7RUFDbkIsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUMsSUFBSTtFQUNwQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBQztFQUN2QyxDQUFDOztBQ05ILGFBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDOzt3QkFBQyx4QkNHMUIsZUFBZSxJQUFJLEVBQUU7RUFDbkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsSUFBSTtFQUM1QixDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsV0FBVyxFQUFDO0VBQ2xDLENBQUM7O0lBQUMsSkNGSixJQUFJLEVBQUU7RUFDSixJQUFJLENBQUNBLFVBQVEsQ0FBQztFQUNkLElBQUksQ0FBQ0MsUUFBTSxDQUFDO0VBQ1osR0FBRyxFQUFFLENBQUM7Ozs7In0=
