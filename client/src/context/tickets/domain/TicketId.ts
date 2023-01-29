import { Ticket } from '@acme/shared-models';

import { BaseError } from '../../../utils/BaseError';

export class InvalidTicketIdError extends BaseError<'InvalidTicketIdError'> {}

export const makeTicketId = async (id?: number): Promise<Ticket['id']> => {
  if (typeof id !== 'number' || id < 0) {
    throw new InvalidTicketIdError({
      name: 'InvalidTicketIdError',
      message: 'Ticket id must be a positive number',
    });
  }
  return Promise.resolve(id);
};
