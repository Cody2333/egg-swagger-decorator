declare const _default: (title: string, description: string, version: string, options?: {}) => {
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
export default _default;
