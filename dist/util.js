"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotLoad = exports.isBoolean = exports.isInteger = exports.isString = exports.isFunction = void 0;
const isFunction = (fun) => {
    return fun && {}.toString.call(fun) === '[object Function]';
};
exports.isFunction = isFunction;
const isString = (obj) => {
    return obj && Object.prototype.toString.call(obj) === '[object String]';
};
exports.isString = isString;
const isInteger = (n) => {
    return Number(n) === n && n % 1 === 0;
};
exports.isInteger = isInteger;
const isBoolean = (val) => {
    return 'boolean' === typeof val;
};
exports.isBoolean = isBoolean;
const hotLoad = (path) => {
    delete require.cache[require.resolve(path)];
    return require(path);
};
exports.hotLoad = hotLoad;
//# sourceMappingURL=util.js.map