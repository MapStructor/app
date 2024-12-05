export const blacklistedTokens: Set<string> = new Set(); //switch to db??

export function addToBlackList(item: string) {
  blacklistedTokens.add(item);
}