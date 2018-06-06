import { Controller, Context } from 'egg';
import { request, tags, middlewares, responses } from '../../../../../../lib';

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
  @responses({
    200: {
      description: 'success',
      schema: {
        type: 'object',
        properties: {
          msg: { type: 'string', example: 'here is a msg' },
        }
      }
    }
  })
  public async index() {
    const { ctx, service } = this;
    ctx.body = await service.test.sayHi('egg');
  }

  public async notused() {
    const { ctx, service } = this;
    ctx.body = await service.test.sayHi('egg');
  }
}
