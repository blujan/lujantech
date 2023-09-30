// **NOTE**: This is all for fun, and most definitely does NOT represent a secure way to encrypt or decrypt data
// By example, the 'iv' used is meant to be a salt that changes every time something is encrypted.
// I reuse it here here, but this is just meant to give email scraping bots a headache.
// There are ways to securely deal with something like this, but I wanted to see if I could do something
// fun with pure client side functions. Please don't use this for anything remotely serious.
//
const cipher = new Uint8Array([
  126, 129, 189, 187, 20, 236, 246, 104, 80, 52, 159, 149, 17, 187, 250, 96, 81, 184, 122, 38, 251, 178, 183, 217, 238,
  38, 10, 22, 242, 162, 173, 188, 253, 215
]);
const iv = new Uint8Array([69, 196, 128, 192, 42, 243, 132, 39, 1, 83, 132, 42, 10, 227, 9, 206]);

async function createKey(key: string) {
  const buffer = new TextEncoder().encode(key);
  const hash = await crypto.subtle.digest('SHA-256', buffer);
  return await crypto.subtle.importKey('raw', hash, 'AES-GCM', false, ['encrypt', 'decrypt']);
}

export async function encryptText(keyString: string, text: string) {
  const key = await createKey(keyString);
  const encodedText = new TextEncoder().encode(text);
  let cipherText = await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, encodedText);
  return new Uint8Array(cipherText);
}

export async function decryptText(keyString: string) {
  if (!keyString) return '';
  const key = await createKey(keyString);
  let decrypted;
  try {
    decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, cipher);
  } catch (error) {
    // key did not work, return an empty array -> string
    decrypted = new Uint8Array();
  }
  return new TextDecoder().decode(decrypted);
}
