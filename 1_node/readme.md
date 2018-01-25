# Building a nodejs library

## Introduction

For this tutorial we are going to create a simple math library with two functions:

1. `multiply` which takes two integers as arguments and returns the multiplication of one by the other.
2. `square` which takes an integer and returns the square of this integer.

These source files corresponding to these functions are in the `./src` directory.
They are simple javascript code. You will note that they use the **Commonjs (cjs)** module format, specific to Nodejs: for the moment our library only targets Nodejs.

## build and production packaging

There is nothing particular to do here as Nodejs will be able to run our source files directly.
We have simply a `./src/index.js` file which exports publicly our function: it will be the entry point of our module.
You'll notice that in the `./package.json` file, the `main` property correctly targets `./src/index.js`.

When one will install our library, he will simply be able to require it using the code
```Javascript
const math = require('super-lib');
```

## example

A library is meant to be used by other application code.
In the `./example` folder we have a sample program which uses our library. you can run it:

`node ./example/index.js`

or by using the provided `example` script in the `./package.json`

`npm run example`

Note: we require our library using a relative path as our consumer code is within the same repository than the library code (and that our super library is actually not published on npm).
In practice we would simply call `const math = require('super-library');`

But by the way, the first consumer of our library is actually ... its own tests !

## test

As we are good software developers we want our module to be robust: we want to make sure it does what we expect it to do and futures changes do not break the existing code.
We are therefore going to write tests.

For this purpose we are going to use [zora](https://github.com/lorenzofox3/zora) which is a small but very powerfull testing library for Nodejs and browser environments.

we install it as a development dependency by running the command:
`npm install --save-dev zora`

We have created a `./test` directory in with we have a sub directory `./test/specs`. In this directory we have the test files related to our functions. You can have a look at
zora documentation if you don't understand it. Just note these test files export test plans: `zora()` returns a test plan (and can be chained with `test` method).

The `./test/index.js` is our test entry point like ./src/index.js is our source entry point.

You'll see in this file:
1. we create a test plan (the master plan) to which we pass our spec plans.
2. We call `run` on this master plan: this will effectively run our tests.

By having an entry point for our tests we can skip an entire plan (calling `.skip` instead of `.test`, or commenting out the line) but more importantly we have made our tests
a ** standard ** self executing javascript program. We don't need any particular test runner to test our code, we can simply use any javascript engine.
For example we can use the command `node ./test/index.js`.

In our `./package.json` file we add under the `scripts` an entry for the `test` command: `node ./test/index.js`.

Now we are able to run our test with the command `npm test` (which is the default for many Continuous Integration tools). Great !

### pretty report

If you run it, you'll see in the console the output of the tests. This text follows the [Test Anything Protocol (TAP)](). This protocol is quite popular but, arguably, not very human friendly.
However as it is very common there are out there [many programs]() which can read it and make it prettier or easier to read for humans (or even do funny things with it).
That is the advantage of using a widely spread protocol for our result format: we can benefit from programs other people have already written and are not stuck in a single ecosystem.

you can try for example [tap-diff]()

`npm install --save-dev tap-diff`

we modify our `package.json` to make sure the result of our test program is passed to the tap-diff reporter (using the unix pipe command `|`)

`node ./test/index.js | tap-diff`

You can of course use any [tap reporter]() instead.

### alternative

//todo command line tool

## Conclusion

We have created a small math library for nodejs and were able to test it easily. However commonjs module system is specific to nodejs platform and may actually be deprecated with time as nodejs has
started to support the standard [EcmaScript Module specification]().

In the next tutorial we are going to modify our library so it can run on different platforms (nodejs and browsers) and make sure our tests can also run on theses platforms too.
