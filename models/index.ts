import DataModel from "../lib/DataModel";
import { averagesCalculatorModel } from "./averagesCalculator.model";
import { uniqueHashModel } from "./uniqueHash.model";

export const  models: Array<DataModel> = [
  uniqueHashModel,
  averagesCalculatorModel
]