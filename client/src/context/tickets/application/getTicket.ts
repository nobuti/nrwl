import { TicketsRepository } from '../domain/TicketRepository';

export const getSingleTicket =
  (get: TicketsRepository['get']) => (id: number) =>
    get(id);
