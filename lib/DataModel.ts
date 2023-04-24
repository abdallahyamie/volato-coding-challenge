import { functions } from "../functions";
import { DataField } from "../types";

type ParsedResult = string | [string, ParsedResult[]];
type InputFields = Record<string, DataField>;

class DataModel {
  name: string;
  fields: Record<string, DataField>;

  constructor(name: string, fields: Record<string, DataField>) {
    this.name = name;
    this.fields = fields;
  }

  public setFieldValue(fieldKey: string, value: number | boolean | string | undefined | null): void {
    this.fields[fieldKey].value = value;

    this.calculateModel();
  }

  public getFieldValue(fieldKey: string): number | boolean | string | null {
    return this.fields[fieldKey]?.value ?? null;
  }

  private async calculateField(fieldKey: string): Promise<number | boolean | string | null> {

    const inputFields: InputFields =
      Object.keys(this.fields).reduce((acc, key) => {
        const { readOnly } = this.fields[key];
        if (!readOnly) {
          return {
            ...acc,
            [key]: this.fields[key]
          }
        }
        return acc;

      }, {});
    const field = this.fields[fieldKey];
    const { calculate } = field;

    if (calculate) {

      const parsedFunctions = this.parseCalculateString(calculate);
      if (parsedFunctions) {
        const result = await this.evaluateParsedFunctions(parsedFunctions, inputFields);
        this.fields[fieldKey].value = result;
      }

    }

    return null;
  }

  private calculateModel(): void {

    Object.keys(this.fields).forEach((fieldKey) => {
      const field = this.fields[fieldKey];
      const { calculate } = field;

      if (calculate) {
        this.calculateField(fieldKey)
      }
    });
  }


  private async evaluateParsedFunctions(parsedFunctions: ParsedResult, inputFields: InputFields): Promise<number | boolean | string | undefined | null> {
    if (typeof parsedFunctions === 'string' && parsedFunctions in inputFields) {
      return inputFields[parsedFunctions].value;
    }

    if (typeof parsedFunctions === 'string') {
      return parsedFunctions;
    }

    const [functionName, args] = parsedFunctions;

    const evaluatedArgs = await Promise.all(args.map((arg) => this.evaluateParsedFunctions(arg, inputFields)));

    if (functionName in functions) {
      // console.log('1111', functionName, ...evaluatedArgs)
      return await functions[functionName](...evaluatedArgs);
    } else {
      throw new Error(`Unknown function: ${functionName}`);
    }
  }

  // parse the calculate string into a nested array of functions and arguments
  private parseCalculateString(input: string): ParsedResult | null {
    const functionRegex = /^(\w+)\((.*)\)$/;
    const match = input.match(functionRegex);

    if (match) {
      const functionName = match[1];
      const argsString = match[2];
      const args = this.parseArguments(argsString);
      return [functionName, args];
    }

    return null;
  }

  private parseArguments(argsString: string): ParsedResult[] {
    const args: ParsedResult[] = [];
    let currentArg = '';
    let nestedParentheses = 0;

    for (let i = 0; i < argsString.length; i++) {
      const char = argsString[i];

      if (char === '(') {
        nestedParentheses++;
      } else if (char === ')') {
        nestedParentheses--;
      }

      if (char === ',' && nestedParentheses === 0) {
        const parsedArg = this.parseCalculateString(currentArg.trim()) || currentArg.trim();
        args.push(parsedArg);
        currentArg = '';
      } else {
        currentArg += char;
      }
    }

    if (currentArg) {
      const parsedArg = this.parseCalculateString(currentArg.trim()) || currentArg.trim();
      args.push(parsedArg);
    }

    return args;
  }
}
export default DataModel;