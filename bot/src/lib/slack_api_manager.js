/**
* slack_api_manager
*
* Logic for message validation, formatting and sending for a slack client
*/

import rp from 'request-promise-native';

// =============
// Constants
// =============
const RESPONSE_TYPE = 'response_type';

export default class SlackApiManager {
  setLogger(logger) {
    this.logger = logger;
  }

  /**
  * checkValidVerificationToken
  *
  * Check that the verirification token in the request matches that in our config
  */
  checkValidVerificationToken(request) {

  }


  /**
  * getResponseUrl
  *
  * Pulls the responseUrl out of the request
  */
  getResponseUrl(request) {
    
  }

  /**
  * getSlashCommandText
  *
  * Pulls the slach command text out of the request
  * This should be exclusive of the /memebot text itself
  */
  getSlashCommandText(request) {

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

    return rp(options).promise();
  }

}
