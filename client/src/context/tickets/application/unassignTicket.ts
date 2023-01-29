import { Ticket } from '@acme/shared-models';

import { TicketsRepository } from '../domain/TicketRepository';

export const unassignTicket =
  (unassign: TicketsRepository['unassign']) => (ticket: Ticket) =>
    unassign(ticket);
