
export const countFunction =
  (...values: Array<number | undefined>) => {
    return values.reduce((acc, cur) => {
      if (cur) {
        return (acc || 0) + 1
      }
      return acc
    }, 0)
  }