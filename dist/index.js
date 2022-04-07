"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const util_1 = require("./util");
function parsePath(path) {
    let config = null;
    if (path.indexOf(" ") > -1) {
        config = path.split(" ");
        if (config.length === 2 && util_1.isInteger(+config[1])) {
            config = ["get"].concat(config);
        }
    }
    else {
        config = ["get", path];
    }
    config[0] = config[0].toLowerCase();
    return config;
}
const successFailResult = {
    true: { success: true, data: true, message: null, status: 200 },
    false: { success: false, message: null, data: false, status: 200 },
};
function default_1(options = {}) {
    options.entry =
        options.entry || path_1.default.resolve(process.cwd(), `mock/routes.json`);
    options.data = options.data || path_1.default.resolve(process.cwd(), `mock/data`);
    return {
        configureServer: function (app) {
            const routeConfig = require(options.entry);
            Object.keys(routeConfig).forEach(function (path) {
                const [method, reqPath, delay = false] = parsePath(path);
                const routePath = routeConfig[path];
                app.middlewares.use(reqPath, (req, res, next) => {
                    if (routePath) {
                        if (util_1.isBoolean(routePath)) {
                            res.end(JSON.stringify(successFailResult[routePath]));
                        }
                        else if (util_1.isString(routePath)) {
                            let filePath = routePath;
                            if (!routePath.endsWith(".js")) {
                                filePath = `${routePath}.json`;
                            }
                            filePath = `${options.data}/${filePath}`;
                            let mockData = util_1.hotLoad(filePath);
                            if (util_1.isFunction(mockData)) {
                                mockData = mockData(req, res);
                            }
                            if (mockData && !res.headersSent) {
                                res.end(JSON.stringify(mockData));
                            }
                        }
                        else if (util_1.isFunction(routePath)) {
                            routePath(req, res);
                        }
                        else {
                            // maybe not object ?
                            res.end(JSON.stringify(routePath));
                        }
                    }
                    else {
                        //not defined file，404
                        next();
                    }
                });
            });
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map