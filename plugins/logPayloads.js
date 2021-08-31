const pino = require('pino')();

const register = {
  register: async (server, options) => {
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
          // FIXME:
          user: request.auth.credentials.epicAccountId, // request.auth.credentials.accountId, request.auth.credentials.email
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