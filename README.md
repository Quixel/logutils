# logutils
Reusable library for logging

## Usage

- **Add dependency in the package.json**
  "logutils": "https://github.com/Quixel/logutils#master"

- **How to use the logger?**
  const logger = require('logutils/logger').logger;
  logger.error(), logger.info() ....

- **How to use the logging plugins?**
  {
    plugin: require('logutils/plugins/checkIsError'),
  },
  {
    plugin: require('logutils/plugins/logError'),
  },
  {
    plugin: require('logutils/plugins/logPayloads'),
  }  
