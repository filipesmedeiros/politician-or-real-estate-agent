<script lang="ts">
  import type { Gender } from '$lib/types'

  export let voteForAgent: () => void
  export let voteForPolitician: () => void

  export let gender: Gender
  $: suffix = gender === null ? '@' : gender === 'male' ? 'O' : 'A'
</script>

<div class="wrapper">
  <button on:click={voteForAgent} class="vote-button vote-agent">
    <div>AGENTE</div>
  </button>
  <button on:click={voteForPolitician} class="vote-button vote-politician"
    ><div>POLÍTIC{suffix}</div>
  </button>
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    justify-content: center;
    gap: 1.5rem;

    margin-top: 1rem;
  }

  .vote-button {
    padding: 1rem 2.5rem;
    font-size: 3rem;
    line-height: 1;
    color: white;
    border: none;
    font-weight: 800;
    letter-spacing: 2px;
    border-radius: 3px;

    transition: transform 0.15s ease;

    &:hover {
      cursor: pointer;

      transform: skewX(-45deg) scale(1.1);
      z-index: 1000;
    }

    transform: skewX(-45deg);
    div {
      transform: skewX(45deg);
    }
  }

  .vote-agent {
    background: linear-gradient(45deg, rgb(15, 47, 153) 0%, rgba(0, 212, 255, 1) 100%);
  }

  .vote-politician {
    background: linear-gradient(45deg, rgb(255, 60, 0) 0%, rgb(153, 15, 15) 100%);
  }
</style>
