// The first data model should define 2 fields string fields as input
// and 1 output field representing a SHA256 hash of the two input strings
// such that all unique combinations of string 1 and string 2 yields a unique hash

//NOTE: You can NOT create a unique hash by simply concatenating the strings and 
//calling the sha256() function.


import * as Crypto from "expo-crypto";

export const sha256Function = async (str1: string, str2: string): Promise<string> => {
  const sortedStr1 = str1 < str2 ? str1 : str2;
  const sortedStr2 = str1 < str2 ? str2 : str1;
  if (sortedStr1 && sortedStr2) {
    const hash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, sortedStr1 + sortedStr2)

    return hash;
  }

  return "";
}