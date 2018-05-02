"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const swaggerTemplate_1 = require("./swaggerTemplate");
const utils_1 = require("./utils");
const swaggerJSON = (options, apiObjects) => {
    const { title = 'API DOC', description = 'API DOC', version = '1.0.0', prefix = '', swaggerOptions = {} } = options;
    const swaggerJSON = swaggerTemplate_1.default(title, description, version, swaggerOptions);
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
        const description = value.description
            ? value.description
            : summary;
        const defaultResp = {
            200: {
                description: 'success'
            }
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
        if (!swaggerJSON.paths[path]) {
            swaggerJSON.paths[path] = {};
        }
        // add content type [multipart/form-data] to support file upload
        const consumes = formData.length > 0
            ? ['multipart/form-data']
            : undefined;
        swaggerJSON.paths[path][method] = {
            consumes,
            summary,
            description,
            parameters,
            responses,
            tags,
            security
        };
    }).value();
    return swaggerJSON;
};
exports.default = swaggerJSON;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhZ2dlckpTT04uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvc3dhZ2dlckpTT04udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0QkFBNEI7QUFDNUIsdURBQXFDO0FBQ3JDLG1DQUFrQztBQWVsQyxNQUFNLFdBQVcsR0FBRyxDQUFDLE9BQXVCLEVBQUUsVUFBVSxFQUFFLEVBQUU7SUFFMUQsTUFBTSxFQUFDLEtBQUssR0FBRyxTQUFTLEVBQUUsV0FBVyxHQUFFLFNBQVMsRUFBRSxPQUFPLEdBQUcsT0FBTyxFQUFDLE1BQU0sR0FBRyxFQUFFLEVBQUUsY0FBYyxHQUFHLEVBQUUsRUFBQyxHQUFHLE9BQU8sQ0FBQztJQUVoSCxNQUFNLFdBQVcsR0FBRyx5QkFBSSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBRXRFLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1NBQ2hCLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztTQUFFO1FBRTVGLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ2pDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQzdCLElBQUksR0FBRyxlQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYTtRQUMzQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTztZQUMzQixDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU87WUFDZixDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ1AsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLFdBQVc7WUFDbkMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXO1lBQ25CLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDWixNQUFNLFdBQVcsR0FBRztZQUNsQixHQUFHLEVBQUU7Z0JBQ0gsV0FBVyxFQUFFLFNBQVM7YUFDdkI7U0FDRixDQUFDO1FBQ0YsTUFBTSxTQUFTLEdBQVMsS0FBSyxDQUFDLFNBQVM7WUFDckMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTO1lBQ2pCLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDaEIsTUFBTSxFQUNKLEtBQUssR0FBRyxFQUFFLEVBQ1YsSUFBSSxFQUFFLFVBQVUsR0FBRyxFQUFFLEVBQ3JCLElBQUksR0FBRyxFQUFFLEVBQ1QsSUFBSSxFQUNKLFFBQVEsR0FBRyxFQUFFLEVBQ2IsUUFBUSxHQUNULEdBQUcsS0FBSyxDQUFDO1FBRVYsTUFBTSxVQUFVLEdBQUc7WUFDakIsR0FBRyxVQUFVO1lBQ2IsR0FBRyxLQUFLO1lBQ1IsR0FBRyxRQUFRO1lBQ1gsR0FBRyxJQUFJO1NBQ1IsQ0FBQztRQUVGLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQUU7UUFFL0QsZ0VBQWdFO1FBQ2hFLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQztZQUN6QixDQUFDLENBQUMsU0FBUyxDQUFDO1FBRWQsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRztZQUNoQyxRQUFRO1lBQ1IsT0FBTztZQUNQLFdBQVc7WUFDWCxVQUFVO1lBQ1YsU0FBUztZQUNULElBQUk7WUFDSixRQUFRO1NBQ1QsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2IsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQyxDQUFDO0FBRUYsa0JBQWUsV0FBVyxDQUFDIn0=