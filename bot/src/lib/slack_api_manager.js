/**
* slack_api_manager
*
* Logic for message validation, formatting and sending for a slack client
*/

import rp from 'request-promise-native';
import InvalidSlackVerificationTokenException from './exceptions/invalid_slack_verification_token_exception';

// =============
// Constants
// =============
const RESPONSE_TYPE = 'response_type';

export default class SlackApiManager {
  setLogger(logger) {
    this.logger = logger;
  }

  setConfig(config) {
    this.config = config;
  }

  /**
  * checkValidVerificationToken
  *
  * Check that the verirification token in the request matches that in our config
  */
  checkValidVerificationToken(request) {
    if (this.config.verification_token !== request.body.token) {
      throw new InvalidSlackVerificationTokenException(request.body.token);
    }

    return true;
  }

  /**
  * getResponseUrl
  *
  * Pulls the responseUrl out of the request
  */
  getResponseUrl(request) {
    return request.body.response_url;
  }

  /**
  * getSlashCommandText
  *
  * Pulls the slach command text out of the request
  * This should be exclusive of the /memebot text itself
  */
  getSlashCommandText(request) {
    return request.body.text;
  }

  sendSlackMessage(webhookUrl, text, attachments = [], responseType) {
    const message = {
      text,
    };

    if (attachments.length > 0) {
      message.attachments = attachments;
    }

    if (responseType) {
      message[RESPONSE_TYPE] = responseType;
    }

    const options = {
      uri: webhookUrl,
      method: 'POST',
      body: message,
      json: true,
    };

    return rp(options);
  }

}
