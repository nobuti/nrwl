import fetchMock from 'jest-fetch-mock';

import { unassignTicket } from './unassignTicket';
import { unassignTicket as unassign } from '../infrastructure/TicketRepository';

describe('unassignTicket', () => {
  fetchMock.enableMocks();

  beforeEach(() => {
    fetchMock.doMock();
  });

  it('should unassign a ticket', async () => {
    const ticket = {
      id: 1,
      description: 'description',
      assigneeId: 1,
      completed: false,
    };

    fetchMock.mockResponseOnce('No Content', {
      status: 204,
      headers: { 'content-type': 'application/json' },
    });

    const result = await unassignTicket(unassign)(ticket);

    expect(result).toEqual(
      expect.objectContaining({
        assigneeId: null,
      })
    );
  });

  it('should throw an error if the request fails by status', async () => {
    fetchMock.mockResponseOnce('Unprocessable Entity', {
      status: 422,
      headers: { 'content-type': 'application/json' },
    });
    const promise = unassignTicket(unassign)({
      id: 1,
      description: 'description',
      completed: false,
      assigneeId: null,
    });
    await expect(promise).rejects.toThrowError();
  });
});
