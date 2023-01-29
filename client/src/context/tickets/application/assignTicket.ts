import { Ticket } from '@acme/shared-models';

import { TicketsRepository } from '../domain/TicketRepository';

export const assignTicket =
  (assign: TicketsRepository['assign']) =>
  (ticket: Ticket, assigneeId: number) =>
    assign(ticket, assigneeId);
