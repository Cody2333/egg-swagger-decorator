import { Controller } from 'egg';
import {request, tags, middlewares, query} from '../../lib';

const tag = tags(['Home']);

const HomeSchema = {
  what: { type: 'string', required: false },
};

const logTime = () => async (ctx, next) => {
  ctx.myLog = 'logTime';
  console.log(`start: ${new Date()}`);
  await next();
  console.log(`end: ${new Date()}`);
};

export default class HomeController extends Controller {
  @request('GET', '/')
  @middlewares([logTime()])
  @query(HomeSchema)
  @tag
  public async index() {
    const { ctx, service } = this;
    ctx.body = await service.test.sayHi('egg');
  }
}
