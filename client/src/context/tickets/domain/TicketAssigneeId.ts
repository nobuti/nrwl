import { Ticket } from '@acme/shared-models';

import { BaseError } from '../../../utils/BaseError';

export class InvalidTicketAssigneeIdError extends BaseError<'InvalidTicketAssigneeIdError'> {}

export const makeTicketAssigneeId = async (
  id?: number | null
): Promise<Ticket['assigneeId']> => {
  if (
    (id != null && typeof id !== 'number') ||
    (typeof id === 'number' && id < 0)
  ) {
    throw new InvalidTicketAssigneeIdError({
      name: 'InvalidTicketAssigneeIdError',
      message: 'Ticket asignee id must be a positive number',
    });
  }

  return Promise.resolve(id || null);
};
