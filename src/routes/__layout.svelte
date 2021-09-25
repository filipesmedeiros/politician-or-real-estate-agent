<div class="outter">
  <div class="inner"><slot /></div>
</div>

<style lang="scss">
  .outter {
    display: flex;
    justify-content: center;
    width: 100%;

    .inner {
      $breakpoints: 320px, 540px, 768px, 1280px;
      @each $breakpoint in $breakpoints {
        @media screen and (min-width: $breakpoint) {
          max-width: $breakpoint;
        }
      }
    }
  }
</style>
