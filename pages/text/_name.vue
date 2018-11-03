<template>
  <the-content class="content--no-padding">
    <article class="text full-width">
      <header class="text__header">
        <p class="text__date">{{ post.fields.categories[0].fields.title }}—{{ post.fields.date | displayDate }}</p>
        <h1 class="main-headline text__headline">{{ post.fields.title }}</h1>
        <section
          v-if="post.fields.contentIntro"
          class="text__intro"
          v-html="parsedText(post.fields.contentIntro)"
        />
      </header>
      <picture class="text__hero-image">
        <source
          :srcset="srcSet(post.fields.heroImage.fields.imageSmall.fields.file.url, 'small')"
          media="(max-width: 1199px)"
          sizes="(min-width: 777px) 33vw, 25vw"
        >
        <source
          :srcset="srcSet(post.fields.heroImage.fields.imageLarge.fields.file.url, 'large')"
          media="(min-width: 1200px)"
          sizes="(min-width: 1800px) 900px, 50vw"
        >
        <img
          :src="post.fields.heroImage.fields.imageSmall.fields.file.url"
          :alt="post.fields.heroImage.fields.altText"
        >
      </picture>
      <section
        class="text__body"
        v-html="parsedText(post.fields.content)"
      />
    </article>
  </the-content>
</template>

<script>
import marked from 'marked'

import TheContent from '~/components/global/TheContent'

import contentfulClient from '~/plugins/contentful'

export default {
  head() {
    return {
      title: `${this.post.fields.title} « Texte`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.fields.intro
        }
      ]
    }
  },
  filters: {
    parsed: (value) => marked(value),
    displayDate: (value) => {
      const d = new Date(value)

      return d.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
    }
  },
  components: {
    TheContent
  },
  async asyncData({ params, store, error, payload }) {
    const { name } = params
    const articles = store.state.articles.list

    let post

    if (articles && articles.length) {
      post = articles.find((a) => a.fields.slug === name)
    } else {
      const { items } = await contentfulClient.getEntries({
        content_type: 'article',
        'fields.slug': name
      })

      post = items[0]
    }

    return { post }
  },
  methods: {
    parsedText(text) {
      return marked(text)
    },
    srcSet(url, size) {
      const sizes = {
        small: [
          320,
          360,
          400,
          480,
          520,
          560,
          640,
          680,
          720,
          760,
          800,
          880,
          920,
          960,
          1000,
          1040,
          1080,
          1120,
          1160,
          1220,
          1260,
          1300,
          1340,
          1380
        ],
        large: [
          600,
          680,
          760,
          840,
          900,
          960,
          1020,
          1080,
          1140,
          1200,
          1260,
          1320,
          1380,
          1420,
          1480,
          1520,
          1600,
          1700,
          1800,
          1900,
          2000,
          2100,
          2200,
          2300,
          2400,
          2600,
          2800,
          3000,
          3200,
          3400
        ]
      }

      let set = ''

      sizes[size].forEach((size) => {
        set += `${url}?w=${size} ${size}w, `
      })

      return set
    }
  }
}
</script>

<style lang="scss">
@import '~assets/css/sass/import';

$bp-text-one: 777px;

.text {
  display: grid;
  grid-template-columns: [main-start content-start] 3fr [main-end aside-start] 1fr [aside-end content-end];
  margin: 0 auto;
  max-width: 1800px;

  @media screen and (min-width: $bp-text-one) {
    grid-template-columns: [main-start content-start] 2fr [main-end content-end aside-start] 1fr [aside-end];
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: [main-start content-start] 1fr [main-end content-end aside-start] 1fr [aside-end];
  }

  @supports (display: grid) {
    & > * {
      margin: 0 !important;
    }
  }
}

.text__header {
  background-image: linear-gradient(
      to right,
      color(main-light),
      color(main-dark)
    ),
    url('~assets/img/icons/floral-heart-dark-red.svg'),
    linear-gradient(to right, color(main-dark), color(main-light));
  background-position: 4vmin calc(100% - 2rem), center calc(100% - 1.66rem),
    calc(100% - 4vmin) calc(100% - 2rem);
  background-repeat: no-repeat;
  background-size: 40% 0.125rem, 1rem, 40% 0.125rem;
  color: color(main);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: space(full, relative);
  padding: 1.6rem space(double, viewport);
  -webkit-transition: opacity 0.1s cubic-bezier(0, 0.1, 0.3, 1);
  transition: opacity 0.1s cubic-bezier(0, 0.1, 0.3, 1);
  grid-column: main;
}

.text__date {
  color: color(dark);
  font-size: var(--type-small);
}

.text__headline {
  // background-image: linear-gradient(
  //     to right,
  //     color(main-light),
  //     color(main-dark)
  //   ),
  //   url('~/assets/img/icons/floral-heart-dark-red.svg'),
  //   linear-gradient(to right, color(main-dark), color(main-light));
  // background-position: left calc(100% - 1rem), center calc(100% - 0.66rem),
  //   right calc(100% - 1rem);
  // background-clip: text;
  // -webkit-text-fill-color: transparent;
  margin-top: space(full, relative);
}

.text__intro {
  color: color(dark);
  font-size: var(--type-medium);
}

.text__hero-image {
  background-color: color(main);
  background-image: linear-gradient(
    to bottom left,
    color(main-dark),
    color(main-light)
  );
  clip-path: polygon(0% 0, 100% 0%, 100% 100%, 6vmin 100%);
  grid-column: aside;
  align-self: stretch;
  position: sticky;
  top: 5.5rem;
  height: calc(100vh - 5.5rem);
  width: 100%;

  & > img {
    height: 100%;
    object-fit: cover;
    mix-blend-mode: multiply;
    width: 100%;
  }

  @media (min-width: 642px) {
    height: calc(100vh - (8vmin + 4.3rem));
    top: calc(8vmin + 4.3rem);
  }

  @media screen and (min-width: $bp-text-one) {
  }
}

.text__body {
  background-color: color(light);
  grid-column: content;
  padding: space(double, viewport);
  /* Used to push body over sticky image */
  z-index: 1;

  & > p,
  & > h3 {
    max-width: 66ch;
  }

  & > h3 {
    position: relative;

    &::before {
      background-color: color(main);
      content: '';
      height: 2px;
      right: calc(100% + 0.1em);
      position: absolute;
      top: 0.3rem;
      transform: rotate(45deg);
      width: 24px;
      z-index: -1;
    }
  }

  & blockquote {
    border-left: 2px solid color(text-light);
    margin: space(full, relative) 0 space(double, relative);
    max-width: 55ch;
    line-height: 1.4;
    padding: space(full, relative) 0 space(full, relative) space(full, viewport);
  }
}
</style>
