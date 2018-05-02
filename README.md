# egg-swagger-decorator [npm-url]
> using decorator to auto generate swagger json docs

## Installation


```bash
npm install egg-swagger-decorator
```

## Introduction

### egg Swagger Decorator

using decorator to auto generate swagger json docs

based on [Swagger OpenAPI Specification 2.0](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md)

## Example

```
// using commonds below to start and test the example server

git clone https://github.com/Cody2333/egg-swagger-decorator.git

cd egg-swagger-decorator

npm install

npm run dev

finally open:
http://localhost:7001/swagger-html

```

### Requirements

- egg
- typescript > 2.8

### Introduction

```
// router.js
import { Application } from 'egg';
import { wrapper } from '../lib';
export default (app: Application) => {
  wrapper(app, {
    // // [optional] default is /swagger-html
    // swaggerHtmlEndpoint: '/sw',
    // // [optional] default is /swagger-json
    // swaggerJsonEndpoint: '/sj',
    // // [optional] default is false. if true, will call makeSwaggerRouter(app) automatically
    // makeswaggerRouter: false,

    title: 'foo',
    version: 'v1.0.0',
    description: 'bar',

  });
  makeSwaggerRouter(app);
};

```

#### using decorator to make api definition

```
// controller/test.ts

import { Controller } from 'egg';
import { request, summary, query, path, body, tags } from 'egg-swagger-decorator';

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

```

#### avaliable annotations:

- tags         
- query
- path
- body
- formData
- middlewares
- summary
- description
- responses

```

request      // @request('POST', '/users')

tags         // @tags(['example'])

query        // @query({limit: {type: 'number', required: true, default: 10, description: 'desc'}})

path         // @path({limit: {type: 'number', required: true, default: 10, description: 'desc'}})

body         // @body({groups: {type: 'array', required: true, items: { type: 'string', example: 'group1' }}})

formData     // @formData({file: {type: 'file', required: true, description: 'file content'}})

middlewares  
// support koa middlewares. 
// eg. @middlewares([func1,func2])

summary      // @summary('api summary')

description  // @description('api description')

responses 
// @responses({ 200: { description: 'success'}, 400: { description: 'error'}})
// responses is optional
```



##### runing the project and it will generate docs through swagger ui

![image.png](http://upload-images.jianshu.io/upload_images/2563527-4b6ed895183a0055.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## License

 © MIT


[npm-url]: https://npmjs.org/package/egg-swagger-decorator
