<script>
  export let url = '';
</script>

<a class="group" href={url}>
  <span class="inline-flex items-center gap-4">
    <span class="flex-none">
      <slot name="icon" />
    </span>
    <span class="slide-hover group-hover:slide-hover-active flex-none p-0.5 align-middle text-sm duration-300">
      <slot />
    </span>
    {#if $$slots.tooltip}
      <div
        class="tooltip group-hover:tooltip-hover-active rounded-lg bg-accent p-2 text-xs text-accent_text transition-all delay-150 duration-500"
      >
        <slot name="tooltip" />
      </div>
    {/if}
  </span>
</a>
