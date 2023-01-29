import { makeTicketId } from './TicketId';

describe('TicketId', () => {
  it('should make a valid ticket id', async () => {
    const id = await makeTicketId(1);
    expect(id).toEqual(1);
  });

  it('should throw an error if the id is not a number', async () => {
    const id = makeTicketId('1' as any);
    await expect(id).rejects.toThrowError();
  });

  it('should throw an error if the id is negative', async () => {
    const id = makeTicketId(-1);
    await expect(id).rejects.toThrowError();
  });
});
