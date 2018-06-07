/**
* memebot_slash_command
*
* Show just the user that called the slash command a list of available templates
*
* This file invokes logic from our dependency injection container and handles any
* interface with Lambda/API Gateway
*/

import 'babel-polyfill';
import qs from 'qs';
import getContainer from '../container';

// =============
// constants
// =============

const SUCCESS_RESPONSE = { statusCode: 200 };

const ERROR_RESPONSE = {
  statusCode: 500,
  body: JSON.stringify({
    message: 'Error invoking /memebot slash command',
  }),
};

const parseBody = body => {
  if (typeof body === 'string') {
    if (/^\{/.test(body)) {
      return JSON.parse(body);
    }
    return qs.parse(body);
  }
  return body;
};

export const handler = (request, context, callback) => {
  // Get our dependency injection container
  const container = getContainer();

  // Get an instance of the logger
  const logger = container.Logger;

  // Get our memebot api
  const memebotApi = container.MemebotApi;

  // Some debug level logging
  logger.debug('/memebot received request', request);


  memebotApi.interpretSlashCommand(Object.assign({}, request, { body: parseBody(request.body) }))
  .then(() => {
    // Success & validation errors/invlid commands
    logger.info('/memebot invocation successfully completed');
    callback(null, SUCCESS_RESPONSE);
  }).catch(err => {
    // Fatal errors
    logger.error('/memebot caught error', err);
    callback(err, ERROR_RESPONSE);
  });
};

export default handler;
