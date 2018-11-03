<template>
  <li class="code-card">
    <article>
      <terminal-row
        :path="infos.fields.slug"
        :command="'echo $P_NAME'"
      >
        <h2 class="terminal-row__output">{{ infos.fields.title }}</h2>
      </terminal-row>
      <terminal-row
        :path="infos.fields.slug"
        :command="'echo $P_DESC'"
      >
        <p class="terminal-row__output">{{ infos.fields.description }}</p>
      </terminal-row>
      <terminal-row
        :path="infos.fields.slug"
        :command="'echo $P_LINKS'"
      >
        <ul
          class="icon-list code-card__icons"
          aria-label="Detail links"
        >
          <li class="icon-list__item">
            <a
              :href="infos.fields.website"
              :aria-label="`${infos.fields.title} Website`"
              class="icon-list__link icon-list__link--website"
            />
          </li>
          <li class="icon-list__item">
            <a
              :href="infos.fields.sourceCode"
              :aria-label="`${infos.fields.title} Source Code`"
              class="icon-list__link icon-list__link--code"
            />
          </li>
        </ul>
      </terminal-row>
    </article>
  </li>
</template>

<script>
import TerminalRow from './TerminalRow.vue'

export default {
  components: {
    TerminalRow
  },
  props: {
    infos: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import '~assets/css/sass/import';

.code-card {
  font-family: monospace;
  list-style: none;

  & + & {
    margin-top: space(double, viewport);
  }
}

.code-card__icons {
  padding-left: 2ch;
}

.icon-list {
  display: grid;
  grid-gap: 0.5em;
  grid-template-columns: repeat(auto-fit, 2em);
  grid-auto-rows: 2em;
}

.icon-list__item {
  list-style: none;
}

.icon-list__link {
  background-position: center;
  background-repeat: no-repeat;
  background-size: 75%;
  display: block;
  height: 100%;

  &--website {
    background-image: url('~assets/img/icons/open-site-light.svg');
  }

  &--code {
    background-image: url('~assets/img/icons/code-light.svg');
  }
}
</style>
