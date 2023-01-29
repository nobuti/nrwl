import { BaseError } from './BaseError';

describe('BaseError', () => {
  it('should have a name and message', () => {
    const error = new BaseError({
      name: 'TestError',
      message: 'test message',
    });
    expect(error.name).toEqual('TestError');
    expect(error.message).toEqual('test message');
  });

  it('should have a cause', () => {
    const cause = new Error('test cause');
    const error = new BaseError({
      name: 'TestError',
      message: 'test message',
      cause,
    });
    expect(error.cause).toEqual(cause);
  });
});
