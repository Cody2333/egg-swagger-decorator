"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const swaggerTemplate_1 = require("./swaggerTemplate");
const utils_1 = require("./utils");
const swaggerJSON = (options, apiObjects) => {
    const { title = 'API DOC', description = 'API DOC', version = '1.0.0', prefix = '', swaggerOptions = {} } = options;
    const resultJSON = swaggerTemplate_1.default(title, description, version, swaggerOptions);
    _.chain(apiObjects)
        .forEach((value) => {
        if (!Object.keys(value).includes('request')) {
            throw new Error('missing [request] field');
        }
        const { method } = value.request;
        let { path } = value.request;
        path = utils_1.getPath(prefix, path); // 根据前缀补全path
        const summary = value.summary
            ? value.summary
            : '';
        const apiDescription = value.description
            ? value.description
            : summary;
        const defaultResp = {
            200: {
                description: 'success',
            },
        };
        const responses = value.responses
            ? value.responses
            : defaultResp;
        const { query = [], path: pathParams = [], body = [], tags, formData = [], security, } = value;
        const parameters = [
            ...pathParams,
            ...query,
            ...formData,
            ...body,
        ];
        // init path object first
        if (!resultJSON.paths[path]) {
            resultJSON.paths[path] = {};
        }
        // add content type [multipart/form-data] to support file upload
        const consumes = formData.length > 0
            ? ['multipart/form-data']
            : undefined;
        resultJSON.paths[path][method] = {
            consumes,
            summary,
            description: apiDescription,
            parameters,
            responses,
            tags,
            security,
        };
    }).value();
    return resultJSON;
};
exports.default = swaggerJSON;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhZ2dlckpTT04uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvc3dhZ2dlckpTT04udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0QkFBNEI7QUFDNUIsdURBQXFDO0FBQ3JDLG1DQUFrQztBQW1CbEMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxPQUF1QixFQUFFLFVBQVUsRUFBRSxFQUFFO0lBRTFELE1BQU0sRUFBRSxLQUFLLEdBQUcsU0FBUyxFQUFFLFdBQVcsR0FBRyxTQUFTLEVBQUUsT0FBTyxHQUFHLE9BQU8sRUFBRSxNQUFNLEdBQUcsRUFBRSxFQUFFLGNBQWMsR0FBRyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFFcEgsTUFBTSxVQUFVLEdBQUcseUJBQUksQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztJQUVyRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztTQUNoQixPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FBRTtRQUU1RixNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUNqQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUM3QixJQUFJLEdBQUcsZUFBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWE7UUFDM0MsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU87WUFDM0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPO1lBQ2YsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNQLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxXQUFXO1lBQ3RDLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVztZQUNuQixDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ1osTUFBTSxXQUFXLEdBQWE7WUFDNUIsR0FBRyxFQUFFO2dCQUNILFdBQVcsRUFBRSxTQUFTO2FBQ3ZCO1NBQ0YsQ0FBQztRQUNGLE1BQU0sU0FBUyxHQUFhLEtBQUssQ0FBQyxTQUFTO1lBQ3pDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUztZQUNqQixDQUFDLENBQUMsV0FBVyxDQUFDO1FBQ2hCLE1BQU0sRUFDSixLQUFLLEdBQUcsRUFBRSxFQUNWLElBQUksRUFBRSxVQUFVLEdBQUcsRUFBRSxFQUNyQixJQUFJLEdBQUcsRUFBRSxFQUNULElBQUksRUFDSixRQUFRLEdBQUcsRUFBRSxFQUNiLFFBQVEsR0FDVCxHQUFHLEtBQUssQ0FBQztRQUVWLE1BQU0sVUFBVSxHQUFHO1lBQ2pCLEdBQUcsVUFBVTtZQUNiLEdBQUcsS0FBSztZQUNSLEdBQUcsUUFBUTtZQUNYLEdBQUcsSUFBSTtTQUNSLENBQUM7UUFFRix5QkFBeUI7UUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUFFO1FBRTdELGdFQUFnRTtRQUNoRSxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUM7WUFDekIsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUVkLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUc7WUFDL0IsUUFBUTtZQUNSLE9BQU87WUFDUCxXQUFXLEVBQUUsY0FBYztZQUMzQixVQUFVO1lBQ1YsU0FBUztZQUNULElBQUk7WUFDSixRQUFRO1NBQ1QsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2IsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBRUYsa0JBQWUsV0FBVyxDQUFDIn0=