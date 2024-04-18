<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import {
    inputStyles,
    type InputStyle,
    inputSizes,
    type InputSize,
    labelStyles,
    type LabelStyle
  } from "@okcontract/uic";

  export let label: string = undefined;
  export let value: string = "";
  export let name: string = undefined;
  export let type: string = "text";
  export let placeholder: string = undefined;
  export let required: boolean = false;
  export let pattern: RegExp = undefined;
  export let validatorHelp: string = "Invalid input";
  export let error: string = undefined;

  export let styleLabel: LabelStyle = "default";
  export let style: InputStyle = "default";
  export let size: InputSize = "md";

  let touched: boolean = false;

  const update = (ev: Event) => {
    touched = true;
    value = (ev.target as any).value; // FIXME
    dispatch("input", ev);
  };

  const invalidInput = () => {
    if (required && touched && pattern !== undefined && value !== undefined) {
      return !pattern.test(value);
    }
    return false;
  };
</script>

<!-- pattern={pattern && pattern.toString && pattern.toString()} -->
<label class="form-control w-full" for={name}>
  {#if label}
    <div class="label">
      <span class={labelStyles[styleLabel]}>{label}</span>
    </div>
  {/if}

  <input
    {value}
    on:input={update}
    aria-label={label}
    {type}
    pattern={pattern?.source}
    {required}
    {placeholder}
    class="{inputStyles[style]} {inputSizes[size]} {error ||
    (required && touched && value !== undefined && value.trim().length == 0)
      ? 'input-error'
      : ''} grow"
  />
  {#if required && touched && value !== undefined && value.trim().length == 0}
    <div class="label">
      <span class="label-text-alt text-error">Please fill out this field</span>
    </div>
  {:else if invalidInput()}
    <div class="label">
      <span class="label-text-alt text-info">{validatorHelp}</span>
    </div>
  {:else if error !== undefined}
    <div class="label">
      <span class="label-text-alt text-error">{error}</span>
    </div>
  {/if}
</label>
