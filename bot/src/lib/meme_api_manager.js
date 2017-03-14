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
const MEMEGEN_BASE_URL = 'https://memegen.link';

export default class MemeApiManager {
  setLogger(logger) {
    this.logger = logger;
  }

  search(searchTerm) {
    this.logger.debug('MemeApiManager.search', { searchTerm });
    return rp({
      uri: `${MEMEGEN_API_BASE_URL}/search/${searchTerm}`,
      json: true,
    });
  }

  /**
  * transform whitespace into dashes
  */
  slugify(text) {
    const updatedText = encodeURIComponent(text
      .replace(/\s/g, '-')
      .replace(/"/g, '\'\'')
    );

    return updatedText.length > 0 ? updatedText : '_';
  }

  createUrl(rawTemplateName, rawTopText, rawBottomText) {
    const templateName = this.slugify(rawTemplateName.trim());
    const topText = this.slugify(rawTopText.trim());
    const bottomText = this.slugify(rawBottomText.trim());
    return `${MEMEGEN_BASE_URL}/${templateName}/${topText}/${bottomText}.jpg`;
  }

  createCustomUrl(imageUrl, rawTopText, rawBottomText) {
    const topText = this.slugify(rawTopText.trim());
    const bottomText = this.slugify(rawBottomText.trim());
    return `${MEMEGEN_BASE_URL}/custom/${topText}/${bottomText}.jpg?alt=${imageUrl}`;
  }
}
