<script lang="ts">
  export let transparent = true;
</script>

<section>
  {#if transparent}
    <div
      class="max-w-md ml-5 bg-primary p-0 rounded-md text-neutral-200 transition duration-700 shadow-lg shadow-gray-600/50"
    >
      <div
        class="max-w-md bg-primary p-4 rounded-md bg-opacity-50 z-10 backdrop-blur-md relative transition duration-700 text-text_body selection:bg-accent selection:text-accent_text border-t-[1px] border-t-white border-l-[1px] border-l-white border-opacity-10 border-b-gray-800 border-r-gray-800 border-b-[1px] border-r-[1px]"
      >
        <slot />
      </div>
    </div>
  {:else}
    <div
      class="max-w-md shadow-md ml-5 bg-primary rounded-md z-10 p-4 relative transition duration-700 text-text_body selection:bg-accent selection:text-accent_text border-t-[1px] border-t-white border-l-[1px] border-l-white border-opacity-10 border-b-gray-800 border-r-gray-800 border-b-[1px] border-r-[1px] overflow-hidden mt-48 md:mt-80"
    >
      <slot />
    </div>
  {/if}
</section>
