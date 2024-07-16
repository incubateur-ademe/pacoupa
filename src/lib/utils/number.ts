/**
 * Approximate a number to the nearest multiple of 10^numberZero
 *
 * @param numberZero number
 * @returns the approximated value
 *
 * @example approximation(5)(54_234) => 50000
 * @example approximation(2)(54_234) => 54200
 */
export const approximation = (numberZero: number) => (value: number) =>
  Math.round(value / 10 ** numberZero) * 10 ** numberZero;
