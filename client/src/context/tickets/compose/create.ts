import { createTicket } from '../application/createTicket';
import { createTicket as create } from '../infrastructure/TicketRepository';

export default createTicket(create);
