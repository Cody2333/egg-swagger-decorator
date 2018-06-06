import { Controller, Context } from 'egg';
import { request, summary, query, path, body, tags, responses, middlewares, description } from '../../../../../../lib';

const testTag = tags(['test']);

const userSchema = {
  name: { type: 'string', required: true },
  gender: { type: 'string', required: false, example: 'male' },
};

const resp = {
  200: {
    description: 'custom success'
  },
  400: {
    decription: 'custom error'
  }
}

export default class Test extends Controller {
  @request('get', '/users')
  @description('get user list')
  @testTag
  @middlewares(async (ctx: Context, next) => { ctx.logger.info('mid'); await next() })
  @query({
    type: { type: 'string', required: false, default: 'a', description: 'type' }
  })
  public async getUsers() {
    const { ctx } = this;
    const users = [{ user1: { name: 'xxx' } }]
    ctx.body = { users };
  }

  @request('get', '/users/{id}')
  @summary('get user info by id')
  @testTag
  @path({
    id: { type: 'number', required: true, default: 1, description: 'id' }
  })
  public async getUser() {
    const { id } = this.ctx.params;
    const result = { user: { id } }
    this.ctx.body = result;
  }

  @request('post', '/users')
  @testTag
  @body(userSchema)
  @responses(resp)
  public async postUser() {
    const body = this.ctx.request.body;
    this.ctx.body = body;
  }

  @request('get', '/enum')
  @testTag
  @query({
    role: { type: 'string', enum: ['1', '2', '3'], required: true }
  })
  @responses(resp)
  public async testEnum() {
    const { ctx } = this;
    console.log(ctx.query);
    ctx.body = { msg: 'enum passed' };
  }
}