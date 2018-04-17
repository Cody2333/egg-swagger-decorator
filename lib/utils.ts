import * as _path from 'path';
import * as _fs from 'fs';
/**
 * eg. /api/{id} -> /api/:id
 * @param {String} path
 */
const convertPath = (path) => {
  const re = new RegExp('{(.*?)}', 'g');
  return path.replace(re, ':$1');
};

const getPath = (prefix : string, path : string) => `${prefix}${path}`.replace('//', '/');

const readSync = (dir: string, result: any = [], recursive: boolean = true) => {
  const files = _fs.readdirSync(dir);
  files.forEach((filename) => {
    const filedir = _path.join(dir, filename);
    const stat = _fs.statSync(filedir);
    if (stat.isFile()) result.push(filedir);
    if (recursive && stat.isDirectory()) readSync(filedir, result, true);
  });
  return result;
};

export { convertPath, getPath, readSync };
