import { makeTicketAssigneeId } from './TicketAssigneeId';

describe('TicketAssigneeId', () => {
  it('should make a valid ticket id', async () => {
    const id = await makeTicketAssigneeId(1);
    expect(id).toEqual(1);
  });

  it('should throw an error if the id is not a number', async () => {
    const id = makeTicketAssigneeId('1' as any);
    await expect(id).rejects.toThrowError();
  });

  it('should throw an error if the id is negative', async () => {
    const id = makeTicketAssigneeId(-1);
    await expect(id).rejects.toThrowError();
  });

  it('should return null if not provided', async () => {
    const id = await makeTicketAssigneeId();
    expect(id).toEqual(null);
  });
});
