<template>
  <main class="homepage-content">
    <h1 class="title">
      <logo color="#f8f2e3" />
    </h1>
    <nav class="index-nav">
      <nuxt-link
        to="/texte"
        class="index-nav-link"
      >Texte</nuxt-link>
    </nav>
    <p
      class="c-main-content__p"
      v-html="introText"
    />
    <section class="o-social-logos">
      <a
        href="https://twitter.com/_ovlb"
        title="Oscar’s Twitter profile"><img
          src="~assets/img/twitter.png"
          alt="Twitter logo"
          class="c-social-logos__logo"></a>
      <a
        href="https://github.com/ovlb"
        title="Oscar’s GitHub profile"><img
          src="~assets/img/github.png"
          alt="GitHub logo"
          class="c-social-logos__logo"></a>
      <a
        href="https://keybase.io/ovlb"
        title="Oscar on Keybase"><img
          src="~assets/img/keybase.svg"
          alt="Twitter logo"
          class="c-social-logos__logo"></a>
    </section>
  </main>
</template>

<script>
import Logo from '~/components/OvlLogo.vue'

export default {
  layout: 'homepage',
  components: {
    Logo
  },
  data() {
    return {
      introText:
        'I am Oscar. I design for web and print. I care about accessibility, usability &amp; performance. I am typophile. I like to think. And owls. If you want to get in touch, <a href="mailto:o@ovl.design" title="Oscar’s E-mail">drop me a line</a> (<a href="res/pgpkey-o-at-ovl-design.asc" title="PGP Key for o@ovl.design">PGP Key</a>).'
    }
  }
}
</script>

<style lang="scss">
@import '~assets/css/sass/import';

.homepage-content {
  max-width: 40rem;
  padding: 8vmin;

  // & >
  *:not(:last-child) {
    margin-bottom: space(double, viewport);
  }

  .title {
    margin-bottom: space(full, viewport);
  }
}

.index-nav {
  display: flex;
}

.index-nav-link {
  display: block;
  letter-spacing: 0.1em;
  text-decoration: none;
  text-transform: uppercase;
  margin-right: space(full, relative);

  &:hover,
  &:focus {
    text-decoration: underline;
  }
}

.c-social-logos__logo {
  height: 40px;
  margin-right: 1.5rem;
}
</style>
