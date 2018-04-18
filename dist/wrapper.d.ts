import { Application } from 'egg';
import { WrapperOptions } from './swaggerJSON';
declare module 'egg' {
    interface Application {
        createAnonymousContext(req?: any): Context;
        swaggerControllerClasses: {};
    }
    interface Context {
        validatedQuery?: {};
        validatedParams?: {};
        validatedBody?: {};
    }
}
declare const wrapper: (app: Application, options?: WrapperOptions | undefined) => void;
export default wrapper;
