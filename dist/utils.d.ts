/**
 * eg. /api/{id} -> /api/:id
 * @param {String} path
 */
declare const convertPath: (path: any) => any;
declare const getPath: (prefix: string, path: string) => string;
declare function loadSwaggerClassesToContext(app: any): void;
export { convertPath, getPath, loadSwaggerClassesToContext };
