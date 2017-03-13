/**
* logger.js
*
* Export a getter function to instantiate our logger for the given settings
*/

import winston from 'winston';

export const getLogger = loggerConfig =>
  new (winston.Logger)({
    transports: [
      new winston.transports.Console({
        level: loggerConfig.log_level,
        json: loggerConfig.json,
        handleExceptions: true,
        humanReadableUnhandledException: true,
      }),
    ],
  });

export default getLogger;
