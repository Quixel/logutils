'use strict';

const pino = require('pino')();
const _ = require('lodash');
const selectn = require('selectn');
const config = require('../../config');

const register = {
  register: async (server, options) => {
    server.ext('onPreResponse', (request, h) => {
      const response = request.response;
      if (response.isBoom) {
        const payload = _.transform(
          _.get(request, 'payload'),
          (result, value, key) => {
            _.isString(value) && _.size(value) > 1000 ? (result[key] = _.truncate(value, { length: 1000 })) : (result[key] = value);
          },
          {}
        );

        const info = _.extend(
          {},
          _.pick(request, ['params', 'route.path', 'route.method', 'auth.credentials.epicAccountId']),
          { payload },
          selectn('output.payload', response)
        );
        pino.info({
          info,
          internalError: true,
        });
      }
      return h.continue;
    });
  },
  name: 'logError',
  version: '1.0.0',
};

module.exports = register;
