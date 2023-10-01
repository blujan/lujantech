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
        class="my-2 rounded-md border-2 border-accent border-opacity-40 bg-gray-700 px-4 py-2 text-sm text-text_body shadow-md outline outline-0 outline-accent ring-accent transition-all duration-300 hover:text-text_heading hover:ring-2"
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
    @apply fixed inset-0 flex max-w-screen-sm flex-col content-between overflow-hidden rounded-md bg-gray-600 bg-opacity-50 shadow-lg backdrop-blur-md;
    @apply mb-auto mt-auto text-black;
    @apply border-b-[1px] border-l-[1px] border-r-[1px] border-t-[1px] border-b-gray-800 border-l-white border-r-gray-800 border-t-white border-opacity-10;
    @apply transition duration-500;

    & > header {
      @apply flex grow-0 items-center justify-between px-3 py-2;
      & > h2 {
        @apply font-[MPLUS1p-ExBold] text-2xl tracking-tight text-text_heading;
      }
      & > button {
        @apply aspect-square shrink-0 place-items-center rounded-full border border-gray-600 bg-black bg-opacity-20 stroke-white stroke-[3] p-0 px-[0.25] shadow-sm ring-accent transition-all duration-300 hover:ring-2;
      }
    }
    & > div {
      @apply z-10 overflow-y-auto overscroll-y-contain border-t-[1px] border-t-white border-opacity-20 bg-gray-900 text-gray-200 opacity-70 shadow-modal;
      &::-webkit-scrollbar {
        @apply bg-gray-900;
      }
    }
    & > footer {
      @apply flex grow-0 flex-row justify-end gap-6 px-4 pt-1 text-text_heading;
    }
  }
  dialog::backdrop {
    @apply inset-0 bg-background bg-[url('/backgrounds/stacked-waves-haikei-modal.svg')] bg-cover opacity-0 transition duration-200;
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
