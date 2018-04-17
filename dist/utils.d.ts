/**
 * eg. /api/{id} -> /api/:id
 * @param {String} path
 */
declare const convertPath: (path: any) => any;
declare const getPath: (prefix: string, path: string) => string;
declare const readSync: (dir: string, result?: any, recursive?: boolean) => any;
export { convertPath, getPath, readSync };
