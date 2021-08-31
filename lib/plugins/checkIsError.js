'use strict';
const _ = require('lodash');
const config = require('../../config');

const register = {
  register: async (server, options) => {
    server.ext('onPostHandler', (request, h) => {
      if (request.response.source && request.response.source.isError) {
        return h
          .response(_.pick(request.response.source, ['code', 'message']))
          .code(request.response.source.httpCode || 400);
      } else {
        return h.continue;
      }
    });
  },
  name: 'checkIsError',
  version: '1.0.0',
};

module.exports = register;
