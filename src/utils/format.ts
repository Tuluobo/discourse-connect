import WordArray from "crypto-js/lib-typedarrays";

/**
 * Format number to show in k format (e.g., 1557 => 1.6k)
 */
export function formatCompactNumber(num: number): string {
  if (num < 1000) {
    return num.toString();
  }
  return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
}

export function generateRandomKey(length: number = 16): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let result = "";

  const randomValues = WordArray.random(length);
  for (let i = 0; i < length; i++) {
    const byte = (randomValues.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    result += characters[byte % charactersLength];
  }

  return result;
}

export function generateSecretWords(length: number = 32): string {
  const buffer = WordArray.random(length);
  return buffer.toString();
}
