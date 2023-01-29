import { completeTicket } from '../application/completeTicket';
import { completeTicket as complete } from '../infrastructure/TicketRepository';

export default completeTicket(complete);
