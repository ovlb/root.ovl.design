<template>
  <div class="terminal-row">
    <div class="terminal-row__path" aria-hidden="true">
      {{ `~/dev/${path}` }}
    </div>
    <div class="terminal-row__input" aria-hidden="true">{{ command }}</div>
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
.terminal-row {
  & + & {
    margin-top: space(full, viewport);
  }

  & > * + * {
    margin-top: 0.25rem;
  }
}

.terminal-row__path {
  color: var(--clr-accent);
  opacity: 0.66;
}

.terminal-row__output {
}

.terminal-row__input {
  position: relative;

  &::before {
    content: '❯ ';
    color: var(--clr-red);
  }
}
</style>
