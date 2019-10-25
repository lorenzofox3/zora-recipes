# discussion

## project scaffolding

A simple Nodejs library written in Typescript with a source directory and a matching test directory. It is basically the same project than the first recipe
but with Typescript.

Everything we wrote remains valid, with few extra steps:
1. Notice the ``tsconfig.json`` file where we transform the source and test files to valid commonjs files. We also use source maps to make sure tools like c8, or debuggers can point directly at our source code
2. We keep the ``./test/index.js`` in pure Javascript: It is simply because our spec files are not exactly *modules*, so we can't import them. We can
still use ``require`` to make sure they are concatenated into a single file.

## Build

Nodejs does not understand typescript, so we need to compile our source and test files first with the command ``tsc``. So if one wants to run the tests it will have
to type the following command ``tsc && npm t``

in in the ``package.json``
```json
{
  "scripts": {
    "test:build": "tsc",
    "test:run": "node ./test/index.js",
    "test": "npm run test:build && npm run test:run",
    "test:ci": "npm t | tap-set-exit",
    "test:coverage": "c8 npm run test:run",
    "test:only": "RUN_ONLY=true npm t"
  }
}
```

## Dev mode 

The dev mode is also a bit different as we need to watch the typescript files to compile them first and watch the produced js files too to actually run 
the test program. 

You can run these two processes in two different terminals to make sure to maintain a separation and different logs:
1. In one terminal  ``npm run test:build -- -w``
2. In a second terminal ``chokidar "{test,src}/*.js" -c "npm run test:run"``

Alternatively, in UNIX system you can run these two processes in parallel: ``npm run test:build -- -w & chokidar "{test,src}/*.js" -c "npm run test:run"``

However this may not be applicable to all the platforms and may make the logs a bit more complicated to read. 
Don't worry there are packages in npm (like run-p) to run child processes in parallel and manage log consistently

``package.json``
```json
{
  "scripts": {
    "test:build": "tsc",
    "test:run": "node ./test/index.js",
    "test": "npm run test:build && npm run test:run",
    "test:ci": "npm t | tap-set-exit",
    "test:coverage": "c8 npm run test:run",
    "test:only": "RUN_ONLY=true npm t",
    "dev": "npm run build -- -w & chokidar \"{test,src}/*.js\" -c \"npm run test:run\""
  }
}
```


 