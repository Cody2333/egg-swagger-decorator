import * as _ from 'lodash';
/**
 * used for building swagger docs object
 */
declare const apiObjects: {};
declare const request: (method: any, path: any) => (target: any, name: any, descriptor: any) => any;
declare const middlewares: (middlewares: any) => (target: any, name: any, descriptor: any) => any;
declare const responses: (responses?: {
    200: {
        description: string;
    };
}) => (target: any, name: any, descriptor: any) => any;
declare const desc: _.CurriedFunction2<any, any, (target: any, name: any, descriptor: any) => any>;
declare const description: _.CurriedFunction1<any, (target: any, name: any, descriptor: any) => any>;
declare const summary: _.CurriedFunction1<any, (target: any, name: any, descriptor: any) => any>;
declare const tags: _.CurriedFunction1<any, (target: any, name: any, descriptor: any) => any>;
declare const params: _.CurriedFunction2<any, any, (target: any, name: any, descriptor: any) => any>;
declare const query: _.CurriedFunction1<any, (target: any, name: any, descriptor: any) => any>;
declare const path: _.CurriedFunction1<any, (target: any, name: any, descriptor: any) => any>;
declare const body: _.CurriedFunction1<any, (target: any, name: any, descriptor: any) => any>;
declare const formData: _.CurriedFunction1<any, (target: any, name: any, descriptor: any) => any>;
export { request, summary, params, desc, description, query, path, body, tags, apiObjects, middlewares, formData, responses };
