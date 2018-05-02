import * as _ from 'lodash';
import init from './swaggerTemplate';
import { getPath } from './utils';
/**
 * build swagger json from apiObjects
 */
export interface WrapperOptions {
  title?: string,
  description?: string,
  version?: string,
  prefix?: string,
  swaggerOptions?: any,
  swaggerJsonEndpoint?: string,
  swaggerHtmlEndpoint?: string,
  makeSwaggerRouter?: boolean,
  [param: string]: any,
}
const swaggerJSON = (options: WrapperOptions, apiObjects) => {
  
  const {title = 'API DOC', description ='API DOC', version = '1.0.0',prefix = '', swaggerOptions = {}} = options;

  const swaggerJSON = init(title, description, version, swaggerOptions);

  _.chain(apiObjects)
    .forEach((value) => {
      if (!Object.keys(value).includes('request')) { throw new Error('missing [request] field'); }

      const { method } = value.request;
      let { path } = value.request;
      path = getPath(prefix, path); // 根据前缀补全path
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
      const responses : any = value.responses
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
      if (!swaggerJSON.paths[path]) { swaggerJSON.paths[path] = {}; }

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

export default swaggerJSON;
