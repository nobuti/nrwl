import { getAllUsers } from '../application/getAllUsers';
import { getUsers } from '../infrastructure/UserRepository';

export default getAllUsers(getUsers);
