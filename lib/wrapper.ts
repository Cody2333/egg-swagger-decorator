import * as _ from 'lodash';
import * as _path from 'path';
import swaggerHTML from './swaggerHTML';
import swaggerJSON from './swaggerJSON';
import validate from './validate';
import {apiObjects} from './decorator';
import {convertPath, getPath, readSync} from './utils';
/**
 * allowed http methods
 */
const reqMethods = ['get', 'post', 'put', 'patch', 'delete'];

/**
 * middlewara for validating [query, path, body] params
 * @param {Object} parameters
 */
const validator = parameters => async(ctx, next) => {
  if (!parameters) {
    await next();
    return;
  }

  if (parameters.query) {
    ctx.validatedQuery = validate(ctx.request.query, parameters.query);
  }
  if (parameters.path) {
    ctx.validatedParams = validate(ctx.params, parameters.path);
  }
  if (parameters.body) {
    ctx.validatedBody = validate(ctx.request.body, parameters.body);
  }
  await next();
};

const handleSwagger = (router, options) => {
  const {
    swaggerJsonEndpoint = '/swagger-json',
    swaggerHtmlEndpoint = '/swagger-html',
    prefix = ''
  } = options;

  // setup swagger router
  router.get(swaggerJsonEndpoint, async(ctx) => {
    ctx.body = swaggerJSON(options, apiObjects);
  });
  router.get(swaggerHtmlEndpoint, async(ctx) => {
    ctx.body = swaggerHTML(getPath(prefix, swaggerJsonEndpoint));
  });
};

const handleMap = (router, StaticClass) => {
  const ctx = {
    app: {}
  }
  const c = new StaticClass(ctx);
  const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(c))
  // remove useless field in class object:  constructor, length, name, prototype
  _.pull(methods, 'name', 'constructor', 'length', 'prototype', 'pathName', 'fullPath');
  // map all method in methods
  methods
  // filter methods withour @request decorator
    .filter((item) => {
    const {path, method} = c[item];
    if (!path && !method) {
      return false;
    }
    return true;
  })
  // add router
    .forEach((item) => {
    const {path, method} = c[item];
    let {
      middlewares = []
    } = c[item];
    if (typeof middlewares === 'function') {
      middlewares = [middlewares];
    }
    if (!Array.isArray(middlewares)) {
      throw new Error('middlewares params must be an array or function');
    }
    middlewares.forEach((item) => {
      if (typeof item !== 'function') {
        throw new Error('item in middlewares must be a function');
      }
    });
    if (!reqMethods.includes(method)) {
      throw new Error(`illegal API: ${method} ${path} at [${item}]`);
    }
    const chain = [
      `${convertPath(path)}`,
      validator(c[item].parameters),
      ...middlewares,
      ctx => {
        const c = new StaticClass(ctx);
        c[item]();
      }
    ];
    router[method](...chain);
  });
};

const handleMapDir = (router, dir, options) => {
  const {
    recursive = false
  } = options;
  let filenames = readSync(dir, [], recursive).map(name => name.substring(0,name.length-3));
  filenames = _.uniq(filenames);
  const classes = filenames.map(filename => require(filename));
  classes
    .map(c => c.default)
    .forEach((c) => {
      handleMap(router, c);
    });
};

const wrapper = ({
  router,
}, options) => {
  handleMapDir(router, _path.resolve() + '/app/controller', {recursive: true})
  handleSwagger(router, options);
};

export default wrapper;
