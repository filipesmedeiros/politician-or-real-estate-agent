<script lang="ts">
  import { onMount } from 'svelte'
  import { writable, derived } from 'svelte/store'

  import { getRandomPicture, vote } from '$lib/api'
  import type { Picture, Profession } from '$lib/types'
  import VoteButtons from '$lib/components/VoteButtons.svelte'
  import getUserId from '$lib/utils/getUserId'
  import { prefetchImg } from '$lib/utils/prefetchImg'

  let picture = writable<Picture>()
  let userId = writable<string>()
  let loading = derived(
    [picture, userId],
    ([picture, userId]) => picture === undefined || userId === undefined,
  )
  let correct = writable<boolean | undefined>(undefined)
  let readyToVote = derived(correct, correct => correct === undefined)
  let newCorrectPercentage: number
  let autoNextPicture = true
  let nextPictureTimeout: NodeJS.Timeout
  let nextPicture: Picture

  const getRandomPictureForUser = () =>
    getRandomPicture($userId).then(randomPicture => {
      $picture = randomPicture
    })

  const prefetchNextPicture = async () => {
    const randomPicture = await getRandomPicture($userId)
    prefetchImg(randomPicture.imageUrl)
    nextPicture = randomPicture
  }

  onMount(async () => {
    $userId = getUserId()
    prefetchNextPicture()
    await getRandomPictureForUser()
  })

  $: {
    if (!autoNextPicture && nextPictureTimeout !== undefined)
      clearTimeout(nextPictureTimeout)
  }

  const getNextPicture = async () => {
    $picture = nextPicture
    $correct = undefined
    autoNextPicture = true
    prefetchNextPicture()
  }

  const stopAutoNext = () => {
    autoNextPicture = false
  }

  const voteOnPicture = async (profession: Profession) => {
    const result = await vote({
      pictureId: $picture.pictureId,
      profession,
      userId: $userId,
    })

    $correct = result.correct
    newCorrectPercentage = result.newCorrectPercentage

    nextPictureTimeout = setTimeout(getNextPicture, 5e3)
  }
</script>

<h1>
  <span class="politician">Polític@</span>
  <br />
  <span class="or">ou</span>
  <br />
  <span class="real-estate-agent">Agente Imobiliári@</span>
</h1>
{#if $loading}
  Loading
{:else}
  <div>
    <img class="image" src={$picture.imageUrl} alt="person to vote on" />
  </div>

  {#if $readyToVote}
    <VoteButtons
      voteForAgent={() => voteOnPicture('agent')}
      voteForPolitician={() => voteOnPicture('politician')}
      gender={$picture.gender}
    />
  {:else}
    <h2>{$correct ? 'Certo!' : 'Errado!'}</h2>
    <h3>{Math.round(newCorrectPercentage * 100)}%</h3>
    <button on:click={getNextPicture}>Próxima imagem</button>
    <a href={$picture.infoSource} target="_blank" on:click={stopAutoNext}
      >Fonte</a
    >

    {#if autoNextPicture}<div
        class="progress-bar"
        class:correct={$correct}
      />{/if}
  {/if}
{/if}

<style lang="scss">
  h1 {
    text-align: center;
    line-height: 1;

    .or {
      font-size: smaller;
    }

    .politician {
      color: blue;
    }

    .real-estate-agent {
      color: rgb(149, 18, 18);
    }
  }

  .image {
    height: 500px;
  }

  @keyframes progress-animation {
    from {
      width: 500px;
    }

    to {
      width: 0;
    }
  }

  .progress-bar {
    height: 2px;
    background-color: rgb(255, 45, 91);

    animation: progress-animation 5s linear;

    &.correct {
      background-color: rgb(61, 255, 110);
    }
  }
</style>
