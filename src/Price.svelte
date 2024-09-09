<script lang="ts">
  import { formatCurrency } from "./price";

  export let amount: number;
  export let decimal: number = undefined;
  export let currency: string = undefined;
</script>

<span>
  {formatCurrency(amount, currency, decimal)}
</span>
