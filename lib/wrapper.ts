import { Application, Controller, Router } from 'egg';
import * as _ from 'lodash';
import {apiObjects} from './decorator';
import swaggerHTML from './swaggerHTML';
import swaggerJSON from './swaggerJSON';
import {WrapperOptions} from './swaggerJSON';
import {convertPath, getPath, loadSwaggerClassesToContext} from './utils';
import validate from './validate';
/**
 * allowed http methods
 */
const reqMethods = ['get', 'post', 'put', 'patch', 'delete'];

interface Parameters {
  query?: {};
  path?: {};
  body?: {};
  [param: string]: any;
}

const validator = (parameters: Parameters) => async(ctx, next) => {
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

const handleSwagger = (router : Router, options: WrapperOptions) => {
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

declare module 'egg' {
  interface Application {
    createAnonymousContext(req?: any): Context;
    swaggerControllerClasses: {};
  }
  interface Context {
    validatedQuery?: {};
    validatedParams?: {};
    validatedBody?: {};
  }
}

const handleMap = (app : Application, ControllerClass : typeof Controller) => {
  const anonymousContext = app.createAnonymousContext();
  const router = app.router;
  const c : Controller = new ControllerClass(Object.assign(anonymousContext));
  const methods : string[] = Object.getOwnPropertyNames(Object.getPrototypeOf(c));
  // remove useless field in class object:  constructor, length, name, prototype
  _.pull(methods, 'name', 'constructor', 'length', 'prototype', 'pathName', 'fullPath');
  // map all method in methods
  methods
  // filter methods without @request decorator
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
      async (ctx) => {
        const c = new ControllerClass(ctx);
        await c[item]();
      }
    ];
    router[method](...chain);
  });
};

const handleMapDir = (app: Application) => {
  loadSwaggerClassesToContext(app);
  const classes = app.swaggerControllerClasses;
  Object.keys(classes).forEach((name) => {handleMap(app, classes[name]);});
};

const wrapper = (app : Application, options?: WrapperOptions) => {
  const opts: WrapperOptions = {
    title: 'API DOC',
    description: 'API DOC',
    version: 'v1.0.0',
    prefix: '',
    swaggerJsonEndpoint: '/swagger-json',
    swaggerHtmlEndpoint: '/swagger-html',
    makeSwaggerRouter: false,
  };
  Object.assign(opts, options || {});

  const {router} = app;
  if (makeSwaggerRouter) {handleMapDir(app); }
  handleSwagger(router, opts);
};
const makeSwaggerRouter = (app: Application) => handleMapDir(app);
export  {wrapper, makeSwaggerRouter};
