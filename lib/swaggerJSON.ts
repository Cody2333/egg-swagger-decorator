import * as _ from 'lodash';
import init from './swaggerTemplate';
import { getPath } from './utils';
/**
 * build swagger json from apiObjects
 */
export interface WrapperOptions {
  title?: string;
  description?: string;
  version?: string;
  prefix?: string;
  swaggerOptions?: any;
  swaggerJsonEndpoint?: string;
  swaggerHtmlEndpoint?: string;
  makeSwaggerRouter?: boolean;
  [param: string]: any;
}

export interface Response {
  [name: number]: any;
}
const swaggerJSON = (options: WrapperOptions, apiObjects) => {

  const { title = 'API DOC', description = 'API DOC', version = '1.0.0', prefix = '', swaggerOptions = {} } = options;

  const resultJSON = init(title, description, version, swaggerOptions);

  _.chain(apiObjects)
    .forEach((value) => {
      if (!Object.keys(value).includes('request')) { throw new Error('missing [request] field'); }

      const { method } = value.request;
      let { path } = value.request;
      path = getPath(prefix, path); // 根据前缀补全path
      const summary = value.summary
        ? value.summary
        : '';
      const apiDescription = value.description
        ? value.description
        : summary;
      const defaultResp: Response = {
        200: {
          description: 'success',
        },
      };
      const responses: Response = value.responses
        ? value.responses
        : defaultResp;
      const {
        query = [],
        path: pathParams = [],
        body = [],
        tags,
        formData = [],
        security,
      } = value;

      const parameters = [
        ...pathParams,
        ...query,
        ...formData,
        ...body,
      ];

      // init path object first
      if (!resultJSON.paths[path]) { resultJSON.paths[path] = {}; }

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

export default swaggerJSON;
