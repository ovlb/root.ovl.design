<template>
  <footer class="site-footer" aria-label="Main Footer">
    <section>
      <h3 class="sub-headline u-is-visually-hidden">Hello</h3>
      <p>
        My name is Oscar. I write <a href="/code"> Code </a>. I design for web
        and print. I like owls. And this is my website.
      </p>
      <div>
        <switch-button
          v-if="isClient"
          v-model="isDarkMode"
          on-label="Dark"
          off-label="Light"
          @click="switchThemeMode"
          >Theme</switch-button
        >
      </div>
    </section>
    <nav class="footer-nav">
      <nuxt-link
        v-for="item in navItems"
        :key="item.id"
        :to="`/${item.slug}`"
        class="footer-nav__link"
        active-class="footer-nav__link--active"
      >
        {{ item.text }}
      </nuxt-link>
    </nav>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

import SwitchButton from '@tournant/switch-button'

export default {
  components: {
    SwitchButton
  },
  data() {
    return {
      isDarkMode: false,
      isClient: false
    }
  },
  computed: {
    ...mapState({
      navItems: 'footerNavLinks'
    })
  },
  mounted() {
    this.isDarkMode = matchMedia('(prefers-color-scheme: dark)').matches

    this.isClient = true
  },
  methods: {
    switchThemeMode() {
      this.isDarkMode = !this.isDarkMode
    }
  }
}
</script>

<style lang="scss">
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

  & .t-ui-switch-button__text--on {
    // color: blue;
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
