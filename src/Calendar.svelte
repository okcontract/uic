<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";

  import {
    ThemeText,
    getTheme,
    type InputStyle,
    inputStyles,
    type InputSize,
    inputSizes,
    Icon
  } from "@okcontract/uic";

  export let style: InputStyle = "bordered";
  export let size: InputSize = "md";
  export let time: string | Date;
  export let dayOnly: boolean = false;
  export let disabled: boolean = false;

  const theme = getTheme();
  const compiledTheme = theme?.compiled;

  let date: string;
  let hour: number;
  let minute: number;
  //   let calendar;

  onMount(() => {
    // console.log("Calendar", time);
    const stamp = time instanceof Date ? time : new Date(Date.parse(time));
    const day = stamp.getDate();
    const month = stamp.getMonth(); //Be careful! January is 0 not 1
    const year = stamp.getFullYear();
    date =
      year +
      "-" +
      (month + 1).toString().padStart(2, "0") +
      "-" +
      day.toString().padStart(2, "0");
    hour = stamp.getHours();
    minute = stamp.getMinutes();
  });

  const dispatch = createEventDispatcher();
  const update = () => {
    dispatch("update", { date, minute, hour });
  };
</script>

<div class="flex flex-col gap-2">
  <label
    class="{theme.dark(
      $compiledTheme,
      `${inputStyles[`${style}-ghost`]}`,
      `${inputStyles[`${style}-ghost`]}`,
      `${inputStyles[style]}`
    )} {inputSizes[size]} flex items-center gap-2 w-40 justify-center"
    style={theme.apply($compiledTheme, [ThemeText])}
  >
    <input type="date" {disabled} bind:value={date} on:input={update} />
  </label>
  {#if !dayOnly}
    <label
      class="{theme.dark(
        $compiledTheme,
        `${inputStyles[`${style}-ghost`]}`,
        `${inputStyles[`${style}-ghost`]}`,
        `${inputStyles[style]}`
      )} {inputSizes[size]} flex items-center gap-2 w-40 justify-center"
      style={theme.apply($compiledTheme, [ThemeText])}
    >
      <Icon name="clock-o" size="xs" />
      <input
        type="number"
        value={hour}
        max={23}
        min={0}
        class="w-8"
        placeholder="00"
      /><span class="mr-4">:</span><input
        type="number"
        value={minute}
        max={59}
        min={0}
        class="w-8"
        placeholder="00"
      />
    </label>
  {/if}
</div>
