<script lang="ts">
  // External Components
  // @ts-ignore
  import Scroller from '@sveltejs/svelte-scroller';
  // @ts-ignore
  import Carousel from 'svelte-carousel';

  // Built-in
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import type { ComponentProps } from 'svelte';

  // Library functions
  import { decryptText } from '$lib/crypt';
  import { genGarbage } from '$lib/garbage';

  // Slots
  import Card from './Card.svelte';
  import Button from './Button.svelte';
  import Modal from './Modal.svelte';

  // Props
  import Icon from '$lib/Icons.svelte';

  // Import needed types
  type IconTypes = ComponentProps<Icon>;

  // Carousel images
  async function loadPhotos() {
    const images = import.meta.glob('$lib/photos/*.jpg');
    const promises = Array.from(Object.values(images), (promise) => promise());
    const data = await Promise.all(promises);
    // @ts-ignore
    return data.map((elm) => elm.default);
  }

  // Scrolly vars
  let index: number, offset: number, progress: number;

  // Modal/dialog vars
  let SVModal: Modal;
  let EmailModal: Modal;

  function updateColors(index: number) {
    if (typeof document !== 'undefined' && typeof index !== 'undefined') {
      let head = document.getElementsByTagName('html')[0];
      head.setAttribute('data-theme', index.toString());
    }
  }

  $: updateColors(index);

  // Checker vars
  let valid = false;
  let answer = '';
  let result = '';
  let answerIcon: IconTypes['name'] = 'lock';

  async function updateResult(ans: string) {
    let text = await decryptText(ans.trim());
    if (text === '') {
      valid = false;
      answerIcon = 'lock';
      result = genGarbage();
    } else {
      valid = true;
      result = text;
      answerIcon = 'check';
    }
  }

  onMount(() => {
    result = genGarbage();
  });

  $: updateResult(answer);

  function copyToClipboard() {
    navigator.clipboard.writeText(result).then(
      () => {
        console.log('copied');
      },
      () => {
        console.log('copy failed');
      }
    );
  }

  // Interests
  const interests = {
    'design & architecture': '',
    philosophy: 'row-span-2 md:row-span-1 md:col-span-2',
    music: '',
    photography: 'row-span-2 md:row-span-1',
    art: '',
    'vintage audio electronics': 'col-span-2',
    gardening: ''
  };
  const interestArray = Array.from(Object.keys(interests));

  let lastPick = -1;
  function updateBg() {
    if (interestArray.length === 0) return;
    if (typeof document === 'undefined') return;
    let pick;
    do {
      pick = Math.floor(Math.random() * interestArray.length);
    } while (pick === lastPick);
    if (lastPick !== -1) {
      let lastElm = document.getElementById('interest-' + interestArray[lastPick]);
      if (!lastElm) return;
      lastElm.style.backgroundColor = '';
    }
    let elm = document.getElementById('interest-' + interestArray[pick]);
    if (!elm) return;
    elm.style.backgroundColor = 'rgb(var(--color-accent) / 0.6)';
    lastPick = pick;
  }
  setInterval(updateBg, 2000);
</script>

<svelte:head>
  <title>Brennan Lujan</title>
  <meta name="description" content="Brennan Lujan Landing Page" />
</svelte:head>

