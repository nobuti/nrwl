import { Ticket } from '@acme/shared-models';

import { TicketsRepository } from '../domain/TicketRepository';

export const completeTicket =
  (complete: TicketsRepository['complete']) => (ticket: Ticket) =>
    complete(ticket);
