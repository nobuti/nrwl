import { UserRepository } from '../domain/UserRepository';

export const getAllUsers = (getAll: UserRepository['getAll']) => () => getAll();
