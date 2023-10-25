export function arrayMatching(arr: string[], target: string[]): boolean {
  if (target.length) {
    return target.every((v: string) => arr.includes(v));
  }

  return false;
}