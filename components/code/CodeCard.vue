<template>
  <li class="code-card">
    <article>
      <terminal-row
        :path="infos.fields.slug"
        :command="'echo $NAME'"
      >
        <h2 class="terminal-row__output">
          {{ infos.fields.title }}
        </h2>
      </terminal-row>
      <terminal-row
        :path="infos.fields.slug"
        :command="'echo $DESC'"
      >
        <p class="terminal-row__output">
          {{ infos.fields.description }}
        </p>
      </terminal-row>
      <terminal-row
        :path="infos.fields.slug"
        :command="'echo $LINKS'"
      >
        <ul
          class="icon-list code-card__icons"
          aria-label="Detail links"
        >
          <li class="icon-list__item">
            <a
              :href="infos.fields.website"
              class="icon-list__link icon-list__link--website"
              rel="noopener"
            >
              <span class="u-is-visually-hidden">
                {{ infos.fields.title }}
              </span>
              <span class="icon-list__link-text">
                Website
              </span>
            </a>
          </li>
          <li class="icon-list__item">
            <a
              :href="infos.fields.sourceCode"
              class="icon-list__link icon-list__link--code"
              rel="noopener"
            >
              <span class="u-is-visually-hidden">
                {{ infos.fields.title }}
              </span>
              <span class="icon-list__link-text">
                Source Code
              </span>
            </a>
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
  grid-gap: 0.75em;
  grid-template-columns: repeat(auto-fit, 1.75em);
  grid-auto-rows: 2em;
}

.icon-list__item {
  list-style: none;
}

.icon-list__link {
  background-position: left;
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
  height: 100%;
  position: relative;

  &--website {
    background-image: url('~assets/img/icons/open-site-light.svg');
  }

  &--code {
    background-image: url('~assets/img/icons/code-light.svg');
  }
}

.icon-list__link-text {
  background-color: color(light);
  border-radius: 0.25em;
  display: block;
  color: color(dark);
  font-size: var(--type-small);
  top: calc(100% + 0.25em);
  left: -0.25em;
  line-height: 1;
  opacity: 0;
  padding: 0.25em;
  position: absolute;
  transition: all 0.3s ease-out;
  transform: translateY(-0.25em);
  width: auto;
  white-space: nowrap;

  .icon-list__link:hover > &,
  .icon-list__link:focus > &,
  .icon-list__link:active > & {
    opacity: 1;
    transform: none;
  }
}
</style>
