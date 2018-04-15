/**
 * eg. /api/{id} -> /api/:id
 * @param {String} path
 */
declare const convertPath: (path: any) => any;
declare const getPath: (prefix: any, path: any) => string;
/**
 * read all files in the dir
 * @param {String} dir
 * @param {Array} result
 * @param {Boolean} recursive
 * @returns {Array} an array containing file url
 */
declare const readSync: (dir: any, result?: any, recursive?: boolean) => any;
export { convertPath, getPath, readSync };
