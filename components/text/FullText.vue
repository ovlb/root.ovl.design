<template>
  <article class="text full-width">
    <header class="text__header u-floral-heart-gradient">
      <p v-if="infos.date && infos.category" class="text__date">
        {{ infos.category }}—{{ infos.date | displayDate }}
      </p>
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
      />
      <source
        v-if="infos.heroImage"
        :srcset="
          srcSet(infos.heroImage.fields.imageLarge.fields.file.url, 'large')
        "
        media="(min-width: 1200px)"
        sizes="(min-width: 1800px) 900px, 50vw"
      />
      <img
        v-if="infos.heroImage"
        :src="infos.heroImage.fields.imageSmall.fields.file.url"
        :alt="infos.heroImage.fields.altText"
      />
    </picture>
    <section v-if="Array.isArray(infos.content)" class="text__body">
      <div v-for="item in infos.content" :key="item.sys.id">
        <h2 class="sub-headline">{{ item.fields.title }}</h2>
        <div v-html="parsedText(item.fields.body)" />
      </div>
    </section>
    <section v-else class="text__body" v-html="parsedText(infos.content)" />
  </article>
</template>

<script>
import marked from 'marked'
import Prism from 'prismjs'

export default {
  filters: {
    parsed: (value) => marked(value),
    displayDate: (value) => {
      const d = new Date(value)

      return d.toLocaleDateString('en-UK', { month: 'long', year: 'numeric' })
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
$bp-text-one: 777px;

.text {
  display: grid;
  grid-template-columns: [main-start content-start] 3fr [main-end aside-start] 1fr [aside-end content-end];
  grid-template-rows: calc(100vh - var(--layout-header-height)) auto;
  margin: 0 auto;
  max-width: 900px;

  @media screen and (min-width: $bp-text-one) {
    grid-template-columns: [main-start content-start] minmax(65ch, 2fr) [main-end content-end aside-start] 1fr [aside-end];
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
  color: var(--clr-accent);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: space(full, relative);
  padding: 1.6rem space(double, viewport) space(triple, relative);
  transition: opacity 0.1s cubic-bezier(0, 0.1, 0.3, 1);
  grid-column: main;
}

.text__date {
  color: var(--clr-fg);
  font-size: var(--type-small);
}

.text__headline {
  margin-top: space(full, relative);
}

.text__intro {
  color: var(--clr-fg);
  font-size: var(--type-medium);

  & > p {
    font-size: inherit;
  }
}

.text__hero-image {
  background-color: var(--clr-accent);
  background-image: linear-gradient(
    to bottom left,
    var(--clr-accent-dark),
    var(--clr-main-light)
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
  background-color: var(--clr-bg);
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
    font-size: 79%;
    padding: 0.1rem 0.3rem 0.2rem;
  }

  & > pre {
    --clr-accent: #28caf0;

    // font-family: var(--fonts-mono);
    background-color: #2b2b2b;
    border-radius: 0 0.25em 0.25em 0;
    font-size: 85%;
    grid-column: full;
    margin-bottom: 2vmin;
    margin-top: 2vmin;
    overflow: auto;
    line-height: 1.7;
    padding: 4vmin;
    width: 100%;
  }

  & blockquote {
    border-left: 2px solid var(--clr-decent);
    margin: space(full, relative) 0 space(double, relative);
    max-width: 55ch;
    line-height: 1.4;
    padding: space(full, relative) 0 space(full, relative) space(full, viewport);
  }
}
</style>
