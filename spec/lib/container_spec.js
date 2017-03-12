import getContainer from '../../bot/src/container';

describe('container.js', () => {
  describe('default export', () => {
    it('should be of type function', () =>
      expect(typeof getContainer).toEqual('function'));
  });
});
