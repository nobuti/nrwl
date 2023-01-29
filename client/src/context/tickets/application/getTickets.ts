import { TicketsRepository } from '../domain/TicketRepository';

export const getAllTickets = (getAll: TicketsRepository['getAll']) => () =>
  getAll();
