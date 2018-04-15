"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const swaggerHTML_1 = require("./swaggerHTML");
const swaggerJSON_1 = require("./swaggerJSON");
const validate_1 = require("./validate");
const decorator_1 = require("./decorator");
const utils_1 = require("./utils");
/**
 * allowed http methods
 */
const reqMethods = ['get', 'post', 'put', 'patch', 'delete'];
/**
 * middlewara for validating [query, path, body] params
 * @param {Object} parameters
 */
const validator = parameters => async (ctx, next) => {
    if (!parameters) {
        await next();
        return;
    }
    if (parameters.query) {
        ctx.validatedQuery = validate_1.default(ctx.request.query, parameters.query);
    }
    if (parameters.path) {
        ctx.validatedParams = validate_1.default(ctx.params, parameters.path);
    }
    if (parameters.body) {
        ctx.validatedBody = validate_1.default(ctx.request.body, parameters.body);
    }
    await next();
};
const handleSwagger = (router, options) => {
    const { swaggerJsonEndpoint = '/swagger-json', swaggerHtmlEndpoint = '/swagger-html', prefix = '' } = options;
    // setup swagger router
    router.get(swaggerJsonEndpoint, async (ctx) => {
        ctx.body = swaggerJSON_1.default(options, decorator_1.apiObjects);
    });
    router.get(swaggerHtmlEndpoint, async (ctx) => {
        ctx.body = swaggerHTML_1.default(utils_1.getPath(prefix, swaggerJsonEndpoint));
    });
};
const handleMap = (router, StaticClass) => {
    const ctx = {
        app: {}
    };
    const c = new StaticClass(ctx);
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(c));
    // remove useless field in class object:  constructor, length, name, prototype
    _.pull(methods, 'name', 'constructor', 'length', 'prototype', 'pathName', 'fullPath');
    // map all method in methods
    methods
        // filter methods without @request decorator
        .filter((item) => {
        const { path, method } = c[item];
        if (!path && !method) {
            return false;
        }
        return true;
    })
        // add router
        .forEach((item) => {
        const { path, method } = c[item];
        let { middlewares = [] } = c[item];
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
            `${utils_1.convertPath(path)}`,
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
    const { recursive = false } = options;
    let filenames = utils_1.readSync(dir, [], recursive).map(name => name.substring(0, name.length - 3));
    filenames = _.uniq(filenames);
    const classes = filenames.map(filename => require(filename));
    classes
        .map(c => c.default)
        .forEach((c) => {
        handleMap(router, c);
    });
};
const wrapper = (app, options) => {
    const { router } = app;
    handleMapDir(router, app.config.baseDir + '/app/controller', { recursive: true });
    handleSwagger(router, options);
};
exports.default = wrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi93cmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNEJBQTRCO0FBQzVCLCtDQUF3QztBQUN4QywrQ0FBd0M7QUFDeEMseUNBQWtDO0FBQ2xDLDJDQUF1QztBQUN2QyxtQ0FBdUQ7QUFFdkQ7O0dBRUc7QUFDSCxNQUFNLFVBQVUsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUU3RDs7O0dBR0c7QUFDSCxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDakQsSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUNmLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDYixPQUFPO0tBQ1I7SUFFRCxJQUFJLFVBQVUsQ0FBQyxLQUFLLEVBQUU7UUFDcEIsR0FBRyxDQUFDLGNBQWMsR0FBRyxrQkFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNwRTtJQUNELElBQUksVUFBVSxDQUFDLElBQUksRUFBRTtRQUNuQixHQUFHLENBQUMsZUFBZSxHQUFHLGtCQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDN0Q7SUFDRCxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUU7UUFDbkIsR0FBRyxDQUFDLGFBQWEsR0FBRyxrQkFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNqRTtJQUNELE1BQU0sSUFBSSxFQUFFLENBQUM7QUFDZixDQUFDLENBQUM7QUFFRixNQUFNLGFBQWEsR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRTtJQUN4QyxN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