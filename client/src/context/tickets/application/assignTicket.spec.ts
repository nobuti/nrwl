import fetchMock from 'jest-fetch-mock';

import { assignTicket } from './assignTicket';
import { assignTicket as assign } from '../infrastructure/TicketRepository';

describe('assignTicket', () => {
  fetchMock.enableMocks();

  beforeEach(() => {
    fetchMock.doMock();
  });

  it('should assign a ticket', async () => {
    const ticket = {
      id: 1,
      description: 'description',
      assigneeId: null,
      completed: false,
    };

    fetchMock.mockResponseOnce('No Content', {
      status: 204,
      headers: { 'content-type': 'application/json' },
    });

    const result = await assignTicket(assign)(ticket, 1);

    expect(result).toEqual({
      id: 1,
      description: 'description',
      completed: false,
      assigneeId: 1,
    });
  });

  it('should throw an error if the request fails by status', async () => {
    fetchMock.mockResponseOnce('Unprocessable Entity', {
      status: 422,
      headers: { 'content-type': 'application/json' },
    });
    const promise = assignTicket(assign)(
      {
        id: 1,
        description: 'description',
        completed: false,
        assigneeId: null,
      },
      1
    );
    await expect(promise).rejects.toThrowError();
  });
});
