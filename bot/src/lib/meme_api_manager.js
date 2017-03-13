/**
* meme_api_manager
*
* Interface with the memegen.link api to generate our memes
*/

import rp from 'request-promise-native';

// =============
// Constants
// =============
const MEMEGEN_API_BASE_URL = 'https://memegen.link/api';

export default class MemeApiManager {
  setLogger(logger) {
    this.logger = logger;
  }

  getTemplates() {
    this.logger.debug('MemeApiManager.getTemplates');
    return rp({
      uri: `${MEMEGEN_API_BASE_URL}/templates`,
      json: true,
    });
  }

  search(searchTerm) {
    this.logger.debug('MemeApiManager.search', { searchTerm });
    return rp({
      uri: `${MEMEGEN_API_BASE_URL}/search/${searchTerm}`,
      json: true,
    });
  }

  createMeme() {

  }
}
