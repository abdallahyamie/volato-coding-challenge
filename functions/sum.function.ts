
export const sumFunction =
  (...values: Array<number| undefined>) => {
    return values.reduce((sum, value) => (sum || 0) + (value || 0), 0)
  }