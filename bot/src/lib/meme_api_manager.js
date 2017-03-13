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
const MEMEGEN_BASE_URL = 'https://memegen.link/';

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

  createUrl(templateName, topText, bottomText) {
    return `${MEMEGEN_BASE_URL}/${templateName}/${topText}/${bottomText}.jpg`;
  }

  createCustomUrl(imageUrl, topText, bottomText) {
    return `${MEMEGEN_BASE_URL}/custom/${topText}/${bottomText}.jpg?alt=${imageUrl}`;
  }
}
