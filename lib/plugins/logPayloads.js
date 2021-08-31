const pino = require('pino')();
const _ = require('lodash');

const register = {
  register: async (server, options) => {
    const user = _.extend(
      {},
      _.pick(request, ['request.auth.credentials.epicAccountId']),
      { payload },
      selectn('output.payload', response)
    );
    server.ext('onPreHandler', (request, h) => {
      if (
        request.auth.isAuthenticated &&
        request.method !== 'get' &&
        request.auth.credentials.scope.length &&
        request.auth.credentials.scope.length > 2
      ) {
        pino.info({
          type: 'endpoint',
          path: request.path,
          user:  user,
          payload: request.payload,
        });
      }
      return h.continue;
    });
  },
  name: 'logPayloads',
  version: '1.0.0',
};

module.exports = register;
