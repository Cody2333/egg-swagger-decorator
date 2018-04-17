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
    [param: string]: any;
}
declare const swaggerJSON: (options: WrapperOptions, apiObjects: any) => {
    info: {
        title: string;
        description: string;
        version: string;
    };
    paths: {};
    responses: {};
} & {
    definitions: {};
    tags: never[];
    swagger: string;
    securityDefinitions: {
        ApiKeyAuth: {
            type: string;
            in: string;
            name: string;
        };
    };
};
export default swaggerJSON;
