import { getSingleTicket } from '../application/getTicket';
import { getTicket } from '../infrastructure/TicketRepository';

export default getSingleTicket(getTicket);
