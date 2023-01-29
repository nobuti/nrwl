import fetchMock from 'jest-fetch-mock';

import { completeTicket } from './completeTicket';
import { completeTicket as complete } from '../infrastructure/TicketRepository';

describe('completeTicket', () => {
  fetchMock.enableMocks();

  beforeEach(() => {
    fetchMock.doMock();
  });

  it('should complete a ticket', async () => {
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

    const result = await completeTicket(complete)(ticket);

    expect(result).toEqual(
      expect.objectContaining({
        completed: true,
      })
    );
  });

  it('should throw an error if the request fails by status', async () => {
    fetchMock.mockResponseOnce('Unprocessable Entity', {
      status: 422,
      headers: { 'content-type': 'application/json' },
    });
    const promise = completeTicket(complete)({
      id: 1,
      description: 'description',
      completed: false,
      assigneeId: null,
    });
    await expect(promise).rejects.toThrowError();
  });
});
