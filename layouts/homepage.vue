<template>
  <div class="homepage"><nuxt /></div>
</template>

<style lang="scss">
.homepage {
  background-color: color(main);
  color: color(light);
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
      outline: 2px dotted color(light);
    }
  }

  ::selection {
    background-color: color(light);
    color: color(main);
  }
}
</style>
