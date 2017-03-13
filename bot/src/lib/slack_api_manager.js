/**
* slack_api_manager
*
* Logic for message validation, formatting and sending for a slack client
*/

import rp from 'request-promise-native';

// =============
// Constants
// =============
const MEMEGEN_API_BASE_URL = 'https://memegen.link/api';

export default class SlackApiManager {
  setLogger(logger) {
    this.logger = logger;
  }

  getTemplates() {
  }

  search(searchTerm) {
  }

  createMeme() {
  }
}
