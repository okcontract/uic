<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import { Button, Icon, getTheme } from "@okcontract/uic";

  import { formatBig, parseUnits } from "./range";
  import {
    rangeSizes,
    rangeStyles,
    type RangeSize,
    type RangeStyle
  } from "./ui";

  export let label: string;
  export let value: bigint = 0n;

  export let required: boolean = false;
  export let unit: string | Promise<string>;
  export let decimals: bigint = 0n;
  export let min: bigint = 0n;
  export let max: bigint;
  export let infinite: boolean = false;
  export let style: RangeStyle = "neutral";
  export let size: RangeSize = "md";
  export let disabled = false;

  const theme = getTheme();
  const compiledTheme = theme?.compiled;

  const fakeInfinite = 10n ** 40n;
  const threshold = 10n ** 30n;
  const precision = 3n; // digits
  const scale = 10n ** precision;

  const mathMax = (a: bigint, b: bigint) => (a > b ? a : b);
  const mathRound = (value: bigint, divisor: bigint) => {
    const halfDivisor = divisor / 2n;
    const remainder = value % divisor;

    // If remainder is at least half of divisor, round up; otherwise, round down
    return remainder >= halfDivisor
      ? (value + divisor - remainder) / divisor
      : (value - remainder) / divisor;
  };

  // @todo use Cell
  $: slider = value
    ? max &&
      max !== 0n &&
      mathMax((min * scale) / max, mathRound(value * scale, max))
    : (min * scale) / max;

  $: console.log({ min, scale, value, max });

  const onManualInput = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      let contentEditableValue = (e?.target as HTMLElement)?.textContent || "";
      let parsedValue = parseFloat(contentEditableValue.replace(/,/g, ""));
      // update value and slider
      const nv = parseUnits(parsedValue.toString(), Number(decimals));
      value = nv < min ? min : nv;
      slider = mathRound(value * scale, max);
      // @todo we also dispatch?
      dispatch("input", value);
    }
  };

  // calculate value slider amount
  const onInput = (ev: Event) => {
    const v = "value" in ev.target && (ev.target.value as string);
    const nv = (max * BigInt(v || 0)) / scale;
    // Snap slider to nearest integer
    slider = mathMax((min * scale) / max, mathRound(nv * BigInt(scale), max));
  };
</script>

<div class="grid gap-2">
  {#if !max || max === 0n}
    <dl
      class="flex gap-1 items-center justify-between w-full text-sm leading-5"
    >
      <dt class="font-medium opacity-70 capitalize">{label}</dt>
      {#if unit && required}
        <dd class="flex grow gap-1 items-center text-xs leading-5">
          <Icon name="error-o" size="xs" />
          <span
            ><b>Top up!</b> Insufficient
            <span class="font-bold uppercase">{unit}</span>
            balance</span
          >
        </dd>
      {/if}
    </dl>
    <label for="pcent">
      <input
        type="range"
        disabled={true}
        min={Number(min)}
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
        <span class="font-medium opacity-70 capitalize">{label}:</span>
        <!-- svelte-ignore a11y-no-static-element-interactions @todo -->
        <span
          class="font-semibold"
          contenteditable={true}
          on:keydown={onManualInput}
        >
          {threshold < slider
            ? "♾️"
            : formatBig(
                (BigInt(slider) * max) / BigInt(scale),
                Number(decimals.toString())
              )}
        </span>
        <span class="uppercase font-semibold">
          {#await unit}
            <span class="loading loading-spinner loading-xs"></span>
          {:then unit}
            {unit}
          {/await}
        </span>
      </dt>
      <dd class="flex">
        {#if infinite}
          <Button
            label="♾️"
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
            const nv = (max * BigInt(ev.currentTarget.value)) / scale;
            dispatch("input", nv < min ? min : nv);
          }
        }}
        on:input={onInput}
        min={Number(min)}
        max={Number(scale)}
        {disabled}
        class="w-full {disabled
          ? 'cursor-default'
          : 'cursor-pointer'} {theme.dark(
          $compiledTheme,
          'range range-white',
          'range',
          rangeStyles[style]
        )} {rangeSizes[size]}"
      />
    </label>
  {/if}
</div>
