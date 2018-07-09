/**
* memebot_api
*
* Higher level logic to handle slash commands
*/

import co from 'co';

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

  sendHelpMessage(argumentString, responseUrl) {
    return this.slackApiManager.sendSlackMessage(responseUrl, '', [
      {
        fallback: 'memebot help',
        color: '#33495e',
        pretext: '*Memebot commands*',
        mrkdwn_in: ['fields', 'pretext'],
        fields: [
          {
            title: '/memebot help',
            value: 'show this help',
            short: false,
          },
          {
            title: '/memebot list',
            value: 'get a list of meme templates\n```/memebot list\n```',
            short: false,
          },
          {
            title: '/memebot search searchTerm',
            value: 'search for a specific meme template\n```'
                    + '/memebot search yuno\n'
                    + '/memebot search milk\n'
                    + '/memebot search oprah\n```',
            short: false,
          },
          {
            title: '/memebot create memeTemplate; topText; bottomText;',
            value: 'create a meme from an existing template\n```/memebot create iw; tests code; in production;\n'
                      + '/memebot create sohot; slackbots are; so hot right now;\n'
                      + '/memebot create oprah; you get a repository; and you get a repository;```',
            short: false,
          },
          {
            title: '/memebot create URL; topText; bottomText;',
            value: 'create a custom meme from an image url\n```'
                      + '/memebot create https://pbs.twimg.com/profile_images/729487390956359680/PKHvdbXb.jpg; '
                      + 'squint; like you mean it;```',
            short: false,
          },
        ],
        footer: ':memo: This is a sample respository to demo a serverless slackbot'
          + ' project, created by the awesome team at GorillaStack',
      },
    ]);
  }

  searchSlashCommand(argumentString = '', responseUrl) {
    const _this = this;
    return co(function* searchGenerator() {
      const records = yield _this.memeApiManager.search(argumentString);
      if (records.length === 0) {
        yield _this.slackApiManager.sendSlackMessage(responseUrl, 'No memes found');
        return;
      }
      let message = '```';
      for (const record of records) {
        const slug = record.template.blank.match(/memegen.link\/([^\/]+)/)[1];
        message += `<${record.template.example} | ${slug}> - `
          + `"${record.template.name}" - ${record.template.description}\n`;
      }

      message += '```';
      yield _this.slackApiManager.sendSlackMessage(responseUrl, message);
    });
  }

  createSlashCommand(argumentString, responseUrl) {
    const [template, topText, bottomText] = argumentString.split(';');
    let memeUrl;
    if (/^http/.test(template)) {
      // We have a custom meme image
      memeUrl = this.memeApiManager.createCustomUrl(template, topText, bottomText);
    } else {
      // We have an existing meme template
      memeUrl = this.memeApiManager.createUrl(template, topText, bottomText);
    }

    this.logger.debug('memeUrl', memeUrl);
    return this.slackApiManager.sendSlackMessage(responseUrl, '',
      [{ image_url: memeUrl, fallback: argumentString }], 'in_channel');
  }

  /**
  * stripTypeFromCommandText
  *
  * if > 2 words, strip the first word from the rest
  * @param {String} text - the slack command text (less /memebot)
  * @return { type: String, rest: String }
  */
  stripTypeFromCommandText(slashCommandText = '') {
    const trimmedSlashCommandText = slashCommandText.trim();
    const parts = slashCommandText.length === 0 ? [] : trimmedSlashCommandText.split(' ');
    if (trimmedSlashCommandText.length === 0) {
      parts.push('help');
    }

    const result = { type: parts.shift() };
    if (parts.length > 0) {
      result.rest = parts.join(' ');
    }

    return result;
  }

  /**
  * interpretSlashCommand
  *
  * The method responsible for:
  *   - slack request verification against token
  *   - slash command format validation
  *   - delegation to other methods based on command syntax
  *
  * @param {Object} - request - request
  * @return {Promise}
  */
  interpretSlashCommand(request) {
    const _this = this;
    return co(function* interpretGenerator() {
      _this.slackApiManager.checkValidVerificationToken(request);
      const responseUrl = _this.slackApiManager.getResponseUrl(request);
      const slashCommandText = _this.slackApiManager.getSlashCommandText(request);
      const { type, rest } = _this.stripTypeFromCommandText(slashCommandText);

      if (/^list/i.test(type)) {
        yield _this.searchSlashCommand('', responseUrl);
      } else if (/^search/i.test(type)) {
        yield _this.searchSlashCommand(rest, responseUrl);
      } else if (/^create/i.test(type)) {
        yield _this.createSlashCommand(rest, responseUrl);
      } else {
        yield _this.sendHelpMessage(rest, responseUrl);
      }
    });
  }

}
