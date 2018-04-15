import { Application } from 'egg';
import { wrapper } from '../../../../../lib';
export default (app: Application) => {
  wrapper(app, {
    // // [optional] default is /swagger-html
    // swaggerHtmlEndpoint: '/swagger-html',
  
    // // [optional] default is /swagger-json
    // swaggerJsonEndpoint: '/swagger-json',
  });
};
