/**
 * Decimal adjustment of a number.
 * http://jsfiddle.net/cCX5y/2/
 *
 * @param {number} value The number.
 * @param {number} precision The exponent (the 10 logarithm of the adjustment base).
 * @returns {number} The adjusted value.
 */
export function round(value: number, precision: number = 2): number {
  // Shift
  const split = value.toString().split('e');
  const tmp = Math.round(+(split[0] + 'e' + (split[1] ? +split[1] - -precision : -(-precision))));
  // Shift back
  const tmp2 = tmp.toString().split('e');
  const finalValue = +(tmp2[0] + 'e' + (tmp2[1] ? +tmp2[1] + -precision : -precision));

  return Number.parseFloat(finalValue.toFixed(precision));
}
