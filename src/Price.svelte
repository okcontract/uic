<script lang="ts">
  export let amount: number;
  export let decimal: number;

  export let currency: string = undefined;

  $: decimal = amount > 0.01 ? 2 : 2 - Math.log10(amount);

  const formatCurrency = (
    amount: number,
    decimals = decimal,
    thousands = ","
  ) => {
    try {
      if (isNaN(amount)) return "---";
      let price = Math.abs(amount).toFixed(decimals); // FIXME: locale
      if (decimals === 0) price += ".";
      price = price.replace(/\d(?=(\d{3})+\.)/g, "$&" + thousands);
      return decimal === 0 ? price.substr(0, price.length - 1) : price;
    } catch (error) {
      return amount;
    }
  };
</script>

<span>
  {#if currency == "USD"}
    ${formatCurrency(amount)}
  {:else if currency == "GBP"}
    £{formatCurrency(amount)}
  {:else if currency == "EUR"}
    {formatCurrency(amount)}€
  {:else}
    {formatCurrency(amount)} {currency}
  {/if}
</span>
