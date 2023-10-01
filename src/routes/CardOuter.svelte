<script lang="ts">
  export let transparent = true;
</script>

<section>
  {#if transparent}
    <div
      class="ml-5 max-w-md rounded-md bg-primary p-0 text-neutral-200 shadow-lg shadow-gray-600/50 transition duration-700"
    >
      <div
        class="relative z-10 max-w-md rounded-md border-b-[1px] border-l-[1px] border-r-[1px] border-t-[1px] border-b-gray-800 border-l-white border-r-gray-800 border-t-white border-opacity-10 bg-primary bg-opacity-50 p-4 text-text_body backdrop-blur-md transition duration-700 selection:bg-accent selection:text-accent_text"
      >
        <slot />
      </div>
    </div>
  {:else}
    <div
      class="relative z-10 ml-5 mt-48 max-w-md overflow-hidden rounded-md border-b-[1px] border-l-[1px] border-r-[1px] border-t-[1px] border-b-gray-800 border-l-white border-r-gray-800 border-t-white border-opacity-10 bg-primary p-4 text-text_body shadow-md transition duration-700 selection:bg-accent selection:text-accent_text md:mt-80"
    >
      <slot />
    </div>
  {/if}
</section>
