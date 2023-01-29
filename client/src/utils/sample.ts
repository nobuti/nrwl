export function sample<T>(arr: T[]) {
  return arr.length ? arr[Math.floor(Math.random() * arr.length)] : undefined;
}
