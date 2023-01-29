import { Ticket } from '@acme/shared-models';

import { BaseError } from '../../../utils/BaseError';
import { makeTicketId } from './TicketId';
import { makeTicketCompleted } from './TicketCompleted';
import { makeTicketAssigneeId } from './TicketAssigneeId';
import { makeTicketDescription } from './TicketDescription';

export class InvalidTicketError extends BaseError<'InvalidTicketError'> {}

type PromiseSettled<T> = {
  status: 'fulfilled' | 'rejected';
  reason?: any;
  value?: T;
};

function handleResults(results: PromiseSettled<unknown>[]) {
  const errors = results
    .filter((result) => result.status === 'rejected')
    .map((result) => result.reason);

  if (errors.length) {
    throw new InvalidTicketError({
      name: 'InvalidTicketError',
      message: 'Ticket is not valid',
      cause: errors,
    });
  }

  return results.map((result) => result.value);
}

export async function fromPrimitives({
  id,
  assigneeId,
  completed,
  description,
}: Partial<Ticket>): Promise<Ticket> {
  const results = await Promise.allSettled([
    makeTicketId(id),
    makeTicketAssigneeId(assigneeId),
    makeTicketCompleted(completed),
    makeTicketDescription(description),
  ]);

  const [ticketId, ticketAssigneeId, ticketCompleted, ticketDescription] =
    handleResults(results);

  return {
    id: ticketId,
    assigneeId: ticketAssigneeId,
    completed: ticketCompleted,
    description: ticketDescription,
  } as Ticket;
}
