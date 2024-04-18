<script lang="ts">
  import { getTheme } from "@okcontract/uic";

  const theme = getTheme();
  const compiledTheme = theme?.compiled;
</script>

<div class="p-4">
  <div class="w-full flex justify-center my-4">
    <span class="loading loading-spinner loading-lg"></span>
  </div>
  <div
    class="text-lg leading-6 font-semibold w-full flex justify-center mb-2 {theme.dark(
      $compiledTheme,
      'text-white',
      'text-black',
      'text-base-content'
    )}"
  >
    Loading...
  </div>
</div>
