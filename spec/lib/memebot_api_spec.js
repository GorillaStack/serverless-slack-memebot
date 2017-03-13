import MemebotApi from '../../bot/src/lib/memebot_api';
import stubLogger from '../support/stub_logger';

describe('MemebotApi', () => {
  let memebotApi;

  beforeAll(() => {
    memebotApi = new MemebotApi();
    memebotApi.setLogger(stubLogger);
  });

  describe('stripTypeFromCommandText', () => {
    it('returns type \'help\' when argument is an empty string', () =>
      expect(memebotApi.stripTypeFromCommandText()).toEqual({ type: 'help' }));
    it('returns type \'help\' when argument is \'help\'', () =>
      expect(memebotApi.stripTypeFromCommandText('help')).toEqual({ type: 'help' }));
    it('returns type \'list\' when argument is \'list\'', () =>
      expect(memebotApi.stripTypeFromCommandText('list')).toEqual({ type: 'list' }));
    it('returns type \'search\' with no \'rest\' when argument is \'search      \'', () =>
      expect(memebotApi.stripTypeFromCommandText('search      ')).toEqual({ type: 'search' }));
    it('returns type \'search\' with \'rest\' when argument is \'search  searchTerm\'', () =>
      expect(memebotApi.stripTypeFromCommandText('search  searchTerm')).toEqual({ type: 'search', rest: ' searchTerm' }));
  });
});
