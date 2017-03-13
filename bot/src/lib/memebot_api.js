/**
* memebot_api
*
* Higher level logic to handle slash commands
*/

import rp from 'request-promise-native';

// =============
// Constants
// =============

export default class MemebotApi {
  setLogger(logger) {
    this.logger = logger;
  }

  setSlackApiManager(slackApiManager) {
    this.slackApiManager = slackApiManager;
  }

  setMemeApiManager(memeApiManager) {
    this.memeApiManager = memeApiManager;
  }

  /**
  * interpretSlashCommand
  *
  * The method responsible for:
  *   - slack request verification against token
  *   - slash command format validation
  *   - delegation to other methods based on command syntax
  *
  * @param {Object} - Body - request body
  * @return {Promise}
  */
  interpretSlashCommand(body) {
  }

  listSlashCommand() {
  }

  searchSlashCommand() {
  }

  createSlashCommand() {
  }
}
