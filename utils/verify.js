import nacl from 'tweetnacl';

export function verifySignature(signature, timestamp, body, publicKey) {
  const encoder = new TextEncoder();
  const message = encoder.encode(timestamp + body);
  const sig = Buffer.from(signature, 'hex');
  const key = Buffer.from(publicKey, 'hex');
  return nacl.sign.detached.verify(message, sig, key);
}