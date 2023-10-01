<script lang="ts">
  import CardOuter from './CardOuter.svelte';
  import Icon from '$lib/Icons.svelte';
  export let title = '';
  export let transparent = true;
  export let id = '';
  export let next = '';

  function scrollIntoView(target: string) {
    const el = document.getElementById(target);
    if (!el) return;
    el.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'center',
    });
  }
</script>

<CardOuter {transparent}>
  {#if title !== ''}
    <h2 class="mb-6 mt-2 font-[MPLUS1p-Light] text-3xl tracking-tight text-text_heading">{title}</h2>
  {/if}
  {#if id !== ''}
    <div {id} />
  {/if}
  <slot />
  {#if next !== ''}
    <div class="mt-4 flex place-content-center">
      <button on:click|preventDefault={() => scrollIntoView(next)}>
        <Icon
          name="down_arrow"
          aria-hidden="true"
          class="h-8 w-8 stroke-accent drop-shadow-md transition duration-300 hover:invert"
        />
      </button>
    </div>
  {:else}
    <div class="mt-4 flex place-content-center">
      <Icon name="square" aria-hidden="true" class="h-4 w-4 fill-accent stroke-none drop-shadow-md" />
    </div>
  {/if}
</CardOuter>
