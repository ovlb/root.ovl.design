<template>
  <li
    class="article-card"
  >
    <aside class="article-card__aside">
      <p class="article-card__info">{{ infos.fields.date | displayDate }}</p>
    </aside>
    <h2 class="sub-headline article-card__headline">{{ infos.fields.title }}</h2>
    <div class="article-card__text">
      <p class="article-card__teaser"> {{ infos.fields.intro }}</p>
      <a
        :href="linkTarget"
        :aria-label="`Text ${infos.fields.title} lesen`"
        class="article-card__link"
      >
        <span aria-hidden="true">»</span> Text lesen
      </a>
    </div>

  </li>
</template>

<script>
export default {
  filters: {
    displayDate: (value) => {
      const d = new Date(value)

      return d.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
    }
  },
  props: {
    infos: {
      type: Object,
      required: true
    }
  },
  computed: {
    linkTarget() {
      const { isInternal, slug } = this.infos.fields

      return isInternal
        ? `/texte/${slug}`
        : this.infos.fields.externalPost.fields.link
    }
  }
}
</script>

<style lang="scss">
@import '~assets/css/sass/import';

.article-card {
  list-style: none;
  padding-left: space(full, viewport);
  overflow: hidden;
  position: relative;

  &:hover {
    & .article-card__headline {
      transform: translateX(-(space(half, viewport)));

      &::before {
        transform: unset;
      }
    }
  }
}

.article-card__headline {
  display: inline-block;
  margin-top: 0;
  position: relative;
  transition: transform 0.2s cubic-bezier(0, 0.1, 0.3, 1);

  &::before {
    background-color: color(main-light);
    content: '';
    height: space(full, viewport);
    left: 0;
    position: absolute;
    bottom: 0;
    width: space(half, viewport);

    @supports (mix-blend-mode: color) {
      backface-visibility: hidden;
      left: -2vmin;
      mix-blend-mode: multiply;
      height: space(half, viewport);
      transition: transform 0.2s cubic-bezier(0, 0.1, 0.3, 1);
      transform: rotate(45deg) translate(-48%, -189%) scale(0.5, 0.75);
      transform-origin: left bottom;
      width: calc(100% + 2vmin + 4px);
      will-change: transform;
    }
  }
}

.article-card__text {
  display: flex;
  flex-direction: column;
}

.article-card__aside {
  color: color(text-light);
  font-size: var(--type-small);
  // margin-top: space(full, viewport);
}

.article-card__info {
  margin-bottom: 2px;
}

.article-card__link {
  margin-left: auto;
}
</style>
