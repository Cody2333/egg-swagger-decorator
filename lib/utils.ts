import { Application } from 'egg';
import * as _path from 'path';
/**
 * eg. /api/{id} -> /api/:id
 * @param {String} path
 */
const convertPath = (path) => {
  const re = new RegExp('{(.*?)}', 'g');
  return path.replace(re, ':$1');
};

const getPath = (prefix : string, path : string) => `${prefix}${path}`.replace('//', '/');

function loadSwaggerClassesToContext(app: Application) {
  const opt = {
    call: false,
    caseStyle: 'lower',
    directory: _path.join(app.config.baseDir, 'app/controller'),
    typescript: true,
  };
  app.loader.loadToApp(opt.directory, 'swaggerControllerClasses', opt);
}

export { convertPath, getPath, loadSwaggerClassesToContext };
