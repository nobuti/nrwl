import { makeTicketDescription } from './TicketDescription';

describe('TicketDescription', () => {
  it('should make a valid ticket description', async () => {
    const description = await makeTicketDescription('test description');
    expect(description).toEqual('test description');
  });

  it('should throw an error if the description is not a string', async () => {
    const description = makeTicketDescription(1 as any);
    await expect(description).rejects.toThrowError();
  });

  it('should throw an error if the description is empty', async () => {
    const description = makeTicketDescription('');
    await expect(description).rejects.toThrowError();
  });

  it('should throw an error if the description is less than 3 characters', async () => {
    const description = makeTicketDescription('fo');
    await expect(description).rejects.toThrowError();
  });
});
