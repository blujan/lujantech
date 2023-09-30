<script lang="ts">
  import '../styles/styles.css';
  import { page } from '$app/stores';
</script>

<div class="grid fixed items-center content-center h-screen w-full -z-10">
  <div>
    <video
      autoplay
      muted
      loop
      playsinline
      disablepictureinpicture
      class="object-cover min-h-[300px] min-w-full"
      aria-hidden="true"
    >
      <source src="/backgrounds/bg_error.mp4" type="video/mp4" />
    </video>
  </div>
</div>
<div
  class="grid md:grid-cols-3 md:grid-flow-col h-screen content-center w-full items-center md:auto-cols-max pl-5 pr-5"
>
  <div class="text-center md:text-left font-[MPLUS1p-ExBold]"><span class="text-white text-8xl">ERROR</span></div>
  <div class="text-center">
    {#if $page?.error}
      {#if $page?.status}
        <span class="text-white text-6xl">{$page.status}</span>
      {/if}
    {/if}
  </div>
  <div />
</div>

<style>
  :global(body) {
    @apply bg-black;
  }
</style>
