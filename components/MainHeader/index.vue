<template>
  <header class="main-header">
    <section class="skip-links">
      <a class="skip-link" href="#main-content"> Jump to main content </a>
    </section>
    <nuxt-link
      :exact="true"
      class="main-header__logo"
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
.skip-link {
  background-color: var(--clr-bg);
  padding: space(full, relative);
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
  border-bottom: 1px solid var(--clr-main-light);
  box-shadow: shadow(lvl1);
  background-color: var(--clr-bg);
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
