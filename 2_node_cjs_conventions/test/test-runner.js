#!/usr/bin/env node
const arg = require('arg');
const globby = require('globby');
const {createHarness} = require('zora');
const path = require('path');

const DEFAULT_FILE_PATTERN = ['./test/*.spec.js'];

(async function () {
    const {_: filePatternArg, ['--only']: runOnly} = arg({'--only': Boolean, '-o': '--only'}, {
        permissive: false,
        argv: process.argv.slice(2)
    });

    const filePattern = filePatternArg.length > 0 ? filePatternArg : DEFAULT_FILE_PATTERN;

    // create a custom test harness
    const testHarness = createHarness({
        indent: true,
        runOnly
    });
    try {
        const files = await globby(filePattern);
        for (const f of files) {
            testHarness.test(f, require(path.resolve(process.cwd(), f)));
        }
        // force indented reporting
        await testHarness.report();
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        process.exit(testHarness.pass ? 0 : 1);
    }
})();