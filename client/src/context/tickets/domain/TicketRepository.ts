import { Ticket } from '@acme/shared-models';

export type TicketsRepository = {
  getAll: () => Promise<Ticket[]>;
  get: (id: number) => Promise<Ticket>;
  create: (ticket: Ticket) => Promise<Ticket>;
  assign: (ticket: Ticket, assigneeId: number) => Promise<Ticket>;
  unassign: (ticket: Ticket) => Promise<Ticket>;
  complete: (ticket: Ticket) => Promise<Ticket>;
  uncomplete: (ticket: Ticket) => Promise<Ticket>;
};
