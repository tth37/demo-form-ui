/**
 * @param obj \{[type: string]: string\}
 * @param key string
 * @param value string
 * @returns a merged object, with the replaced key and value
 */
export function mergeObject<T>(obj: T, key: string, value: string) {
  return { ...obj, [key]: value } as T;
}
