"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
/**
 * used for building swagger docs object
 */
const apiObjects = {};
exports.apiObjects = apiObjects;
const _addToApiObject = (target, name, apiObjects, content) => {
    const key = `${target.constructor.name}-${name}`;
    if (!apiObjects[key])
        apiObjects[key] = {};
    Object.assign(apiObjects[key], content);
};
const _desc = (type, text) => (target, name, descriptor) => {
    descriptor.value[type] = text;
    _addToApiObject(target, name, apiObjects, { [type]: text });
    return descriptor;
};
const _params = (type, parameters) => (target, name, descriptor) => {
    if (!descriptor.value.parameters)
        descriptor.value.parameters = {};
    descriptor.value.parameters[type] = parameters;
    // additional wrapper for body
    let swaggerParameters = parameters;
    if (type === 'body') {
        swaggerParameters = [{
                name: 'data',
                description: 'request body',
                schema: {
                    type: 'object',
                    properties: parameters
                },
            }];
    }
    else {
        swaggerParameters = Object.keys(swaggerParameters).map(key => Object.assign({ name: key }, swaggerParameters[key]));
    }
    swaggerParameters.forEach((item) => {
        item.in = type;
    });
    _addToApiObject(target, name, apiObjects, { [type]: swaggerParameters });
    return descriptor;
};
const request = (method, path) => (target, name, descriptor) => {
    method = _.toLower(method);
    descriptor.value.method = method;
    descriptor.value.path = path;
    _addToApiObject(target, name, apiObjects, {
        request: { method, path },
        security: [{ ApiKeyAuth: [] }]
    });
    return descriptor;
};
exports.request = request;
const middlewares = middlewares => (target, name, descriptor) => {
    if (!target || !name)
        throw new Error();
    descriptor.value.middlewares = middlewares;
    return descriptor;
};
exports.middlewares = middlewares;
const responses = (responses = { 200: { description: 'success' } }) => (target, name, descriptor) => {
    descriptor.value.responses = responses;
    _addToApiObject(target, name, apiObjects, { responses });
    return descriptor;
};
exports.responses = responses;
const desc = _.curry(_desc);
exports.desc = desc;
// description and summary
const description = desc('description');
exports.description = description;
const summary = desc('summary');
exports.summary = summary;
const tags = desc('tags');
exports.tags = tags;
const params = _.curry(_params);
exports.params = params;
// below are [parameters]
// query params
const query = params('query');
exports.query = query;
// path params
const path = params('path');
exports.path = path;
// body params
const body = params('body');
exports.body = body;
// formData params
const formData = params('formData');
exports.formData = formData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL2RlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRCQUE0QjtBQUU1Qjs7R0FFRztBQUNILE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztBQTJGcEIsZ0NBQVU7QUF4RlosTUFBTSxlQUFlLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsRUFBRTtJQUM1RCxNQUFNLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO1FBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUM7QUFHRixNQUFNLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFBRTtJQUN6RCxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUM5QixlQUFlLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDNUQsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUU7SUFDakUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVTtRQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUNuRSxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUM7SUFFL0MsOEJBQThCO0lBQzlCLElBQUksaUJBQWlCLEdBQUcsVUFBVSxDQUFDO0lBQ25DLElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtRQUNuQixpQkFBaUIsR0FBRyxDQUFDO2dCQUNuQixJQUFJLEVBQUUsTUFBTTtnQkFDWixXQUFXLEVBQUUsY0FBYztnQkFDM0IsTUFBTSxFQUFFO29CQUNOLElBQUksRUFBRSxRQUFRO29CQUNkLFVBQVUsRUFBRSxVQUFVO2lCQUN2QjthQUNGLENBQUMsQ0FBQztLQUNKO1NBQU07UUFDTCxpQkFBaUIsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDckg7SUFDRCxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNqQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztJQUNqQixDQUFDLENBQUMsQ0FBQztJQUVILGVBQWUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO0lBQ3pFLE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQUVGLE1BQU0sT0FBTyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUFFO0lBQzdELE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNCLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUNqQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDN0IsZUFBZSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO1FBQ3hDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7UUFDekIsUUFBUSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLENBQUM7S0FDL0IsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBdUNPLDBCQUFPO0FBcENoQixNQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFBRTtJQUM5RCxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSTtRQUFFLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUN4QyxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDM0MsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBaUNZLGtDQUFXO0FBL0J6QixNQUFNLFNBQVMsR0FBRyxDQUFDLFNBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUU7SUFDbEcsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQ3ZDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDekQsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBMkJtQyw4QkFBUztBQTFCOUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQXlCTyxvQkFBSTtBQXZCdkMsMEJBQTBCO0FBQzFCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQXNCQyxrQ0FBVztBQXBCcEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBb0JkLDBCQUFPO0FBbEJ6QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFrQitDLG9CQUFJO0FBaEI3RSxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBZ0JMLHdCQUFNO0FBZGpDLHlCQUF5QjtBQUV6QixlQUFlO0FBQ2YsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBV3dCLHNCQUFLO0FBVDNELGNBQWM7QUFDZCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7QUFRaUMsb0JBQUk7QUFOakUsY0FBYztBQUNkLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUt1QyxvQkFBSTtBQUh2RSxrQkFBa0I7QUFDbEIsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBR1QsNEJBQVEifQ==