import fetchMock from 'jest-fetch-mock';

import { getAllUsers } from './getAllUsers';
import { getUsers } from '../infrastructure/UserRepository';

describe('getAllUsers', () => {
  fetchMock.enableMocks();

  beforeEach(() => {
    fetchMock.doMock();
  });

  it('should get all users', async () => {
    const users = [
      {
        id: 1,
        name: 'Jane Doe',
      },
      {
        id: 2,
        name: 'Jhon Doe',
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(users), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });

    const result = await getAllUsers(getUsers)();

    expect(result).toEqual(users);
  });

  it('should throw an error if the request fails by status', async () => {
    fetchMock.mockResponseOnce('Unprocessable Entity', {
      status: 422,
      headers: { 'content-type': 'application/json' },
    });
    const promise = getAllUsers(getUsers)();
    await expect(promise).rejects.toThrowError();
  });
});
