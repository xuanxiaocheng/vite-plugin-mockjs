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

## filter proxy examples

```json
{
   "DELETE /navigation 500": true,
   "/structDtools 200": "Dtools.js",
   "getData.do": { "success": true, "data": { "Data": null }, "message": null, "status": 200 },
   "resource 1000": "Report",
   
}
```

```Dtools.js.js
const mysql = require('./mysql.json')
const redis = require('./redis.json')
const EMPTY = { success: true, data: {}, message: null, status: 200 }

const config = {
    memcached: EMPTY,
    redis,
    mysql
}

module.exports = function(request, response) {
    const type = request.url.split('/')[2]
    response.end(JSON.stringify(config[type]))
}
```


## License

MIT

[npm-url]: https://npmjs.com/package/vite-plugin-filter-proxy
[vite-url]: https://vitejs.dev
