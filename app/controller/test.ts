import { Controller } from 'egg';
import { request, summary, query, path, body, tags } from '../../lib';

const testTag = tags(['test']);

const userSchema = {
  name: { type: 'string', required: true },
  gender: { type: 'string', required: false, example: 'male' },
};

export default class Test extends Controller{
  @request('get', '/users')
  @summary('get user list')
  @testTag
  @query({
    type: { type: 'string', required: false, default: 'a', description: 'type' }
  })
  public async getUsers() {
    const { ctx } = this;
    const users = [{user1: {name: 'xxx'}}]
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
  public async postUser() {
    const body = this.ctx.request.body;
    this.ctx.body = body;
  }
}