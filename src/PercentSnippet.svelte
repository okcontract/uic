<script lang="ts">
  export let amount: number;
  export let decimal: number = 2;

  const formatPercentage = (
    amount: number,
    decimals = decimal,
    thousands = ","
  ) => {
    let num = Math.abs(amount * 100).toFixed(decimals); // @todo locale
    if (decimals === 0) num += ".";
    num = num.replace(/\d(?=(\d{3})+\.)/g, "$&" + thousands);
    return decimal === 0 ? num.substr(0, num.length - 1) : num;
  };
</script>

<span>
  {formatPercentage(amount)}%
</span>
