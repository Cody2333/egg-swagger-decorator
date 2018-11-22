/**
 * init swagger definitions
 * @param {String} title
 * @param {String} description
 * @param {String} version
 * @param {Object} options other options for swagger definition
 */

export default (
  title: string,
  description: string,
  version: string,
  options = {},
) => (Object.assign(
  {
    info: { title, description, version },
    paths: {},
    responses: {},
  },
  {
    definitions: {},
    tags: [],
    swagger: '2.0',
    securityDefinitions: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
      },
    },
  },
  options,

));
