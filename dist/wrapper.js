"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const _path = require("path");
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
        // filter methods withour @request decorator
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
const wrapper = ({ router, }, options) => {
    handleMapDir(router, _path.resolve() + '/app/controller', { recursive: true });
    handleSwagger(router, options);
};
exports.default = wrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi93cmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNEJBQTRCO0FBQzVCLDhCQUE4QjtBQUM5QiwrQ0FBd0M7QUFDeEMsK0NBQXdDO0FBQ3hDLHlDQUFrQztBQUNsQywyQ0FBdUM7QUFDdkMsbUNBQXVEO0FBQ3ZEOztHQUVHO0FBQ0gsTUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFFN0Q7OztHQUdHO0FBQ0gsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ2pELElBQUksQ0FBQyxVQUFVLEVBQUU7UUFDZixNQUFNLElBQUksRUFBRSxDQUFDO1FBQ2IsT0FBTztLQUNSO0lBRUQsSUFBSSxVQUFVLENBQUMsS0FBSyxFQUFFO1FBQ3BCLEdBQUcsQ0FBQyxjQUFjLEdBQUcsa0JBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDcEU7SUFDRCxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUU7UUFDbkIsR0FBRyxDQUFDLGVBQWUsR0FBRyxrQkFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzdEO0lBQ0QsSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFO1FBQ25CLEdBQUcsQ0FBQyxhQUFhLEdBQUcsa0JBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDakU7SUFDRCxNQUFNLElBQUksRUFBRSxDQUFDO0FBQ2YsQ0FBQyxDQUFDO0FBRUYsTUFBTSxhQUFhLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFF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