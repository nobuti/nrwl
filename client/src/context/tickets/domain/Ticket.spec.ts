import { fromPrimitives } from './Ticket';

describe('Ticket', () => {
  it('should make a valid ticket', async () => {
    const primitive = {
      id: 1,
      description: 'test description',
      assigneeId: 1,
      completed: false,
    };

    const ticket = await fromPrimitives(primitive);
    expect(ticket).toEqual(primitive);
  });

  it('should throw an error if the ticket is not valid', async () => {
    const ticket = fromPrimitives({
      id: -1,
      description: 'test description',
      assigneeId: 1,
      completed: false,
    });
    await expect(ticket).rejects.toThrowError();
  });
});
