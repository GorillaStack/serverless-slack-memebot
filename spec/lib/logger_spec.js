import getLogger from '../../bot/src/lib/logger';

describe('logger.js', () => {
  describe('default export', () => {
    it('should be of type function', () =>
      expect(typeof getLogger).toEqual('function'));
  });
});
