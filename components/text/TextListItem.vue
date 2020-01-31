<template>
  <li
    :class="{ 'article-card--external': !infos.fields.isInternal }"
    class="article-card"
  >
    <aside class="article-card__aside">
      <p class="article-card__info">{{ displayDate(infos.fields.date) }}</p>
    </aside>
    <h2
      :class="{ 'article-card__headline--external': !infos.fields.isInternal }"
      class="article-card__headline"
    >
      {{ infos.fields.title }}
    </h2>
    <div class="article-card__text">
      <p class="article-card__teaser">{{ infos.fields.intro }}</p>

      <dynamic-anchor
        :to="linkTarget"
        :use-native-link-element="!infos.fields.isInternal"
        :class="{ 'article-card__link--external': !infos.fields.isInternal }"
        class="article-card__link"
      >
        <span aria-hidden="true">» Read</span>
        <span class="u-is-visually-hidden">
          Read full text of {{ infos.fields.title }}
        </span>
      </dynamic-anchor>
      <p
        v-if="!infos.fields.isInternal"
        class="type-is-aside"
        style="margin-left: auto"
        aria-hidden="true"
      >
        {{ infos.fields.externalPost.fields.medium }}
      </p>
    </div>
  </li>
</template>

<script>
import DynamicAnchor from '@tournant/dynamic-anchor'

export default {
  components: {
    DynamicAnchor
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
        ? `/text/${slug}`
        : this.infos.fields.externalPost.fields.link
    }
  },
  methods: {
    displayDate: (value) => {
      const d = new Date(value)

      return d.toLocaleDateString('en-UK', { month: 'long', year: 'numeric' })
    }
  }
}
</script>

<style lang="scss">
.article-card {
  background-image: url('~assets/img/icons/floral-heart-dark-red.svg');
  background-position: center calc(100% - 0.66rem);
  background-repeat: no-repeat;
  background-size: 1rem;
  list-style: none;
  margin-left: -(space(full, viewport));
  overflow: hidden;
  padding-bottom: space(double, relative);
  padding-left: space(full, viewport);
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
  font-size: var(--type-medium);

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
      transform: rotate(45deg) translate(-49%, -150%) scale(0.5, 0.5);
      transform-origin: left bottom;
      width: calc(100% + 2vmin + 4px);
      will-change: transform;
    }
  }

  &--external {
    &::after {
      background-image: url('~assets/img/icons/baseline-launch-24px-light.svg');
      background-size: contain;
      content: '';
      display: inline-block;
      height: 0.8em;
      margin-left: 0.25em;
      transform: translateY(0.1em);
      width: 0.8em;
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
  font-size: var(--type-small);
  margin-bottom: 2px;
}

.article-card__link {
  margin-left: auto;

  &::after {
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
}
</style>
