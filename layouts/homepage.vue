<template>
  <div class="homepage"><nuxt /></div>
</template>

<style lang="scss">
.homepage {
  background-color: var(--clr-main);
  color: var(--clr-light);
  min-height: 100vh;
  width: 100vw;

  & p {
    font-size: var(--type-medium);
    margin-bottom: space(half, relative);
    text-indent: 0;
  }

  & a {
    color: currentColor;

    &:focus {
      outline: 2px dotted var(--clr-fg);
    }
  }

  ::selection {
    background-color: var(--clr-fg);
    color: var(--clr-accent);
  }
}
</style>
