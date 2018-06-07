import nock from 'nock';
import SlackApiManager from '../../bot/src/lib/slack_api_manager';
import InvalidSlackVerificationTokenException from
  '../../bot/src/lib/exceptions/invalid_slack_verification_token_exception';
import stubLogger from '../support/stub_logger';

const FAKE_TOKEN = 'L0L70k3n';
describe('SlackApiManager', () => {
  let slackApiManager;
  const fakeAttachments = [{}, {}];

  beforeAll(() => {
    slackApiManager = new SlackApiManager();
    slackApiManager.setLogger(stubLogger);
    slackApiManager.setConfig({ verification_token: FAKE_TOKEN });
  });

  describe('checkValidVerificationToken', () => {
    it('should throw an InvalidSlackVerificationTokenException where the token does not match', () => {
      try {
        slackApiManager.checkValidVerificationToken({ body: { token: 'notAliceOrBob' } });
        fail('Should have thrown an exception');
      } catch (err) {
        expect(err instanceof InvalidSlackVerificationTokenException);
      }
    });

    it('should return true where the tokens match', () => {
      const result = slackApiManager.checkValidVerificationToken({ body: { token: FAKE_TOKEN } });
      expect(result).toEqual(true);
    });
  });

  describe('getResponseUrl', () => {
    const fakeUrl = 'http://fake.com';
    it('should get the response_url from the body of the request', () =>
      expect(slackApiManager.getResponseUrl({ body: { response_url: fakeUrl } }))
        .toEqual(fakeUrl));
  });

  describe('getSlashCommandText', () => {
    const fakeText = 'iw topText bottomText';
    it('should get the text from the body of the request', () =>
      expect(slackApiManager.getSlashCommandText({ body: { text: fakeText } }))
        .toEqual(fakeText));
  });

  describe('sendSlackMessage', () => {
    const fakeUrl = 'https://fake.com';
    const replyFunction = (uri, requestBody) => requestBody;

    beforeEach(() => {
      nock(fakeUrl)
        .post('/something')
        .reply(200, replyFunction);
    });

    it('should just add message text to the payload if nothing else specified', done => {
      const fakeMessage = 'fake message';

      slackApiManager.sendSlackMessage(`${fakeUrl}/something`, fakeMessage).then(
        result => {
          expect(result).toEqual({ text: fakeMessage });
          done();
        },

        fail
      );
    });

    it('should add attachments to the payload if specified', done => {
      const fakeMessage = 'fake message';

      slackApiManager.sendSlackMessage(`${fakeUrl}/something`, fakeMessage, fakeAttachments).then(
        result => {
          expect(result).toEqual({ text: fakeMessage, attachments: fakeAttachments });
          done();
        },

        fail
      );
    });

    it('should add response_type if specified', done => {
      const fakeMessage = 'fake message';
      const responseType = 'in_channel';

      slackApiManager.sendSlackMessage(`${fakeUrl}/something`, fakeMessage, fakeAttachments, responseType).then(
        result => {
          expect(result).toEqual({ text: fakeMessage, attachments: fakeAttachments, response_type: responseType });
          done();
        },

        fail
      );
    });
  });
});
