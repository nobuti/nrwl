import { uncompleteTicket } from '../application/uncompleteTicket';
import { uncompleteTicket as uncomplete } from '../infrastructure/TicketRepository';

export default uncompleteTicket(uncomplete);
