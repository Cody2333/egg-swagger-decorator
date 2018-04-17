import { Application } from 'egg';
import { wrapper } from '../../../../../lib';
export default (app: Application) => {  
  wrapper(app, {
    // // [optional] default is /swagger-html
    // swaggerHtmlEndpoint: '/sw',
    // // [optional] default is /swagger-json
    // swaggerJsonEndpoint: '/sj',

    // title: 'foo',
    // version: 'v1.0.0',
    // description: 'bar',

    // swaggerOptions: {
    //   // [optional] used for swagger options
    //   securityDefinitions: {
    //     ApiKeyAuth: {
    //       type: 'apiKey',
    //       in: 'header',
    //       name: 'AAA'
    //     }
    //   },
    // }
  });
};
