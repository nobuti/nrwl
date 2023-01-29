import { Ticket } from '@acme/shared-models';

import { BaseError } from '../../../utils/BaseError';

export class InvalidTicketDescriptionError extends BaseError<'InvalidTicketDescriptionError'> {}

export const makeTicketDescription = async (
  description?: string
): Promise<Ticket['description']> => {
  if (typeof description !== 'string' || description.length < 3) {
    throw new InvalidTicketDescriptionError({
      name: 'InvalidTicketDescriptionError',
      message: 'Ticket description must be a string with at least 3 characters',
    });
  }
  return Promise.resolve(description);
};
