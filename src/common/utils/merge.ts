export function mergeObject<T>(obj: T, key: string, value: string) {
  return { ...obj, [key]: value } as T;
}
