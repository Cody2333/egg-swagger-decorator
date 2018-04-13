import { Application } from 'egg';
import { wrapper } from '../lib';
export default (app: Application) => {
  wrapper(app, {
    title: 'Example Server',
    description: 'API DOC',
    version: '1.0.0',

    // [optional] default is /swagger-html
    swaggerHtmlEndpoint: '/swagger-html',
  
    // [optional] default is /swagger-json
    swaggerJsonEndpoint: '/swagger-json',

  });
};
