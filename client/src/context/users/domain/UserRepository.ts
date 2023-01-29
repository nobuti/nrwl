import { User } from '@acme/shared-models';

export type UserRepository = {
  getAll: () => Promise<User[]>;
};
