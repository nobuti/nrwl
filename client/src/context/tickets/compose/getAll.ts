import { getAllTickets } from '../application/getTickets';
import { getTickets } from '../infrastructure/TicketRepository';

export default getAllTickets(getTickets);
