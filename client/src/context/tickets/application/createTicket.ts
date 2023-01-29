import { Ticket } from '@acme/shared-models';
import { TicketsRepository } from '../domain/TicketRepository';

export const createTicket =
  (create: TicketsRepository['create']) => (ticket: Ticket) =>
    create(ticket);
