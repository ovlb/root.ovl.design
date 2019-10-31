<template>
  <header
    class="main-header"
    aria-label="Hauptmenü"
  >
    <section class="skip-links">
      <a
        class="skip-link"
        href="#main-content"
      >
        Zum Hauptinhalt springen
      </a>
    </section>
    <nuxt-link
      :exact="true"
      class="main-header__logo"
      color="#0e0e0e"
      to="/"
      title="Zur Startseite"
      aria-hidden="true"
    >
      <ovl-logo />
    </nuxt-link>
    <main-nav />
  </header>
</template>

<script>
import OvlLogo from '~/components/OvlLogo.vue'
import MainNav from './MainNav.vue'

export default {
  components: {
    OvlLogo,
    MainNav
  }
}
</script>

<style lang="scss">
@import '~assets/css/sass/import';

.skip-link {
  position: absolute;
  transform: translate(-500%);
  transition: transform 0.2s ease-out;
  top: 0;
  left: 0;

  &:focus {
    transform: translate(0);
  }
}

.main-header {
  align-items: center;
  border-bottom: 1px solid color(main-light);
  box-shadow: shadow(lvl1);
  background-color: color(light);
  display: flex;
  height: var(--layout-header-height);
  padding: space(full, viewport) space(double, viewport);
  position: sticky;
  top: 0;
  z-index: 100;
}

.main-header__logo {
  max-width: 12rem;
  text-align: center;
  width: 50%;
}
</style>
