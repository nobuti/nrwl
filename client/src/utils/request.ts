import { BaseError } from './BaseError';

export class RequestError extends BaseError<'RequestError'> {}

export async function request<T>(
  url: string,
  config: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(url, config);
    if (response.ok) {
      try {
        const data = await response.json();
        return data as T;
      } catch (error) {
        // Swallow the error as the response is likely not JSON
        // and return an empty object
        return {} as T;
      }
    } else {
      return Promise.reject(
        new RequestError({
          name: 'RequestError',
          message: 'Request failed',
          cause: response,
        })
      );
    }
  } catch (error) {
    return Promise.reject(
      new RequestError({
        name: 'RequestError',
        message: 'Request failed',
        cause: error,
      })
    );
  }
}
