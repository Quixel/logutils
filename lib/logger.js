const pino = require('pino');
const pinoPretty = require('pino-pretty');
const logger = pino({
  prettyPrint: {
    levelFirst: true,
  },
  prettifier: pinoPretty,
});

module.exports = {
    logger,
}