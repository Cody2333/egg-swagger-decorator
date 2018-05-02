import { Application } from 'egg';
import { wrapper, makeSwaggerRouter } from '../../../../../lib';
export default (app: Application) => {
  wrapper(app, {
    // // [optional] default is /swagger-html
    // swaggerHtmlEndpoint: '/sw',
    // // [optional] default is /swagger-json
    // swaggerJsonEndpoint: '/sj',
    // // [optional] default is false. if true, will call makeSwaggerRouter(app) automatically
    // makeswaggerRouter: false,

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
  makeSwaggerRouter(app);
};
