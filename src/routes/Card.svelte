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
      block: 'center'
    });
  }
</script>

<CardOuter {transparent}>
  {#if title !== ''}
    <h2 class="text-3xl mb-6 mt-2 tracking-tight text-text_heading font-[MPLUS1p-Light]">{title}</h2>
  {/if}
  {#if id !== ''}
    <div {id} />
  {/if}
  <slot />
  {#if next !== ''}
    <div class="flex place-content-center mt-4">
      <button on:click|preventDefault={() => scrollIntoView(next)}>
        <Icon
          name="down_arrow"
          aria-hidden="true"
          class="h-8 w-8 stroke-accent hover:invert transition duration-300 drop-shadow-md"
        />
      </button>
    </div>
  {:else}
    <div class="flex place-content-center mt-4">
      <Icon name="square" aria-hidden="true" class="h-4 w-4 stroke-none fill-accent drop-shadow-md" />
    </div>
  {/if}
</CardOuter>
