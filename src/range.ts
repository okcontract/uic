const regexpSignificant = /^[0]*(\d*[1-9])0*$/;
const numFormat = (x: string) =>
  new Intl.NumberFormat("en-US").format(Number.parseFloat(x));

/**
 * formatBig is an alternative to formatUnits from ethers.
 * @param v
 * @param keep significant digits to keep
 * @see https://docs.ethers.io/v5/api/utils/display-logic/
 */
export const formatBig = (
  v: bigint | number | string | null,
  dec: number,
  keep = 3
) => {
  if (v === undefined || v === null) return "-";
  const str = v.toString();
  if (str === "0") return "0";

  const magnitude =
    str.length - Number(dec) - (str.length > Number(dec) ? 0 : 1);
  // @ts-ignore possibly null
  const significant = regexpSignificant.exec(str)[1];
  // @ts-ignore possibly null
  const kept = regexpSignificant.exec(significant.substring(0, keep))[1];
  // console.log({ kept, magnitude, str, significant });
  return significant.length < magnitude
    ? numFormat(significant + "0".repeat(magnitude - significant.length))
    : magnitude > 0
      ? magnitude >= keep
        ? numFormat(str.substring(0, magnitude))
        : numFormat(
            `${kept.substring(0, magnitude)}.${kept.substring(magnitude)}`
          )
      : `0.${"0".repeat(-magnitude - 1)}${kept}`;
};

/**
 * Multiplies a string representation of a number by a given exponent of base 10 (10exponent).
 *
 * - Docs: https://viem.sh/docs/utilities/parseUnits
 *
 * @example
 * import { parseUnits } from 'viem'
 *
 * parseUnits('420', 9)
 * // 420000000000n
 */
export function parseUnits(value: string, decimals: number) {
  let [integer, fraction = "0"] = value.split(".");

  const negative = integer.startsWith("-");
  if (negative) integer = integer.slice(1);

  // trim leading zeros.
  fraction = fraction.replace(/(0+)$/, "");

  // round off if the fraction is larger than the number of decimals.
  if (decimals === 0) {
    if (Math.round(Number(`.${fraction}`)) === 1)
      integer = `${BigInt(integer) + 1n}`;
    fraction = "";
  } else if (fraction.length > decimals) {
    const [left, unit, right] = [
      fraction.slice(0, decimals - 1),
      fraction.slice(decimals - 1, decimals),
      fraction.slice(decimals)
    ];

    const rounded = Math.round(Number(`${unit}.${right}`));
    if (rounded > 9)
      fraction = `${BigInt(left) + BigInt(1)}0`.padStart(left.length + 1, "0");
    else fraction = `${left}${rounded}`;

    if (fraction.length > decimals) {
      fraction = fraction.slice(1);
      integer = `${BigInt(integer) + 1n}`;
    }

    fraction = fraction.slice(0, decimals);
  } else {
    fraction = fraction.padEnd(decimals, "0");
  }

  return BigInt(`${negative ? "-" : ""}${integer}${fraction}`);
}
