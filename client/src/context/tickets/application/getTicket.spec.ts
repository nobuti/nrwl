import fetchMock from 'jest-fetch-mock';

import { getSingleTicket } from './getTicket';
import { getTicket } from '../infrastructure/TicketRepository';

describe('getSingleTicket', () => {
  fetchMock.enableMocks();

  beforeEach(() => {
    fetchMock.doMock();
  });

  it('should get a ticket', async () => {
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

    const result = await getSingleTicket(getTicket)(1);

    expect(result).toEqual(ticket);
  });

  it('should throw an error if the request fails by status', async () => {
    fetchMock.mockResponseOnce('Unprocessable Entity', {
      status: 422,
      headers: { 'content-type': 'application/json' },
    });
    const promise = getSingleTicket(getTicket)(1);
    await expect(promise).rejects.toThrowError();
  });
});
