<script>
  export let url = '';
</script>

<a class="group" href={url}>
  <span class="inline-flex items-center gap-4">
    <span class="flex-none">
      <slot name="icon" />
    </span>
    <span class="text-sm align-middle slide-hover p-0.5 duration-300 group-hover:slide-hover-active flex-none">
      <slot />
    </span>
    {#if $$slots.tooltip}
      <div
        class="bg-accent rounded-lg p-2 text-accent_text tooltip group-hover:tooltip-hover-active transition-all duration-500 text-xs delay-150"
      >
        <slot name="tooltip" />
      </div>
    {/if}
  </span>
</a>
