import { Functions } from "../types";
import { countFunction } from "./count.function";
import { divideFunction } from "./divide.function";
import { medianFunction } from "./median.function";
import { sha256Function } from "./sha256.function";
import { standardDevFunction } from "./standardDev.function";
import { sumFunction } from "./sum.function";


// Lets put each function in a separate file
// Path: functions/sum.ts
// to make it easier to increase the number of functions in the future
export const functions: Functions = {
  sum: sumFunction,
  count: countFunction,
  divide: divideFunction,
  sha256: sha256Function,
  median: medianFunction,
  standardDev: standardDevFunction,
};