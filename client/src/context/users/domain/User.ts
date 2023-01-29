import { User } from '@acme/shared-models';

export async function fromPrimitives(user: User): Promise<User> {
  return user;
}
