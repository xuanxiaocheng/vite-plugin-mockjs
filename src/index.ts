import { ViteDevServer } from "vite";
import * as http from "http";
import path from "path";
import { isFunction, isBoolean, isInteger, isString, hotLoad } from "./util";

interface options {
  data: string;
  entry: string;
}

interface successFail {
  success: boolean;
  data: boolean;
  message: string;
  status: number;
}

interface successFailResult {
  [regexp: string]: successFail;
}

function parsePath(path: string) {
  let config = null;
  if (path.indexOf(" ") > -1) {
    config = path.split(" ");
    if (config.length === 2 && isInteger(+config[1])) {
      config = ["get"].concat(config);
    }
  } else {
    config = ["get", path];
  }
  config[0] = config[0].toLowerCase();
  return config;
}

const successFailResult: successFailResult = {
  true: { success: true, data: true, message: null, status: 200 },
  false: { success: false, message: null, data: false, status: 200 },
};

export default function (options = {} as options) {
  options.entry =
    options.entry || path.resolve(process.cwd(), `mock/routes.json`);
  options.data = options.data || path.resolve(process.cwd(), `mock/data`);
  return {
    configureServer: function (app: ViteDevServer) {
      const routeConfig = require(options.entry);
      Object.keys(routeConfig).forEach(function (path) {
        const [method, reqPath, delay = false] = parsePath(path);
        const routePath = routeConfig[path];
        app.middlewares.use(
          reqPath,
          (
            req: http.IncomingMessage,
            res: http.ServerResponse,
            next: Function
          ) => {
            if (routePath) {
              if (isBoolean(routePath)) {
                res.end(JSON.stringify(successFailResult[routePath]));
              } else if (isString(routePath)) {
                let filePath = routePath;
                if (!routePath.endsWith(".js")) {
                  filePath = `${routePath}.json`;
                }
                filePath = `${options.data}/${filePath}`;
                let mockData = hotLoad(filePath);
                if (isFunction(mockData)) {
                  mockData = mockData(req, res);
                }
                if (mockData && !res.headersSent) {
                  res.end(JSON.stringify(mockData));
                }
              } else if (isFunction(routePath)) {
                routePath(req, res);
              } else {
                // maybe not object ?
                res.end(JSON.stringify(routePath));
              }
            } else {
              //not defined file，404
              next();
            }
          }
        );
      });
    },
  };
}
