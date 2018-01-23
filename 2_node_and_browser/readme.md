# Library for nodejs and browsers

## Introduction

In our [previous tutorial]() we have created a math library for nodejs. We want now to make sure it will be able to run in the browser as well.

The problem is that with `require` and `exports.someProperty` we have used a module system (cjs) only nodejs can understand. So a user won't be able to simply drop our source files in a html document and read it with a browser to use it.
We need to package it for our different environments.

We could simply use [browserify](). However, we are going to change our source code (and tests) to use the standard module system as specified in the EcmaScript documentation.
Then, with a ** module bundler ** such as [rollup](), we will package our library according to different environments.

Indeed, most of the modern browsers support natively the EcmaScript module system.
and Nodejs itself has started to support EcmaScript modules. You'll need to follow some conventions though.

So for now, just pay attention to the fact we have changed our source files and test files to use EcmaScript module specification (`import` and `export`)

## build and production packaging

### Nodejs

#### CJS

in our `package.json` we add a new script:

build:cjs `rollup -f cjs ./src/index.js > ./dist/index.js`

We then create a `./dist` folder for our production artifacts and run the command `npm run build:cjs`.

This command tells rollup to create a commonjs bundle with ./src/index.js as entry point and to stream the result into the file `./dist/index.js`. ([standard unix redirection ">"]())
If you open the latter you'll see the definition of our library as a commonjs module.

We then add the command build:es `rollup -f es ./src/index.js > ./dist/index.mjs`

Same than above, but it creates an EcmaScript module instead (in our simple case it basically concat our source files): run `npm run build:es` to see the result.

Note however the **mjs** extension file. Indeed Nodejs can now recognize the ES module format but you'll need to add the mjs extension to your file.
Last thing to do. We modify our `package.json` so the `main` property points to the ** folder ** `./dist/` (or it could have been `./dist/index` without the extension).
The reason is because when Nodejs will try to resolve our module, it may have to target `index.js or index.mjs` depending on the module resolution mode. However it will be smart enough to resolve the file with the correct extension if you specify only the filename.
You'll see that in action in the [example](#example) section

#### Standard EcmaScript modules

### Browsers

We could actually directly use the `./dist/index.mjs` file from an html file for browsers that supports the new EcmaScript module syntax. However, for convenience we may want to provide a version of our library
older browsers can read. Moreover the `mjs` extension can cause a browser not to regonize the javascricpt mime type and therefore it may not be able to run your application.

so we are going to add the script:

build:cdn:iife
`rollup -f iife -n superLib ./src/index.js -m -o ./dist/super-lib.js`.

It tells rollup to create an immediately invoked function expression whose return value will be an object with the exports of our library. The `-n`
parameter simply tells the variable name will be `superLib` whereas the `-m` flag will create a sourcemap file which may be convenient if your file is served from a cdn such [unpkg]()

You can now try your lib directly from the browser:
```Markup
<script src="path/to/dist/super-lib.js></script>
<script>
const multiply = superLib.multiply; // Our module is now available through the global variable "superLib"
console.log(multiply(2,3))
</script>
```

You'll see in details in the [example](#example section)

Before we proceed. We add a last script

build:cdn:es `rollup -f es ./src/index.js -m -o ./dist/super-lib.module.js`

It just create an Ecmascript Module of our source code (exact same bundle thant index.mjs) with a source map file and with a `js` extension
In this case it is just for convenience but you'll see how useful it could be in our next tutorial.

We have also added in our `package.json` a `module` and a `js:next` properties which point to our source entry point. These properties are often use by module bundlers and other tools, by adding theses properties we ease their job!

## example

### NodeJs

In the `./example/node/` folder we have two files. Each of theses is a small nodejs application which consumes our library. There use different module syntax though.
You 'll see that none of the require or import statement specify an extension format.
* The `cjs.js` file can be executed with `node ./example/node/cjs.js`
* The `harmony.mjs` (mjs extension !) requires node 8+ and has to be run with harmony flag: `node --experimental-modules ./example/node/harmony.mjs`

However both format can consume our library. Mission accomplished !

### Browsers

//todo

## Tests


## conclusion

- many command -> use conf
- intro next (with a dep)
- alternative (source as mjs)
