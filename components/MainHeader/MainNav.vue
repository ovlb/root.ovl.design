<template>
  <nav id="site-nav" class="main-nav" aria-label="Main">
    <nuxt-link
      :exact="true"
      class="u-is-visually-hidden"
      to="/"
      title="Zur Startseite"
      tabindex="-1"
    />
    <dynamic-anchor
      v-for="{ id, to, text, useNativeLinkElement } in links"
      :key="id"
      :to="to"
      :use-native-link-element="useNativeLinkElement"
      class="main-nav__link"
      active-class="main-nav__link--active"
    >
      {{ text }}
    </dynamic-anchor>
  </nav>
</template>

<script>
import DynamicAnchor from '@tournant/dynamic-anchor'

export default {
  components: {
    DynamicAnchor
  },
  data() {
    return {
      links: this.$store.state.mainNavLinks
    }
  }
}
</script>

<style lang="scss">
.main-nav {
  align-items: flex-start;
  display: flex;
  flex-flow: row wrap;
  font-size: var(--type-small);
  margin: 0 (-space(full, relative));
  position: relative;
  right: 0;
  // z-index: 100;
}

.main-nav__link {
  backface-visibility: hidden;
  color: var(--clr-accent);
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
    color: var(--clr-accent);
  }

  &--active {
    font-weight: bold;
    position: relative;
    transform: skewY(-7deg);
  }
}
</style>
