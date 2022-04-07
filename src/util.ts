export const isFunction = (fun: any) => {
    return fun && {}.toString.call(fun) === '[object Function]'
  }
  export const isString = (obj: string) => {
    return obj && Object.prototype.toString.call(obj) === '[object String]'
  }
  
  export const isInteger = (n: number) => {
    return Number(n) === n && n % 1 === 0
  }
  export const isBoolean = (val: any) => {
    return 'boolean' === typeof val
  }
  
  export const hotLoad = (path: string) => {
    delete require.cache[require.resolve(path)]
    return require(path)
  }
  