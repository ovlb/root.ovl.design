<template>
  <footer
    class="site-footer"
    aria-label="Main Footer"
  >
    <section>
      <h3 class="sub-headline u-is-visually-hidden">Hello</h3>
      <p>
        Ich bin Oscar. Ich schreibe <a href="/code">Code</a>. Ich gestalte fürs Web und Print. Ich mag Eulen. Und das ist meine Website.
      </p>
    </section>
    <nav class="footer-nav">
      <nuxt-link
        v-for="item in navItems"
        :key="item.id"
        :to="item.slug"
        class="footer-nav__link"
        active-class="footer-nav__link--active"
      >{{ item.text }}</nuxt-link>
    </nav>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      navItems: 'footerNavLinks'
    })
  }
}
</script>

<style lang="scss">
@import '~assets/css/sass/import';

.site-footer {
  font-size: var(--type-small);
  margin-bottom: space(full, viewport);
  margin-top: space(double, viewport);
  display: flex;
  flex-flow: row wrap;
  padding: 2vmin;

  & > * {
    max-width: 15rem;
    margin: 0 auto;
  }
}

.footer-nav__link {
  display: block;
  text-decoration: none;

  &--active {
    font-weight: bold;
  }

  & + & {
    margin-top: space(half, relative);
  }
}

.name span {
  display: block;
}
</style>
