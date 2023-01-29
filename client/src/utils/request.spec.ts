import fetchMock from 'jest-fetch-mock';

import { request } from './request';

describe('request', () => {
  fetchMock.enableMocks();

  beforeEach(() => {
    fetchMock.doMock();
  });

  it('should make a request', async () => {
    const task = {
      asigneeId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    };

    fetchMock.mockResponseOnce(JSON.stringify(task));

    const response = await request('/api/todos/1');
    expect(response).toEqual(task);
  });

  it('should throw an error if the request fails by status', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 400 });
    const promise = request('/api/todos/1');
    await expect(promise).rejects.toThrowError();
  });

  it('should throw an error if the request fails', async () => {
    fetchMock.mockReject(() => Promise.reject('API is down'));
    const promise = request('/api/todos/1');
    await expect(promise).rejects.toThrowError();
  });
});
