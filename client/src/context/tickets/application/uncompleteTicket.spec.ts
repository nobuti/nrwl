import fetchMock from 'jest-fetch-mock';

import { uncompleteTicket } from './uncompleteTicket';
import { uncompleteTicket as uncomplete } from '../infrastructure/TicketRepository';

describe('uncompleteTicket', () => {
  fetchMock.enableMocks();

  beforeEach(() => {
    fetchMock.doMock();
  });

  it('should uncomplete a ticket', async () => {
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

    const result = await uncompleteTicket(uncomplete)(ticket);

    expect(result).toEqual(
      expect.objectContaining({
        completed: false,
      })
    );
  });

  it('should throw an error if the request fails by status', async () => {
    fetchMock.mockResponseOnce('Unprocessable Entity', {
      status: 422,
      headers: { 'content-type': 'application/json' },
    });
    const promise = uncompleteTicket(uncomplete)({
      id: 1,
      description: 'description',
      completed: false,
      assigneeId: null,
    });
    await expect(promise).rejects.toThrowError();
  });
});