<article id="main" class="transition duration-500">
  <div class="grid grid-rows-1 grid-cols-2 md:grid-cols-3 fixed top-0 w-screen z-20 mr-4">
    <div class="" />
    <div
      class="bg-primary px-5 min-h-fit py-2 bg-opacity-90 shadow-md backdrop-blur-sm rounded-b-md name-header mr-5 min-w-full md:min-w-fit md:max-w-lg col-span-2"
    >
      <div class="flex flex-auto flex-row items-center w-full place-content-between">
        <div
          class="text-2xl text-text_heading align-middle font-['MPLUS1p-ExBold'] tracking-tight whitespace-nowrap md:mr-10"
        >
          <h1>Brennan Lujan</h1>
        </div>
        <div class=" grid grid-flow-col grow justify-end gap-7">
          <div class="place-content-center grid text-center">
            <button class="group cursor-pointer" on:click={() => EmailModal.open()}>
              <Icon
                name="email"
                class="h-6 w-6 fill-accent transition group-hover:invert duration-300 drop-shadow-sm"
              />
            </button>
          </div>
          <div class="place-content-center grid text-center">
            <a class="group" href="https://www.linkedin.com/in/bl-ce-eng">
              <Icon
                name="linkedin"
                aria-label="Follow on LinkedIn"
                class="h-6 w-6 fill-accent transition group-hover:invert duration-300 drop-shadow-sm"
              />
            </a>
          </div>
          <div class="place-content-center grid text-center">
            <a class="group" href="https://github.com/blujan">
              <Icon
                name="github"
                aria-label="Follow on GitHub"
                class="h-6 w-6 fill-accent transition group-hover:invert duration-300 drop-shadow-sm"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    id="background-shade"
    class="transition duration-1000 fixed left-[12%] md:left-[42%] bottom-0 w-[300px] min-h-full z-[4] bg-secondary bg-opacity-25"
  />
  <video
    autoplay
    muted
    loop
    playsinline
    disablepictureinpicture
    class="fixed left-[12%] md:left-[42%] bottom-0 min-w-[300px] min-h-full z-[3] object-cover"
    aria-hidden="true"
  >
    <source src="/backgrounds/bg_waves.webm" type="video/webm" />
    <source src="/backgrounds/bg_waves.mp4" type="video/mp4" />
  </video>
  <Scroller top={0} bottom={1} bind:index bind:offset bind:progress>
    <div slot="background" />
    <div slot="foreground" class="bg-background bg-cover bg-[url('/backgrounds/layered-waves-haikei.svg')]">
      <div class="grid grid-rows-1 grid-cols-2 md:grid-cols-3 mr-4">
        <div class="" />
        <div class="grid grid-cols-1 gap-52 col-span-2 after:shrink-0 after:h-[20vh] md:after:h-[40vh]">
          <Card transparent={false} id={'section-0'} next={'section-1'}>
            <div class="flex place-content-center -mt-4 -mx-4 z-30">
              <img src="images/portrait.jpg" alt="portrait" class="h-[20rem] w-full object-cover" />
            </div>
            <p class="text-left mt-6 mb-6">
              <span class="text-lg tracking-tight text-text_heading">Senior Firmware Engineer</span><br />
              Over 20 years of technical experience
            </p>
            <hr class="bg-accent border-0 h-px" />
            <p class="text-base my-4 text-text_heading tracking-tight">Interests Also Include</p>
            <div
              class="grid grid-cols-2 md:grid-cols-3 text-sm mb-6 gap-4 grid-flow-dense leading-6 tracking-wider text-center"
            >
              {#each Object.entries(interests) as item}
                <div
                  id="interest-{item[0]}"
                  class="place-content-center grid py-2 bg-secondary bg-opacity-90 rounded-3xl hover:bg-accent transition duration-1000 {item[1]}"
                >
                  {item[0]}
                </div>
              {/each}
            </div>
            <hr class="bg-accent border-0 h-px" />
            <p class="text-base my-4 text-text_heading tracking-tight">Alma Mater</p>
            <div class="ml-4 mb-8">
              <p class="mb-4">
                <span class="tracking-tight">UC Santa Cruz</span><br />
                <span class="text-sm">Bachelor of Science, Computer Engineering</span>
              </p>
              <p>
                University of Southern California<br />
                <span class="text-sm">Master of Science, Computer Engineering</span>
              </p>
            </div>
          </Card>

          <Card title={'program.'} id={'section-1'} next={'section-2'}>
            <p class="text-sm text-justify mb-8 leading-relaxed">
              I have been asked how many programming languages I've learned over the years and struggle to answer. In my
              teens, I taught myself enough to start building small Windows apps using Visual Basic (the original, not
              .NET) then moving on to HTML and building websites (why yes, I did fully hand-code my Geocities page).
              From programming night classes in C and C⁺⁺ during high school, the professor was impressed enough to
              offer me a summer job where I then learned Perl. From there, I learned various shell scripts doing systems
              administration, and then kept expanding my knowledge base outwards. For the last while, I've been firmly
              in the world of C and Python professionally, but lately I keep getting drawn back towards Rust for
              personal projects.
            </p>
            <Button url="https://github.com/blujan">
              <Icon
                name="github"
                slot="icon"
                aria-label="My Github Profile"
                class="h-10 w-10 fill-accent group-hover:invert duration-300 transition stoke-none drop-shadow-md"
              />
              GitHub Profile
              <svelte:fragment slot="tooltip">DRY does not apply to this button</svelte:fragment>
            </Button>
            <br />
            <Button url="https://leetcode.com/TwoNoughts">
              <Icon
                name="leetcode"
                slot="icon"
                aria-label="My Leetcode Profile"
                class="h-10 w-10 fill-accent group-hover:invert duration-300 transition stoke-none drop-shadow-md"
              />
              Leetcode Profile
              <svelte:fragment slot="tooltip">Because why not</svelte:fragment>
            </Button>
          </Card>

          <Card title={'words.'} id={'section-2'} next={'section-3'}>
            <blockquote class="border-l-gray-400 border-opacity-40 border-l-[1px] pl-4 mb-8">
              <p class="text-sm italic text-left leading-relaxed">
                "A word could be silent. A word could make a noise, like a ghost. There it is. There it isn't. It's
                true! It's the truth! It's all made up, it's a lie. You believe it, you don't believe it- It exists, it
                does not exist. To write the perfect sentence, you need to understand how these noisy, speechless ghosts
                haunt the mind and pollute reality, making it what it is: Tremendous trouble-a crazy hash. A mass of
                illusions and transparent surfaces, and provisional certainties, and exploded schemes, and cagey
                personalities, and monstrous visions, and idle talk, and exotic disintegrations, and charming things,
                and sleazy genius, and social conjunctions, and obscene gestures, and helpless love, and implausible
                incidents, and sinister ambiguities, and shattered windows, and extended anecdotes, and plussed
                vulgarities, and subtle enslavements, and strong opinions, and absurd remarks in newspaper scandals, and
                giddy menace, and grand, booming nonsense, and mad, gloomy farce, and indescribable events."
                <cite class="not-italic">
                  &mdash; Excerpt from "Lost for Words: The Ghost of Sir Arthur Rimbaud" by Paul Morley</cite
                >
              </p>
            </blockquote>
            <Button url={'https://words.lujan.tech'}>
              <Icon
                name="write_freely"
                slot="icon"
                class="h-10 w-10 fill-accent group-hover:invert duration-300 transition stoke-none align-middle drop-shadow-md"
              />
              WriteFreely Blog
            </Button>
          </Card>

          <Card title={'images.'} id={'section-3'} next={'section-4'}>
            {#if browser}
              <div id="section-3" class="mb-6 shadow-md rounded-lg pr-0">
                {#await loadPhotos() then photos}
                  <Carousel
                    autoplay
                    autoplayDuration={5000}
                    autoplayProgressVisible
                    dots={false}
                    arrows={false}
                    let:loaded
                  >
                    {#each photos as photo, index (photo)}
                      <div>
                        {#if loaded.includes(index)}
                          <img src={photo} alt="Carousel" class="rounded-lg" />
                        {/if}
                      </div>
                    {/each}
                  </Carousel>
                {/await}
              </div>
            {/if}
            <p class="text-sm mb-8 text-justify leading-relaxed">
              I've had a camera in my hand since I was kid, and I somehow still have the pictures to prove it. It
              started more as a travel log - the simple capturing of a place. That morphed into figuring out how to
              capture the feeling of a place, and then how to tell the story of that feeling, and then maybe the story
              of that feeling's dreams.
            </p>
            <Button url={'https://flickr.com/photos/198819681@N05'}>
              <Icon
                name="flickr"
                slot="icon"
                class="h-10 w-10 transition duration-300 fill-accent group-hover:invert drop-shadow-md"
                aria-hidden="true"
              />
              Photos (current &mdash; 2023)
            </Button>
            <br />
            <Button url={'https://flickr.com/photos/72391407@N07'}>
              <Icon
                name="flickr"
                slot="icon"
                class="h-10 w-10 transition duration-300 fill-accent group-hover:invert drop-shadow-md"
                aria-hidden="true"
              />
              Photo Archive (2020 &mdash; 2011)
            </Button>
          </Card>

          <Card title={'previous works.'} id={'section-4'}>
            <p class="text-sm text-justify mb-8 leading-relaxed">
              Most of my work isn't public facing, let alone my best work, but if it was public, I'll put it here.
            </p>
            <button class="group cursor-pointer mb-8" on:click={() => SVModal.open()}>
              <span class="inline-flex items-center gap-4">
                <Icon
                  name="grave_with_flowers"
                  class="h-10 w-10 transition duration-300 fill-accent group-hover:invert drop-shadow-md"
                />
                <span class="text-sm align-middle slide-hover p-0.5 duration-300 group-hover:slide-hover-active">
                  Smith &amp; Vandiver Website, 2006
                </span>
              </span>
            </button>
          </Card>
        </div>
      </div>
    </div>
  </Scroller>
  <section>
    <!-- Safari doesn't like these anywhere but at the bottom of the page -->
    <Modal bind:this={SVModal} title={'Smith & Vandiver, 2006'} class="h-3/4">
      <img
        src="/images/SVPage.png"
        alt="Capture of Smith & Vandiver website"
        class="shadow-lg mb-6 mt-6 object-none w-full h-60 place-content-center object-left-top"
      />
      <p class="mb-2 text-sm text-justify leading-relaxed px-6">
        The year was 2005, and while Wordpress had already existed for a few years, it had yet to reach a level of
        maturity to make e-commerce websites both easy and inexpensive that would soon make it ubiquitous. As such, if
        you wanted a website, you either paid a developer to custom build it or paid for an expensive and often
        inflexible "canned" framework. Aside from myself, Smith &amp; Vandiver also had an in-house art department. So
        opting for the former, we collaborated on the final design before I implemented all the technical details. This
        was built to enable online ordering for both wholesale and retail customers with the ability to add and remove
        products, along with images and descriptions. What you won't see on the Internet Archive link is that I also
        built an entire backend page to edit just about every property on the website so that it could then be
        maintained by the art department and office staff.
      </p>
      <p class="mb-2 text-sm text-justify leading-relaxed px-6">
        The website was built from PHP5 to dynamically generate HTML along with a static CSS template while the backend
        was Apache and MySql. Javascript is completely absent from the website, but AJAX wasn't really a thing yet aside
        from a few things like Google Maps, which had just gone live that year. So, this was still the norm for the
        soon-to-end era of Javascript-free websites. I was also responsible for the setup, configuration, and
        maintenance of the server (which was FreeBSD if memory serves) along with the firewall to properly DMZ the
        service.
      </p>
      <p class="mb-2 text-sm text-justify leading-relaxed px-6">
        It went live in early 2006, and near as a I tell, was up until mid 2010, three years after I left the company.
        Though, I'm pretty sure my voice was up on the company's main IVR for longer.
      </p>
      <svelte:fragment slot="footer">
        <Button url="https://web.archive.org/web/20060402230033/http://smith-vandiver.com:80/">
          <Icon
            name="arrow_pixel_right"
            slot="icon"
            aria-hidden="true"
            class="h-8 w-8 transition duration-300 fill-accent group-hover:invert drop-shadow-md"
          />
          Internet Archive Link
        </Button>
      </svelte:fragment>
      <br />
    </Modal>
  </section>
  <section>
    <Modal bind:this={EmailModal} mini={true}>
      <div class="flex flow-row mt-4 px-6 content-center gap-4">
        <div>
          <Icon name="no_robot" class="h-16 w-16 md:h-32 md:w-32 stroke-accent drop-shadow-md opacity-90" />
        </div>
        <div class="flex justify-center items-center">
          <div>
            <p class="text-lg md:text-xl font-['MPLUS1p-ExBold'] mb-2 tracking-tight text-text_heading">
              Well hang on there
            </p>
            <p class="text-sm leading-relaxed">
              I have to deal with machines enough in my day to day life, and I'm not sure I need to be talking to more
              of them. So I need to ask you something a machine couldn't possibly know.
            </p>
            <span class="text-center text-sm leading-relaxed italic">What's two to the seventh power?</span>
          </div>
        </div>
      </div>
      <div class="grid gap-4 mt-4 px-6 w-full mb-6">
        <div class="text-right">
          <form class="group relative">
            <Icon
              name="equals_sign"
              aria-hidden="true"
              class="h-5 w-5 absolute left-3 top-1/2 -mt-2.5 pointer-events-none group-focus-within:text-gray-400 stroke-none fill-neutral-500"
            />
            <input
              type="text"
              id="answer"
              maxlength="8"
              size="10"
              placeholder="answer"
              class="rounded-md border-2 focus:ring-1 focus:ring-accent focus:outline-none leading-6 placeholder-gray-600 shadow-sm w-full pl-10 text-neutral-900"
              bind:value={answer}
            />
          </form>
        </div>
        <div class="w-full border-2 shadow-sm rounded-md bg-neutral-100 px-2">
          <span class="inline-flex items-center gap-4 w-full mt-1">
            <Icon name={answerIcon} class="h-6 w-6 {valid ? 'fill-green-500' : 'fill-red-500'}" />
            <span class="grow text-right slide-hover hover:slide-hover-active duration-300 p-0.5 text-black">
              <a href="mailto:{result}" class="tracking-wide overflow-clip">{result}</a>
            </span>
            <button class="flex-none fill-accent active:invert opacity-75" on:click={() => copyToClipboard()}>
              <Icon name="clipboard" class="h-6 w-6" />
            </button>
          </span>
        </div>
      </div>
    </Modal>
  </section>
</article>

<style>
  :global(svelte-scroller-foreground) {
    z-index: unset !important;
  }
</style>
