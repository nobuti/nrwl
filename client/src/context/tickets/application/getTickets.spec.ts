import fetchMock from 'jest-fetch-mock';

import { getAllTickets } from './getTickets';
import { getTickets } from '../infrastructure/TicketRepository';

describe('getTickets', () => {
  fetchMock.enableMocks();

  beforeEach(() => {
    fetchMock.doMock();
  });

  it('should get all tickets', async () => {
    const tickets = [
      {
        id: 1,
        description: 'description',
        assigneeId: null,
        completed: false,
      },
      {
        id: 2,
        description: 'description',
        assigneeId: 3,
        completed: false,
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(tickets), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });

    const result = await getAllTickets(getTickets)();

    expect(result).toEqual(tickets);
  });

  it('should throw an error if the request fails by status', async () => {
    fetchMock.mockResponseOnce('Unprocessable Entity', {
      status: 422,
      headers: { 'content-type': 'application/json' },
    });
    const promise = getAllTickets(getTickets)();
    await expect(promise).rejects.toThrowError();
  });
});
