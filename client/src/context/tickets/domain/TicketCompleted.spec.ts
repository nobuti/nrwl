import { makeTicketCompleted } from './TicketCompleted';

describe('TicketCompleted', () => {
  it('should make a valid ticket completed', async () => {
    const completed = await makeTicketCompleted(true);
    expect(completed).toEqual(true);
  });

  it('should make a valid ticket completed when completed is not explicit', async () => {
    const completed = await makeTicketCompleted();
    expect(completed).toEqual(false);
  });
});
