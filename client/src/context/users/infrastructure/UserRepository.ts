import { User } from '@acme/shared-models';

import { BaseError } from '../../../utils/BaseError';
import { request } from '../../../utils/request';
import { fromPrimitives } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class ApiUserError extends BaseError<'GetUsersError'> {}

export const getUsers: UserRepository['getAll'] = async () => {
  try {
    const response = await request<User[]>('/api/users');
    const tickets = [];
    for (const ticket of response) {
      const t = await fromPrimitives(ticket);
      tickets.push(t);
    }

    return tickets;
  } catch (error) {
    throw new ApiUserError({
      name: 'GetUsersError',
      message: 'Error getting users',
      cause: error,
    });
  }
};
