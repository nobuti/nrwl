import { Ticket } from '@acme/shared-models';

export const makeTicketCompleted = async (
  completed?: boolean
): Promise<Ticket['completed']> => {
  return Promise.resolve(!!completed);
};
