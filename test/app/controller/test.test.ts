'use strict';

import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/test.test.ts', () => {
  it('should GET /users', async () => {
    await app.httpRequest().get('/users').expect(200);
  });
  it('should GET /users/{id}', async () => {
    await app.httpRequest().get('/users/10')
    .expect(200).expect({user: {id: 10}});
  });
  it('should POST /users', async () => {
    app.mockCsrf();
    await app
    .httpRequest()
    .post('/users')
    .type('json')
    .send({name: 'xxx'})
    .expect(200)
    .expect({name: 'xxx'})
  });
});
