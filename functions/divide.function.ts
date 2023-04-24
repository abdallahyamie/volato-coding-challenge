


export const divideFunction =
  (a: number | string, b: number | string) => {
    if (typeof a === "string") {
      a = parseFloat(a)
    }
    if (typeof b === "string") {
      b = parseFloat(b)
    }
    if (a === 0 || b === 0) {
      return 0
    }
    return a / b
  }