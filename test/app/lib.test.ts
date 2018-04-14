'use strict';
import {app} from 'egg-mock/bootstrap';
import * as _path from 'path';
import * as assert from 'assert';
import {getPath, convertPath, readSync} from '../../lib/utils';
import validate from '../../lib/validate';

describe('test/app/lib.test.ts', () => {
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
    describe('ReadSync:', () => {
      it('should return an array,length = 2', () => {
        const dir = _path.resolve(__dirname, '../../app/controller');
        const r = readSync(dir);
        assert(r.length === 2)
      });
    });
    describe('Validate:', () => {
      it('should return validated input when meets expects requirement', () => {
        const input = {
          foo: '1',
          bar: 'fwq',
          fpk: false,
          qoa: [1,2],
          baz: {b: 'f'},
          addon: 'ttt',
        }
        const expect = {
          foo: {
            type: 'number',
            required: true
          },
          bar: {
            type: 'string',
            required: false,
          },
          baz: {
            type: 'object',
            required: true,
          },
          qoa: {
            type: 'array',
            required: true,
          },
          fpk: {
            type: 'boolean',
            required: true,
          },
          default: {
            type: 'string',
            required: false,
            default: 'ddd',
          },
          addon: undefined,
        }
        const validatedInput = validate(input, expect);
        assert(validatedInput.foo === 1)
        assert(validatedInput.default === 'ddd')
        assert(!validatedInput.addon)
      });
      it('should throw error when input does not meets expects requirement', () => {
        const input = {
        }
        const expect = {
          foo: {
            type: 'string',
            required: true,
          }
        }
        try {
          validate(input, expect);
        }
        catch (err) {
          assert(err.message === "incorrect field: 'foo', please check again!")
        }
      });
    });
  });
});
