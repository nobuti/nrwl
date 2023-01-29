import { Ticket } from '@acme/shared-models';

import { TicketsRepository } from '../domain/TicketRepository';

export const uncompleteTicket =
  (uncomplete: TicketsRepository['uncomplete']) => (ticket: Ticket) =>
    uncomplete(ticket);
