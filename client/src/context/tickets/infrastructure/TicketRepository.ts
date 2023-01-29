import { Ticket } from '@acme/shared-models';

import { BaseError } from '../../../utils/BaseError';
import { request } from '../../../utils/request';
import { fromPrimitives } from '../domain/Ticket';
import { TicketsRepository } from '../domain/TicketRepository';

export class ApiTicketError extends BaseError<
  | 'GetTicketError'
  | 'GetTicketsError'
  | 'CreateTicketError'
  | 'AssignTicketError'
  | 'UnassignTicketError'
  | 'CompleteTicketError'
  | 'UncompleteTicketError'
> {}

export const getTicket: TicketsRepository['get'] = async (id: number) => {
  try {
    const response = await request<Ticket>(`/api/tickets/${id}`);
    const ticket = await fromPrimitives(response);
    return ticket;
  } catch (error) {
    throw new ApiTicketError({
      name: 'GetTicketError',
      message: `Error getting ticket ${id}`,
      cause: error,
    });
  }
};

export const getTickets: TicketsRepository['getAll'] = async () => {
  try {
    const response = await request<Ticket[]>('/api/tickets');
    const tickets = [];
    for (const ticket of response) {
      const t = await fromPrimitives(ticket);
      tickets.push(t);
    }

    return tickets;
  } catch (error) {
    throw new ApiTicketError({
      name: 'GetTicketsError',
      message: 'Error getting tickets',
      cause: error,
    });
  }
};

export const createTicket: TicketsRepository['create'] = async (
  ticket: Ticket
) => {
  try {
    const payload = await fromPrimitives(ticket);
    const response = await request<Ticket>(`/api/tickets`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return response;
  } catch (error) {
    throw new ApiTicketError({
      name: 'CreateTicketError',
      message: `Error creating a ticket`,
      cause: error,
    });
  }
};

export const assignTicket: TicketsRepository['assign'] = async (
  ticket: Ticket,
  assigneeId: Ticket['assigneeId']
) => {
  try {
    const result = await fromPrimitives({ ...ticket, assigneeId });

    await request<Ticket>(`/api/tickets/${ticket.id}/assign/${assigneeId}`, {
      method: 'PUT',
    });

    return result;
  } catch (error) {
    throw new ApiTicketError({
      name: 'AssignTicketError',
      message: `Error assigning ticket ${ticket.id} to user ${assigneeId}`,
      cause: error,
    });
  }
};

export const unassignTicket: TicketsRepository['unassign'] = async (
  ticket: Ticket
) => {
  try {
    const result = await fromPrimitives({ ...ticket, assigneeId: undefined });
    await request<Ticket>(`/api/tickets/${ticket.id}/unassign`, {
      method: 'PUT',
    });

    return result;
  } catch (error) {
    throw new ApiTicketError({
      name: 'UnassignTicketError',
      message: `Error unassigning ticket ${ticket.id}`,
      cause: error,
    });
  }
};

export const completeTicket: TicketsRepository['complete'] = async (
  ticket: Ticket
) => {
  try {
    const result = await fromPrimitives({
      ...ticket,
      completed: true,
    } as Ticket);
    await request<Ticket>(`/api/tickets/${ticket.id}/complete`, {
      method: 'PUT',
    });

    console.log('🚀 ~ file: TicketRepository.ts:132 ~ result', result);

    return result;
  } catch (error) {
    throw new ApiTicketError({
      name: 'CompleteTicketError',
      message: `Error completing ticket ${ticket.id}`,
      cause: error,
    });
  }
};

export const uncompleteTicket: TicketsRepository['uncomplete'] = async (
  ticket: Ticket
) => {
  try {
    const result = await fromPrimitives({
      ...ticket,
      completed: false,
    });
    await request<Ticket>(`/api/tickets/${ticket.id}/complete`, {
      method: 'DELETE',
    });

    return result;
  } catch (error) {
    throw new ApiTicketError({
      name: 'UncompleteTicketError',
      message: `Error making pending ticket ${ticket.id}`,
      cause: error,
    });
  }
};
