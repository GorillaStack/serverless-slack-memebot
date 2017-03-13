/**
* memebot_api
*
* Higher level logic to handle slash commands
*/

import co from 'co';
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


  sendHelpMessage(rest, responseUrl) {
    return this.slackApiManager.sendSlackMessage(resoponseUrl, '', [
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

        ],
        footer: ':memo: This is a sample respository to demo a serverless slackbot'
          + ' project, created by the awesome team at GorillaStack',
      },
    ]);
  }

  listSlashCommand() {
  }

  searchSlashCommand() {
  }

  createSlashCommand() {
  }
  /**
  * stripTypeFromCommandText
  *
  * if > 2 words, strip the first word from the rest
  * @param {String} text - the slack command text (less /memebot)
  * @return { type: String, rest: String }
  */
  stripTypeFromCommandText(slashCommandText) {
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
    return co(function* () {
      _this.slackApiManager.checkValidVerificationToken(request);
      const responseUrl = _this.slackApiManager.getResponseUrl(request);
      const slashCommandText = _this.slackApiManager.getSlashCommandText(request);
      const { type, rest } = _this.stripTypeFromCommandText(slashCommandText);

      if (/^list\s/i.test(slashCommandText)) {
        yield _this.listSlashCommand(rest, responseUrl);
      } else if (/^search\s/i.test(slashCommandText)) {
        yield _this.searchSlashCommand(rest, responseUrl);
      } else if (/^create\s/i.test(slashCommandText)) {
        yield _this.createSlashCommand(rest, responseUrl);
      } else {
        yield _this.sendHelpMessage(rest, responseUrl);
      }
    });
  }

}
