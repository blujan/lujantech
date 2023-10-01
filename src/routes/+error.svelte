<script lang="ts">
  import '../styles/styles.css';
  import { page } from '$app/stores';
</script>

<div class="fixed -z-10 grid h-screen w-full content-center items-center">
  <div>
    <video
      autoplay
      muted
      loop
      playsinline
      disablepictureinpicture
      class="min-h-[300px] min-w-full object-cover"
      aria-hidden="true"
    >
      <source src="/backgrounds/bg_error.mp4" type="video/mp4" />
    </video>
  </div>
</div>
<div
  class="grid h-screen w-full content-center items-center pl-5 pr-5 md:auto-cols-max md:grid-flow-col md:grid-cols-3"
>
  <div class="text-center font-[MPLUS1p-ExBold] md:text-left"><span class="text-8xl text-white">ERROR</span></div>
  <div class="text-center">
    {#if $page?.error}
      {#if $page?.status}
        <span class="text-6xl text-white">{$page.status}</span>
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
