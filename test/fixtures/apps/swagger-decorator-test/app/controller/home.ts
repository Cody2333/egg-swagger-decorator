import { Controller, Context } from 'egg';
import {request, tags, middlewares} from '../../../../../../lib';

const tag = tags(['Home']);

const logTime = () => async (ctx: Context, next) => {
  ctx.logger.info(`start: ${new Date()}`);
  await next();
  ctx.logger.info(`end: ${new Date()}`);
};

export default class HomeController extends Controller {
  @request('GET', '/')
  @middlewares([logTime()])
  @tag
  public async index() {
    const { ctx, service } = this;
    ctx.body = await service.test.sayHi('egg');
  }

  public async notused() {
    const { ctx, service } = this;
    ctx.body = await service.test.sayHi('egg');
  }
}
