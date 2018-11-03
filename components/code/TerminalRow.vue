<template>
  <div class="terminal-row">
    <p
      class="terminal-row__path"
      aria-hidden="true">{{ `~/dev/${path}` }}</p>
    <p
      class="terminal-row__input"
      aria-hidden="true">{{ command }}</p>
    <slot class="terminal-row__output" />
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default: ''
    },
    command: {
      type: String,
      default: 'echo $ENV'
    }
  }
}
</script>

<style lang="scss">
@import '~assets/css/sass/import';

.terminal-row {
  & + & {
    margin-top: space(full, viewport);
  }
}

.terminal-row__path {
  color: var(--clr-accent);
  opacity: 0.66;
}

.terminal-row__output {
  padding-left: 2ch;
}

.terminal-row__input {
  position: relative;

  &::before {
    content: '❯ ';
    color: var(--clr-red);
  }
}
</style>
