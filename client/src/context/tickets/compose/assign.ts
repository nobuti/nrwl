import { assignTicket } from '../application/assignTicket';
import { assignTicket as assign } from '../infrastructure/TicketRepository';

export default assignTicket(assign);
