/**
 * build swagger json from apiObjects
 */
declare const swaggerJSON: (options: {} | undefined, apiObjects: any) => {
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
