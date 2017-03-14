import MemeApiManager from '../../bot/src/lib/meme_api_manager';
import stubLogger from '../support/stub_logger';

describe('MemeApiManager', () => {
  let memeApiManager;

  beforeAll(() => {
    memeApiManager = new MemeApiManager();
    memeApiManager.setLogger(stubLogger);
  });

  describe('search', () => {

  });

  describe('createUrl', () => {
    it('should create a url for a given template slug, topText and bottomText', () =>
      expect(memeApiManager.createUrl('iw', 'tests code', 'in production'))
        .toEqual('https://memegen.link/iw/tests-code/in-production.jpg'));

    it('should create a url for a given template slug, topText and bottomText '
        + 'with starting and trailing space', () =>
      expect(memeApiManager.createUrl('   iw ', ' tests code   ', '   in production'))
        .toEqual('https://memegen.link/iw/tests-code/in-production.jpg'));

    // more complex example with inverta commas and quotes
    it('should create a url for a given template slug, topText and bottomText '
        + 'where we have different quotes in the text', () =>
      expect(memeApiManager.createUrl('oag', 'saw you talking to "slackbot"', 'what\'s her name'))
        .toEqual('https://memegen.link/oag/saw-you-talking-to-\'\'slackbot\'\'/what\'s-her-name.jpg'));
  });

  describe('createCustomUrl', () => {
    it('should create a custom url for a given imageUrl, topText and bottomText', () =>
      expect(memeApiManager.createCustomUrl('https://fake.com/img.jpg', 'tests code', 'in production'))
        .toEqual('https://memegen.link/custom/tests-code/in-production.jpg?alt=https://fake.com/img.jpg'));

    it('should create a custom url for a given imageUr, topText and bottomText '
        + 'with starting and trailing space', () =>
      expect(memeApiManager.createCustomUrl('https://fake.com/img.jpg', ' tests code   ', '   in production'))
        .toEqual('https://memegen.link/custom/tests-code/in-production.jpg?alt=https://fake.com/img.jpg'));
  });
});
