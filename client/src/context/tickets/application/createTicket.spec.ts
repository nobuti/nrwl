import fetchMock from 'jest-fetch-mock';

import { createTicket } from './createTicket';
import { createTicket as create } from '../infrastructure/TicketRepository';

describe('createTicket', () => {
  fetchMock.enableMocks();

  beforeEach(() => {
    fetchMock.doMock();
  });

  it('should create a ticket', async () => {
    const ticket = {
      id: 1,
      description: 'description',
      assigneeId: null,
      completed: false,
    };

    fetchMock.mockResponseOnce(JSON.stringify(ticket), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });

    const result = await createTicket(create)(ticket);

    expect(result).toEqual(ticket);
  });

  it('should throw an error if the request fails by status', async () => {
    fetchMock.mockResponseOnce('Unprocessable Entity', {
      status: 422,
      headers: { 'content-type': 'application/json' },
    });
    const promise = createTicket(create)({
      id: 1,
      description: 'description',
      completed: false,
      assigneeId: null,
    });
    await expect(promise).rejects.toThrowError();
  });
});
