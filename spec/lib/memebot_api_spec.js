import sinon from 'sinon';
import MemebotApi from '../../bot/src/lib/memebot_api';
import stubLogger from '../support/stub_logger';

const stubSlackApiManager = {
  sendSlackMessage: () => ({ then: (success, fail) => success() }),
  checkValidVerificationToken: () => true,
  getResponseUrl: () => 'https://fake.com',
  getSlashCommandText: request => request.body.text,
};

const stubMemeApiManager = {
  search: () => ({
    then: (success, fail) => success([{
      template: {
        blank: 'memegen.link/slug/blah.jpg',
        example: 'memegen.link/slug/blah.jpg',
        name: 'Meme Name',
        description: 'Meme description',
      },
    }])
  }),
  createUrl: () => 'fake.com/aldkfh',
  createCustomUrl: () => 'fake.com/aldkfh',
};

describe('MemebotApi', () => {
  let memebotApi;

  beforeAll(() => {
    memebotApi = new MemebotApi();
    memebotApi.setLogger(stubLogger);
    memebotApi.setSlackApiManager(stubSlackApiManager);
    memebotApi.setMemeApiManager(stubMemeApiManager);
  });

  describe('interpretSlashCommand', () => {
    let searchSpy;
    let createUrlSpy;
    let createCustomUrlSpy;
    let sendSlackMessageSpy;

    beforeAll(() => {
      searchSpy = sinon.spy(stubMemeApiManager, 'search');
      createUrlSpy = sinon.spy(stubMemeApiManager, 'createUrl');
      createCustomUrlSpy = sinon.spy(stubMemeApiManager, 'createCustomUrl');
      sendSlackMessageSpy = sinon.spy(stubSlackApiManager, 'sendSlackMessage');
    });

    beforeEach(() => {
      searchSpy.reset();
      createUrlSpy.reset();
      createCustomUrlSpy.reset();
      sendSlackMessageSpy.reset();
    });

    describe('where no text', () => {
      it('should return the help text', () => {
        memebotApi.interpretSlashCommand({ body: { text: '' } }).then(
          () => {
            expect(sendSlackMessageSpy.called).toEqual(true);
            done();
          }, fail);
      });
    });

    describe('where text is "list"', () => {
      it('should invoke search', done => {
        memebotApi.interpretSlashCommand({ body: { text: 'list' } }).then(
          () => {
            expect(searchSpy.called).toEqual(true);
            expect(sendSlackMessageSpy.called).toEqual(true);
            done();
          }, fail);
      });
    });

    describe('where text is "search yuno"', () => {
      it('should invoke search', done => {
        memebotApi.interpretSlashCommand({ body: { text: 'search yuno' } }).then(
          () => {
            expect(searchSpy.called).toEqual(true);
            expect(sendSlackMessageSpy.called).toEqual(true);
            done();
          }, fail);
      });
    });

    describe('where text is "create yuno; top; bottom;"', () => {
      it('should invoke search', done => {
        memebotApi.interpretSlashCommand({ body: { text: 'create yuno; top; bottom;' } }).then(
          () => {
            expect(createUrlSpy.called).toEqual(true);
            expect(sendSlackMessageSpy.called).toEqual(true);
            done();
          }, fail);
      });
    });

    describe('where text is "create https://custom.image.com/something.jpg; top; bottom;"', () => {
      it('should invoke search', done => {
        memebotApi.interpretSlashCommand({ body: { text: 'create https://custom.image.com/something.jpg; top; bottom;' } }).then(
          () => {
            expect(createCustomUrlSpy.called).toEqual(true);
            expect(sendSlackMessageSpy.called).toEqual(true);
            done();
          }, fail);
      });
    });
  });

  describe('stripTypeFromCommandText', () => {
    it('should return type \'help\' when argument is an empty string', () =>
      expect(memebotApi.stripTypeFromCommandText()).toEqual({ type: 'help' }));
    it('should return type \'help\' when argument is \'help\'', () =>
      expect(memebotApi.stripTypeFromCommandText('help')).toEqual({ type: 'help' }));
    it('should return type \'list\' when argument is \'list\'', () =>
      expect(memebotApi.stripTypeFromCommandText('list')).toEqual({ type: 'list' }));
    it('should return type \'search\' with no \'rest\' when argument is \'search      \'', () =>
      expect(memebotApi.stripTypeFromCommandText('search      ')).toEqual({ type: 'search' }));
    it('should return type \'search\' with \'rest\' when argument is \'search  searchTerm\'', () =>
      expect(memebotApi.stripTypeFromCommandText('search  searchTerm'))
        .toEqual({ type: 'search', rest: ' searchTerm' }));
  });
});
