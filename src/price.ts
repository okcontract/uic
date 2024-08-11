const subscriptMap = {
  "0": "₀",
  "1": "₁",
  "2": "₂",
  "3": "₃",
  "4": "₄",
  "5": "₅",
  "6": "₆",
  "7": "₇",
  "8": "₈",
  "9": "₉"
};

export const convertToUnicodeSubscript = (str: string) =>
  [...str].map((char) => subscriptMap[char] ?? char).join("");

export const formatCurrency = (n: number, currency = "USD", decimal = 3) => {
  const isNegative = n < 0;
  const absoluteValue = Math.abs(n);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: decimal
  });

  const currencySymbol =
    formatter.formatToParts(1).find((part) => part.type === "currency")
      ?.value ?? "";

  if (absoluteValue >= 1e9) {
    return `${isNegative ? "-" : ""}${currencySymbol}${(
      absoluteValue / 1e9
    ).toFixed(3)}bn`;
  }

  if (absoluteValue > 0 && absoluteValue < 0.001) {
    const significantDigits = absoluteValue.toPrecision(3);
    const [mantissa, exponent] = significantDigits.split("e");
    if (exponent) {
      const exponentValue = Number.parseInt(exponent, 10);
      // Remove leading zeros
      const normalizedMantissa = mantissa.replace(".", "").replace(/^0+/, "");
      return `${
        isNegative ? "-" : ""
      }${currencySymbol}0.0${convertToUnicodeSubscript(
        Math.abs(exponentValue).toString()
      )}${normalizedMantissa}`;
    }
    return `${isNegative ? "-" : ""}${currencySymbol}${significantDigits}`;
  }

  return formatter.format(n);
};
