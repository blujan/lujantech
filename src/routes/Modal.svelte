<script lang="ts">
  import Icon from '$lib/Icons.svelte';
  import { createEventDispatcher, tick } from 'svelte';

  let show = false;
  let cancelButton: HTMLButtonElement;

  export let title = '';
  export let mini = false;

  let dialog: HTMLDialogElement;
  const dispatch = createEventDispatcher();

  const animationsComplete = (element: HTMLDialogElement) =>
    Promise.allSettled(element.getAnimations().map((animation) => animation.finished));

  function close() {
    dialog.close('close');
  }

  async function closeDialog() {
    show = false;
    let elm = document.getElementById('main');
    if (elm) {
      elm.style.transform = '';
      elm.style.opacity = '';
    }
    let { returnValue } = dialog;
    dispatch('closing', { returnValue });
    await animationsComplete(dialog);
    dispatch('closed', { returnValue });
  }

  export async function open() {
    let elm = document.getElementById('main');
    if (elm) {
      elm.style.transform = 'translateX(-200%)';
      elm.style.opacity = '0';
    }
    dialog.showModal();
    await animationsComplete(dialog);
    show = true;
    tick().then(() => cancelButton.focus());
  }
</script>

<dialog inert={!show} bind:this={dialog} on:close={closeDialog} on:cancel={closeDialog} class={$$props.class}>
  <header>
    <h2>{title}</h2>
    <button aria-label="Close dialog" on:click={close}>
      <Icon name="close" class="h-6 w-6" />
    </button>
  </header>
  <div class={mini ? 'grow-0' : 'grow'}>
    <slot />
  </div>
  <footer>
    <div class="my-2 grow">
      <slot name="footer" />
    </div>
    <div>
      <button
        bind:this={cancelButton}
        type="button"
        class="text-text_body border-2 border-accent border-opacity-40 bg-gray-700 rounded-md py-2 px-4 my-2 text-sm outline outline-0 outline-accent ring-accent hover:ring-2 hover:text-text_heading transition-all duration-300 shadow-md"
        on:click={close}>Close</button
      >
    </div>
  </footer>
</dialog>

<style lang="postcss">
  :global(html:has(dialog[open])) {
    overflow: hidden;
  }
  dialog {
    @apply inset-0 shadow-lg backdrop-blur-md overflow-hidden rounded-md max-w-screen-sm content-between flex flex-col fixed bg-opacity-50 bg-gray-600;
    @apply text-black mt-auto mb-auto;
    @apply border-t-[1px] border-t-white border-l-[1px] border-l-white border-opacity-10 border-b-gray-800 border-r-gray-800 border-b-[1px] border-r-[1px];
    @apply transition duration-500;

    & > header {
      @apply flex justify-between px-3 py-2 grow-0 items-center;
      & > h2 {
        @apply text-2xl font-[MPLUS1p-ExBold] text-text_heading tracking-tight;
      }
      & > button {
        @apply border hover:ring-2 ring-accent rounded-full aspect-square place-items-center stroke-white stroke-[3] bg-black bg-opacity-20 shadow-sm p-0 shrink-0 px-[0.25] border-gray-600 transition-all duration-300;
      }
    }
    & > div {
      @apply overflow-y-auto overscroll-y-contain bg-gray-900 opacity-70 z-10 shadow-modal border-t-[1px] border-t-white border-opacity-20 text-gray-200;
      &::-webkit-scrollbar {
        @apply bg-gray-900;
      }
    }
    & > footer {
      @apply flex flex-row justify-end px-4 pt-1 grow-0 text-text_heading gap-6;
    }
  }
  dialog::backdrop {
    @apply opacity-0 transition duration-200 inset-0 bg-background bg-cover bg-[url('/backgrounds/stacked-waves-haikei-modal.svg')];
  }
  dialog:not([open]) {
    pointer-events: none;
    opacity: 0;
  }
  dialog[open]::backdrop {
    @apply opacity-50 transition;
    animation: fade 0.2s ease-out;
  }
  button {
    display: block;
  }
</style>
