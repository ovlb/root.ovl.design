<template>
  <div class="homepage">
    <nuxt />
  </div>
</template>

<style lang="scss">
@import '~assets/css/sass/import';

.homepage {
  background-color: color(main);
  color: color(light);
  min-height: 100vh;
  width: 100vw;

  & p {
    font-size: var(--type-medium);
    text-indent: 0;
  }

  & a {
    color: currentColor;

    &:focus {
      outline: 2px dotted color(light);
    }
  }
}
</style>
