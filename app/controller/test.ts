import { Controller } from 'egg';
import { request, summary, query, path, body, tags } from '../../lib';

const testTag = tags(['test']);

const userSchema = {
  name: { type: 'string', required: true },
  gender: { type: 'string', required: false, example: 'male' },
  groups: {
    type: 'array',
    required: true,
    items: { type: 'string', example: 'group1' }
  }
};

export default class Test extends Controller{
  @request('get', '/users')
  @summary('get user list')
  @testTag
  @query({
    type: { type: 'number', required: true, default: 1, description: 'type' }
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
    const user = {user1: {id, name: 'xxx'}}
    this.ctx.body = { user };
  }

  @request('post', '/users')
  @testTag
  @body(userSchema)
  public async postUser() {
    const body = this.ctx.request.body;
    this.ctx.body = { result: body };
  }

  public async temp(ctx) {
    ctx.body = { result: 'success' };
  }
}