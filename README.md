# vite-plugin-mockjs

Provide local proxy for [Vite](https://vitejs.dev).

## Install

**node version:** >=12.0.0

**vite version:** >=2.0.0

```bash
# if using npm
npm i vite-plugin-mockjs -D
# if using yarn
yarn add vite-plugin-mockjs -D
```

### Run example

```bash
cd ./example
npm install
npm run dev
```

## Usage

- Config plugin in vite.config.ts

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteMockjs from "../dist";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockjs({
       entry: path.resolve('./mock/routes.json'),
       data: path.resolve('./mock/data')
    }),
  ]
});
```

## Module exports

- mockjsOptions

```ts
interface Options {
  entry: string, //path of routes.json 
  data: string //path of data file
}
```

## support file type
Booleans .json .js

## Booleans example
```
  //config of routes.json
  "/Booleantest 200": true,

  //return data
  true: { success: true, data: true, message: null, status: 200 },
  false: { success: false, message: null, data: false, status: 200 },
```


## routes.json examples

```
{
    "/Booleantest 200": true,         //Undefined request method defaults to GET
    "GET /Jsontest 200": "jsonTest",  //No suffix defaults to a json file
    "POST /JStest 200": "test.js"
}
```

```
//test.js
const params1 = require('./params1.json')
const EMPTY = { success: true, data: {}, message: null, status: 200 }
const config = { params1, params2: EMPTY }
module.exports = function(request, response) {
    const type = request._parsedUrl.query.split('=')[1]
    response.end(JSON.stringify(config[type]))
}
```


## License

MIT

[npm-url]: https://npmjs.com/package/vite-plugin-mockjs
[vite-url]: https://vitejs.dev
