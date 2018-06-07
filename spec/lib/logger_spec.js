import getLogger from '../../bot/src/lib/logger';

describe('logger.js', () => {
  describe('default export', () => {
    it('should be of type function', () =>
      expect(typeof getLogger).toEqual('function'));
  });

  describe('the return value from the getLogger function', () => {
    let logger;
    beforeAll(() => {
      logger = getLogger({ log_level: 'info' });
    });

    it('should be of type object', () =>
      expect(typeof logger).toEqual('object'));

    it('should have a debug function', () =>
      expect(typeof logger.debug).toEqual('function'));
    it('should have a info function', () =>
      expect(typeof logger.info).toEqual('function'));
    it('should have a warn function', () =>
      expect(typeof logger.warn).toEqual('function'));
    it('should have a error function', () =>
      expect(typeof logger.error).toEqual('function'));
  });
});
