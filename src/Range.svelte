<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import { getTheme, Button, Icon } from "@okcontract/uic";

  import {
    type RangeStyle,
    rangeStyles,
    type RangeSize,
    rangeSizes
  } from "./ui";
  import { formatBig, parseUnits } from "./range";

  export let label: string;
  export let value: bigint;

  export let required: boolean = false;
  export let symb: string | Promise<string>;
  export let decimals: bigint = 0n;
  export let min: number = 0;
  export let max: bigint;
  export let infinite: boolean = false;
  export let style: RangeStyle = "neutral";
  export let size: RangeSize = "md";
  export let disabled = false

  const theme = getTheme();
  const compiledTheme = theme?.compiled;

  const fakeInfinite = 10n ** 40n;
  const threshold = 10n ** 30n;
  const precision = 3; // digits
  const scale = 10 ** precision;

  $: slider = value
    ? max &&
      max !== 0n &&
      Number((BigInt(value.toString()) * BigInt(scale)) / max)
    : 0;
  $: slidingValue = BigInt(value || 0);

  const onManualInput = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      let contentEditableValue = (e?.target as HTMLElement)?.textContent || "";
      let parsedValue = parseFloat(contentEditableValue.replace(/,/g, ""));
      // update value and slider
      value = parseUnits(parsedValue.toString(), Number(decimals));
      slider = Number((value * BigInt(scale)) / max);
      // @todo we also dispatch?
      dispatch("input", value);
    }
  };

  // calculate value slider amount
  const onInput = (ev: Event) => {
    slidingValue =
      (BigInt(max) *
        BigInt("value" in ev.target && (ev.target.value as string))) /
      BigInt(scale);
  };
</script>

<div class="grid gap-2">
  {#if !max || max === 0n}
    <dl
      class="flex gap-1 items-center justify-between w-full text-sm leading-5"
    >
      <dt class="font-medium opacity-70">{label}</dt>
      {#if symb && required}
        <dd class="flex grow gap-1 items-center text-xs leading-5">
          <Icon name="warning-o" size="xs" />
          <span
            ><b>Top up!</b> You need to get some
            <span class="font-bold uppercase">{symb}</span>
            tokens</span
          >
        </dd>
      {/if}
    </dl>
    <label for="pcent">
      <input
        type="range"
        disabled={true}
        {min}
        max={0}
        class="cursor-not-allowed opacity-50 w-full {theme.dark(
          $compiledTheme,
          'range range-white',
          'range',
          rangeStyles[style]
        )} {rangeSizes[size]}"
      />
    </label>
  {:else}
    <dl
      class="flex gap-1 items-center justify-between w-full text-sm leading-5"
    >
      <dt class="flex gap-1 items-center">
        <span class="font-medium opacity-70">{label}:</span>
        <!-- svelte-ignore a11y-no-static-element-interactions @todo -->
        <span
          class="font-semibold"
          contenteditable={true}
          on:keydown={onManualInput}
        >
          {threshold < slidingValue
            ? "MAX"
            : formatBig(BigInt(slidingValue), Number(decimals.toString()))}
        </span>
        <span class="uppercase font-semibold">
          {#await symb}
            <span class="loading loading-spinner loading-xs"></span>
          {:then symb}
            {symb}
          {/await}
        </span>
      </dt>
      <dd class="flex">
        {#if infinite}
          <Button
            label="Max"
            style="neutral"
            size="sm"
            action={() => {
              const v = fakeInfinite;
              dispatch("input", v);
              slider = scale;
            }}
          />
        {/if}
      </dd>
    </dl>
    <label for="pcent">
      <input
        type="range"
        bind:value={slider}
        on:change={(ev) => {
          if (max) {
            const v =
              (BigInt(max) * BigInt(ev.currentTarget.value)) / BigInt(scale);
            dispatch("input", v);
          }
        }}
        on:input={onInput}
        {min}
        max={scale}
        {disabled}
        class="w-full {disabled ? "cursor-default" : "cursor-pointer"} {theme.dark(
          $compiledTheme,
          'range range-white',
          'range',
          rangeStyles[style]
        )} {rangeSizes[size]}"
      />
    </label>
  {/if}
</div>
