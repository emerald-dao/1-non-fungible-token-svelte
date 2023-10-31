import * as fcl from '@onflow/fcl';
import { SHA3 } from 'sha3';
import { ec } from 'elliptic';
import { EXAMPLE_NFT_CONTRACT_ADDRESS } from '../config';
var ecObj = new ec('p256');

const privateKey = process.env.PRIVATE_KEY || 'fc49a771829ff480841164af13b18a68cd697b6e79c80af7f8470a9e651dfac5';

const sign = (message) => {
  const key = ecObj.keyFromPrivate(Buffer.from(privateKey, "hex"));
  const sig = key.sign(hash(message)); // hashMsgHex -> hash
  const n = 32;
  const r = sig.r.toArrayLike(Buffer, "be", n);
  const s = sig.s.toArrayLike(Buffer, "be", n);
  return Buffer.concat([r, s]).toString("hex");
}

const hash = (message) => {
  const sha = new SHA3(256);
  sha.update(Buffer.from(message, "hex"));
  return sha.digest();
}

export const serverAuthorization = async (account) => {
  const addr = EXAMPLE_NFT_CONTRACT_ADDRESS;
  const keyId = 0;

  return {
    ...account,
    tempId: `${addr}-${keyId}`,
    addr: fcl.sansPrefix(addr),
    keyId: Number(keyId),
    signingFunction: async (signable) => {
      return {
        addr: fcl.withPrefix(addr),
        keyId: Number(keyId),
        signature: sign(signable.message)
      }
    }
  }
}