import { unassignTicket } from '../application/unassignTicket';
import { unassignTicket as unassign } from '../infrastructure/TicketRepository';

export default unassignTicket(unassign);
