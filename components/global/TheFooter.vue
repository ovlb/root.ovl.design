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
          :value="isDarkMode"
          on-label="Dark"
          off-label="Light"
          @click.native="switchThemeMode"
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
    const userDarkSetting = localStorage.getItem('ovlUserTheme')

    if (userDarkSetting) {
      const userSettingPrefersDark = userDarkSetting === 'dark'

      this.isDarkMode = userSettingPrefersDark
      document.documentElement.setAttribute('data-user-theme', userDarkSetting)
    } else {
      const isDarkMode = matchMedia('(prefers-color-scheme: dark)').matches

      this.isDarkMode = isDarkMode
    }

    this.isClient = true
  },
  methods: {
    switchThemeMode() {
      this.isDarkMode = !this.isDarkMode

      const theme = this.isDarkMode ? 'dark' : 'light'

      localStorage.setItem('ovlUserTheme', theme)

      document.documentElement.setAttribute('data-user-theme', theme)
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
}

.t-ui-switch-button {
  margin-top: 0.5rem;

  & .t-ui-switch-button__text {
    border: none !important;
    font-weight: normal;
  }

  & .t-ui-switch-button__text--on {
    background-color: var(--clr-dark) !important;
    color: var(--clr-light) !important;
  }

  [aria-checked='true'] .t-ui-switch-button__text--on {
    font-weight: bold;
  }

  & .t-ui-switch-button__text--off {
    background-color: var(--clr-light) !important;
    color: var(--clr-dark) !important;
  }
  [aria-checked='false'] .t-ui-switch-button__text--off {
    font-weight: bold;
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
