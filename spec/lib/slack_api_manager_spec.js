import SlackApiManager from '../../bot/src/lib/slack_api_manager';
import stubLogger from '../support/stub_logger';

describe('SlackApiManager', () => {
  let slackApiManager;

  beforeAll(() => {
    slackApiManager = new SlackApiManager();
    slackApiManager.setLogger(stubLogger);
  });

  describe('checkValidVerificationToken', () => {
  });

  describe('getResponseUrl', () => {
  });

  describe('getSlashCommandText', () => {
  });
});
