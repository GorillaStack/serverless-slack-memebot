import getContainer from '../../bot/src/container';

describe('container.js', () => {
  describe('default export', () => {
    it('should be of type function', () =>
      expect(typeof getContainer).toEqual('function'));
  });

  describe('after calling getContainer', () => {
    let container;

    beforeAll(() => { container = getContainer(); });

    it('should retrieve an object', () => typeof container === 'object');
    describe('calling container.MemebotApi', () => {
      let memebotApi;

      beforeAll(() => { memebotApi = container.MemebotApi; });

      it('should retrieve an object', () => typeof memebotApi === 'object');
    });
  });
});
