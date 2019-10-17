# discussion

## project scaffolding

A simple Nodejs library written in commonjs style with a source directory and a matching test directory

## Run test

In the same way than the library (``./src/index.js``), the testing program has an entry point ``./test/index.js``
To run the tests you simply have to run the test entry point with node executable ``node ./test/index.js``
If you wish to run a particular file only (eg ``./test/addition.spec.js``) just pass it as a parameter: ``node ./test/addition.spec.js``

Alternatively you can use the ``require`` node cli parameter with a glob matching the test files you want to execute: ``node -r ./test/*.spec.js``
and avoid the burden of maintaining the test entry point.

So in the ``scripts`` section of your ``package.json``, you can set the following test script

```json
{
  "scripts" : {
      "test": "node ./test/index.js"
   } 
}
``` 

## Custom reporting

If you do not find the TAP output convenient to troubleshoot an error or a failing test, you can pipe the output stream to a specific reporter. This reporter may eventually vary from one developer to another
so you'll better install it globally first: ``npm i -g faucet``.
Then run ``npm t | faucet``

## Exit code (for Continuous Integration - CI)

Zora itself does not set the exit code and delegate this decision to any reporter/process downstream. However CI platforms usually expect an exit code of 1 to mark a build as failed.
To avoid false positive, make sure your ci script pipe the TAP output to a reporter which handles exit code.

Example of ci script
``
npm t | tap-set-exit; # echo $? if you wish to verify your setup  (should output 1 as one test is failing)
``

In your ``package.json``
```json
{
  "scripts" : {
      "test": "node ./test/index.js",
      "test:ci": "npm t | tap-set-exit"
   } 
}
``` 

## Code coverage

For the code coverage you can use [c8]() which uses v8's native bindings:
``c8 node ./test/index.js``

Or in your ``package.json``

```json
{
  "scripts" : {
      "test": "node ./test/index.js",
      "test:ci": "npm t | tap-set-exit",
      "test:coverage": "c8 npm t"
   } 
}
```

## Dev workflow

### "Only" 

While developing a new feature or debugging a failing test, you might want only to run a particular set of tests.

First, change the tests you want to run with the ``only method``

```javascript
const {only} = require('zora');
const {square} = require('../src/index.js');

// ...

only(`square`, t => {
    t.eq(square(1), 2, ` 1 * 1 = 1`); // fails !!
    t.eq(square(3), 9, ` 3 * 3 = 9`);
});
```

You can then tell zora to run in "RUN_ONLY" mode with an environment variable. 

``RUN_ONLY=true npm t``

If later you try to run the tests in regular mode, zora will throw an exception to remind you to change the ``only`` call with a normal ``test`` call so your testing program remains valid
For convenience you can add a script in your ``package.json``

```json
{
  "scripts": {
    "test": "node ./test/index.js",
    "test:ci": "npm t | tap-set-exit",
    "test:coverage": "c8 npm t",
    "test:only": "RUN_ONLY=true npm t"
  }
}
```
### Watch mode

Some people like the tests to run on every file change. There are several ways to tackle this requirement. It basically requires the ability to run a js file with node (or to run a command) on every watched file change. 
There are plenty of tools in npm to do so. One of the easiest way might be to run your testing program with [nodemon](https://www.npmjs.com/package/nodemon): ``nodemon ./test/index.js``. You can of course pipe the output in a convenient reporter.
Alternatively you can use [chokidar-cli](https://github.com/kimmobrunfeldt/chokidar-cli): ``chokidar "{test,src}/*.js" -c "npm t"``

In your ``package.json``
```json
{
  "scripts": {
    "test": "node ./test/index.js",
    "test:ci": "npm t | tap-set-exit",
    "test:coverage": "c8 npm t",
    "test:only": "RUN_ONLY=true npm t",
    "dev": "chokidar \"{test,src}/*.js\" -c \"npm t | faucet\""
  }
}
```


 

