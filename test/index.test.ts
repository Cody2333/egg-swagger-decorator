'use strict';
import {mock} from 'egg-mock/bootstrap';
import * as assert from 'assert';
import {getPath, convertPath, loadSwaggerClassesToContext} from '../lib/utils';
import validate from '../lib/validate';
import {Context} from 'egg';

describe('test/app/lib.test.ts', () => {

  describe('Api Test:', () => {

    let app;
    before(() => {
      app = mock.app({baseDir: 'apps/swagger-decorator-test'});
      return app.ready();
    });

    after(() => app.close());
    afterEach(mock.restore);

    describe('Load swagger classes to app', () => {
      it('should inject app/controller classes to app.swaggerControllerClasses', async () => {
        loadSwaggerClassesToContext(app);
        assert(typeof app.swaggerControllerClasses === 'object')
      })
    })

    describe('Swagger Doc Api:', () => {
      it('GET /api/swagger-html should return success for swagger ui page', async() => {
        await app
          .httpRequest()
          .get('/swagger-html')
          .expect(200)
      });
      it('GET /api/swagger-json should return success for swagger json data', async() => {
        await app
          .httpRequest()
          .get('/swagger-json')
          .expect(200)
      });
    });

    describe('Controller Test:', () => {

      it('should GET /', async() => {
        const result = await app
          .httpRequest()
          .get('/')
          .expect(200);
        assert(result.text === 'hi, egg');
      });

      it('should GET /users', async() => {
        await app
          .httpRequest()
          .get('/users')
          .expect(200);
      });
      it('should GET /users/{id}', async() => {
        await app
          .httpRequest()
          .get('/users/10')
          .expect(200)
          .expect({
            user: {
              id: 10
            }
          });
      });
      it('should POST /users', async() => {
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

    describe('Service Test:', () => {
      let ctx : Context;
      before(async() => {
        ctx = app.mockContext();
      });
      it('sayHi', async() => {
        const result = await ctx
          .service
          .test
          .sayHi('egg');
        assert(result === 'hi, egg');
      });
    });
  });

  describe('Function Test:', () => {
    describe('ConvertPath:', () => {
      it('should convert /api/{p1}/user/{p2} -> /api/:p1/user/:p2', () => {
        const r = convertPath('/api/{p1}/user/{p2}');
        assert(r === '/api/:p1/user/:p2');
      });
    });

    describe('GetPath:', () => {
      it('should convert /api + /user -> /api/user', () => {
        const r = getPath('/api', '/user');
        assert(r === '/api/user');
      });
    });
    describe('Validate:', () => {
      it('should return validated input when meets expects requirement', () => {
        const input = {
          foo: '1',
          bar: 'fwq',
          fpk: false,
          nax: 12,
          qoa: [
            1, 2
          ],
          baz: {
            b: 'f'
          },
          addon: 'ttt',
          boo: 'true',
          coo: 'false',
          sst: {
            what: 'a'
          }
        }
        const expect = {
          nax: {type: 'number'},
          foo: {
            type: 'number',
            required: true
          },
          bar: {
            type: 'string',
            required: false
          },
          baz: {
            type: 'object',
            required: true
          },
          qoa: {
            type: 'array',
            required: true
          },
          fpk: {
            type: 'boolean',
            required: true
          },
          boo: {
            type: 'boolean',
          },
          coo: {
            type: 'boolean',
          },
          default: {
            type: 'string',
            required: false,
            default: 'ddd'
          },
          sst: {
            type: 'string',
          },
          addon: undefined
        }
        const validatedInput = validate(input, expect);
        assert(validatedInput.foo === 1)
        assert(validatedInput.default === 'ddd')
        assert(!validatedInput.addon)
        assert(validatedInput.boo === true)
        assert(validatedInput.coo === false)
        assert(typeof validatedInput.sst === 'string')
      });
      it('should throw error when no required input', () => {
        const input = {}
        const expect = {
          foo: {
            type: 'string',
            required: true
          }
        }
        try {
          validate(input, expect);
          throw new Error();
        } catch (err) {
          assert(err.message === "incorrect field: 'foo', please check again!")
        }
      });
      it('should throw error when not a number while type=number', () => {
        const input = {foo: 'r'}
        const expect = {foo: {type: 'number'}}
        try {
          validate(input, expect);
          throw new Error();
        } catch (err) {
          assert(err.message === "incorrect field: 'foo', please check again!")
        }
      });
      it('should throw error when not a boolean while type=boolean', () => {
        const input = {foo: 'r'}
        const expect = {foo: {type: 'boolean'}}
        try {
          validate(input, expect);
          throw new Error();
        } catch (err) {
          assert(err.message === "incorrect field: 'foo', please check again!")
        }
      });
      it('should throw error when not a number while type=object', () => {
        const input = {foo: 'r'}
        const expect = {foo: {type: 'object'}}
        try {
          validate(input, expect);
          throw new Error();
        } catch (err) {
          assert(err.message === "incorrect field: 'foo', please check again!")
        }
      });
      it('should throw error when not a number while type=array', () => {
        const input = {foo: 'r'}
        const expect = {foo: {type: 'array'}}
        try {
          validate(input, expect);
          throw new Error();
        } catch (err) {
          assert(err.message === "incorrect field: 'foo', please check again!")
        }
      });
      
      it('should throw error when enum not a array', () => {
        const input = { foo: '1' };
        const expect = {
          foo: { type: 'string', enum: 'enum is a string' }
        };
        try {
          validate(input, expect);
        } catch (err) {
          assert(err.message === "incorrect field: 'foo', please check again!")
        }
      })

      it('should throw error when enum is an empty array', () => {
        const input = { foo: '1' };
        const expect = {
          foo: { type: 'string', enum: [] }
        };
        try {
          validate(input, expect);
        } catch (err) {
          assert(err.message === "incorrect field: 'foo', please check again!")
        }
      })


      it('should throw error when enum doesnt includes input an empty array', () => {
        const input = { foo: '1' };
        const expect = {
          foo: { type: 'string', enum: ['2', '3'] }
        };
        try {
          validate(input, expect);
        } catch (err) {
          assert(err.message === "incorrect field: 'foo', please check again!")
        }
      })
    });
  });
});
