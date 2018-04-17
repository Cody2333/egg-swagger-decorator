import { Application } from 'egg';
import { WrapperOptions } from './swaggerJSON';
declare const wrapper: (app: Application, options?: WrapperOptions | undefined) => void;
export default wrapper;
