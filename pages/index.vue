<template>
  <main class="homepage-content">
    <h1 class="title"><logo color="#f8f2e3" /></h1>
    <nav class="index-nav">
      <dynamic-anchor
        v-for="{ id, to, text, useNativeLinkElement } in nav"
        :key="id"
        :to="to"
        :use-native-link-element="useNativeLinkElement"
        class="index-nav-link"
      >
        {{ text }}
      </dynamic-anchor>
    </nav>
    <div class="c-main-content__p" v-html="introText" />
    <nav class="o-social-logos" aria-label="External profiles">
      <a href="https://twitter.com/_ovlb" aria-label="Oscar’s Twitter profile">
        <img
          src="~assets/img/twitter.png"
          alt="Twitter logo"
          class="c-social-logos__logo"
        />
      </a>
      <a href="https://github.com/ovlb" aria-label="Oscar’s GitHub profile">
        <img
          src="~assets/img/github.png"
          alt="GitHub logo"
          class="c-social-logos__logo"
        />
      </a>
      <a href="https://keybase.io/ovlb" aria-label="Oscar on Keybase">
        <img
          src="~assets/img/keybase.svg"
          alt="Twitter logo"
          class="c-social-logos__logo"
        />
      </a>
    </nav>
  </main>
</template>

<script>
import DynamicAnchor from '@tournant/dynamic-anchor'

import Logo from '~/components/OvlLogo.vue'

import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: 'Homepage'
    }
  },
  layout: 'homepage',
  components: {
    Logo,
    DynamicAnchor
  },
  data() {
    return {
      introText:
        '<p>I am Oscar. I design for web and print. I care about accessibility, usability &amp; performance. I am typophile. I don’t specialize in pop art. I like to think. And owls.</p><p>During working hours you will find me at <a href="https://www.kitchenstories.com">Kitchen Stories</a>.</p><p>If you want to get in touch, <a href="mailto:o@ovl.design" title="Oscar’s E-mail">drop me a line</a> (<a href="/res/pgpkey-o-at-ovl-design.asc" title="PGP Key for o@ovl.design">PGP Key</a>).</p>'
    }
  },
  computed: {
    ...mapState({
      nav: 'mainNavLinks'
    })
  }
}
</script>

<style lang="scss">
.homepage-content {
  max-width: 40rem;
  padding: 8vmin;

  // & >
  & > *:not(:last-child) {
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

  & + & {
    margin-left: space(full, relative);
  }

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
