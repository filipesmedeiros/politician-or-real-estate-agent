<script lang="ts">
  import { onMount } from 'svelte'
  import { writable, derived, get } from 'svelte/store'

  import type { Item, ThemeTeams } from '$lib/types'
  import { getRandomItemIds, vote, getItem } from '$lib/api'
  import VoteButtons from '$lib/components/VoteButtons.svelte'
  import getUserId from '$lib/utils/getUserId'
  import { prefetchImg } from '$lib/utils/prefetchImg'

  let nextPictureIds = writable<string[]>([])
  let picture = writable<Item<'image', 'politician-x-real-estate-agent'>>()
  let nextPicture: Item<'image', 'politician-x-real-estate-agent'>
  let noAvailablePictures = derived(
    [nextPictureIds],
    ([nextPictureIds]) =>
      nextPictureIds !== undefined && nextPictureIds.length === 0,
  )
  let shouldRequestNewPictureIds = true

  let userId = writable<string>()
  let loading = derived(
    [picture, userId],
    ([picture, userId]) => picture === undefined || userId === undefined,
  )
  let correct = writable<boolean | undefined>(undefined)
  let readyToVote = derived(correct, correct => correct === undefined)
  let newCorrectPercentage: number
  let nextPictureTimeout = writable<NodeJS.Timeout | undefined>()
  let showProgressBar = derived(
    [nextPictureTimeout],
    ([nextPictureTimeout]) => nextPictureTimeout !== undefined,
  )

  const appendNewPictureIds = async () => {
    if ($nextPictureIds.length > 2 || !shouldRequestNewPictureIds) return

    const morePictureIds = await getRandomItemIds($userId)

    if (morePictureIds.length > 0)
      nextPictureIds.update(curr => [...curr, ...morePictureIds])
    else shouldRequestNewPictureIds = false
  }

  const prefetchNextPicture = async () => {
    await appendNewPictureIds()

    if ($nextPictureIds.length > 0) {
      nextPicture = await getItem($nextPictureIds.pop()!)
      prefetchImg(nextPicture.content.imageUrl)
    }
  }

  onMount(async () => {
    $userId = getUserId()

    await appendNewPictureIds()

    if ($nextPictureIds.length > 0) {
      $picture = await getItem($nextPictureIds.pop()!)
    }

    prefetchNextPicture()
  })

  const getNextPicture = async () => {
    stopAutoNext()
    $picture = nextPicture
    $correct = undefined

    prefetchNextPicture()
  }

  const stopAutoNext = () => {
    if ($nextPictureTimeout !== undefined) {
      clearTimeout($nextPictureTimeout)
      $nextPictureTimeout = undefined
    }
  }

  const voteOnPicture = async (
    team: ThemeTeams<'politician-x-real-estate-agent'>,
  ) => {
    const result = await vote({
      itemId: $picture.itemId,
      team,
      userId: $userId,
    })

    $correct = result.correct
    newCorrectPercentage = result.newCorrectPercentage

    $nextPictureTimeout = setTimeout(getNextPicture, 5e3)
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
{:else if $noAvailablePictures}
  No more available pictures
{:else}
  <div>
    <img
      class="image"
      src={$picture.content.imageUrl}
      alt="person to vote on"
    />
  </div>

  {#if $readyToVote}
    <VoteButtons
      voteForAgent={() => voteOnPicture('agent')}
      voteForPolitician={() => voteOnPicture('politician')}
      gender={$picture.themeInfo.gender}
    />
  {:else}
    <h2>{$correct ? 'Certo!' : 'Errado!'}</h2>
    <h3>{Math.round(newCorrectPercentage * 100)}%</h3>
    <button on:click={getNextPicture}>Próxima imagem</button>
    <a href={$picture.source} target="_blank" on:click={stopAutoNext}>Fonte</a>

    {#if $showProgressBar}<div
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
