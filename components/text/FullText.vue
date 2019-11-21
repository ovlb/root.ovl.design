<template>
  <article class="text full-width">
    <header class="text__header">
      <p
        v-if="infos.date && infos.category"
        class="text__date"
      >{{ infos.category }}—{{ infos.date | displayDate }}</p>
      <h1 class="main-headline text__headline">{{ infos.title }}</h1>
      <section
        v-if="infos.contentIntro"
        class="text__intro"
        v-html="parsedText(infos.contentIntro)"
      />
    </header>
    <picture class="text__hero-image">
      <source
        v-if="infos.heroImage"
        :srcset="
          srcSet(infos.heroImage.fields.imageSmall.fields.file.url, 'small')
        "
        media="(max-width: 1199px)"
        sizes="(min-width: 777px) 33vw, 25vw"
      >
      <source
        v-if="infos.heroImage"
        :srcset="
          srcSet(infos.heroImage.fields.imageLarge.fields.file.url, 'large')
        "
        media="(min-width: 1200px)"
        sizes="(min-width: 1800px) 900px, 50vw"
      >
      <img
        v-if="infos.heroImage"
        :src="infos.heroImage.fields.imageSmall.fields.file.url"
        :alt="infos.heroImage.fields.altText"
      >
    </picture>
    <section
      v-if="Array.isArray(infos.content)"
      class="text__body"
    >
      <div
        v-for="item in infos.content"
        :key="item.sys.id"
      >
        <h2 class="sub-headline">{{ item.fields.title }}</h2>
        <div v-html="parsedText(item.fields.body)" />
      </div>
    </section>
    <section
      v-else
      class="text__body"
      v-html="parsedText(infos.content)"
    />
  </article>
</template>

<script>
import marked from 'marked'
import Prism from 'prismjs'
import 'prism-themes/themes/prism-a11y-dark.css'

export default {
  filters: {
    parsed: (value) => marked(value),
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
  methods: {
    parsedText(text) {
      return marked(text, {
        highlight: function(code, lang) {
          return Prism.highlight(code, Prism.languages[lang || 'none'], lang)
        }
      })
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
  grid-template-rows: calc(100vh - var(--layout-header-height)) auto;
  margin: 0 auto;
  max-width: 900px;

  @media screen and (min-width: $bp-text-one) {
    grid-template-columns: [main-start content-start] 2fr [main-end content-end aside-start] 1fr [aside-end];
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: [main-start content-start] 1fr [main-end content-end aside-start] 1fr [aside-end];
  }

  @supports (display: grid) {
    max-width: 1800px;

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
  padding: 1.6rem space(double, viewport) space(triple, relative);
  transition: opacity 0.1s cubic-bezier(0, 0.1, 0.3, 1);
  grid-column: main;
}

.text__date {
  color: color(dark);
  font-size: var(--type-small);
}

.text__headline {
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
  top: var(--layout-header-height);
  width: 100%;

  & > img {
    height: 100%;
    object-fit: cover;
    mix-blend-mode: multiply;
    width: 100%;
  }

  @media screen and (min-width: $bp-text-one) {
  }
}

.text__body {
  background-color: color(light);
  display: grid;
  grid-template-columns: [full-start] 4vmin [main-start] 1fr [main-end] 4vmin [full-end];
  grid-column: content;
  padding: space(double, viewport) 0;
  /* Used to push body over sticky image */
  z-index: 1;

  & > * {
    grid-column: main;
  }

  & > p > code {
    background-color: #e3000015;
    border: 1px solid #00000017;
    border-radius: 0.25rem;
    font-family: var(--fonts-mono);
    font-size: 86%;
    padding: 0.1rem 0.3rem 0.2rem;
  }

  & > pre {
    --clr-accent: #28caf0;

    // font-family: var(--fonts-mono);
    border-radius: 0 0.25em 0.25em 0;
    font-size: 85%;
    grid-column: full;
    margin-bottom: 2vmin;
    margin-top: 2vmin;
    line-height: 1.7;
    padding: 4vmin;

    ::selection {
      background-color: var(--clr-accent);
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
