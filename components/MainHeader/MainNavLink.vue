<template>
  <nuxt-link 
    :to="{ path: `/${link}`}" 
    :title="title" 
    :exact="exact" 
    class="main-nav__link" 
    active-class="main-nav__link--active">{{ text }}</nuxt-link>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    exact: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@import '~assets/css/sass/import';

.main-nav__link {
  backface-visibility: hidden;
  color: color(main);
  display: block;
  padding: space(half, relative) space(full, relative);
  text-align: right;
  text-decoration: none;
  transition: transform 0.2s ease-out;
  z-index: 1;

  &:hover,
  &:focus {
    transform: skewY(-7deg);
  }

  &:visited {
    color: color(main);
  }

  /* @media(max-width: breakpoint(medium)) {
    border-top: 2px solid color(main);
    width: 50vw;
    min-width: 9rem;
    max-width: 12.5rem;
  } */

  &--active {
    font-weight: bold;
    position: relative;
    transform: skewY(-7deg);
  }
}
</style>
