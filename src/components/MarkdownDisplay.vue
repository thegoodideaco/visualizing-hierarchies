<template>
  <div class="md-viewer">
    <div
      class="hljs dark h-full"
      v-html="markdown" />
  </div>
</template>

<script>
import marked from 'marked'

import hl from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import html from 'highlight.js/lib/languages/xml'
hl.registerLanguage('javascript', javascript)
hl.registerLanguage('html', html)

export default {
  props: {
    value: {
      type:     String,
      required: true
    }
  },
  computed: {
    markdown() {
      return marked(this.value, {
        langPrefix:  'javascript',
        smartypants: true,
        pedantic:    false,
        mangle:      true,
        xhtml:       true,
        smartLists:  true,
        gfm:         true,
        tables:      true,
        breaks:      true,
        highlight:   code => hl.highlightAuto(code).value
      })
    }
  }
}
</script>

<style  lang="scss">
.md-viewer {

background-color: #18242b;

  &::-webkit-scrollbar {
     background: #1b1f22;
  width: 8px;

    &-thumb {
      background: rgba(247, 250, 252, 0.69);
    }
  }
}

.hljs {
  @import '@/assets/scss/highlightjs/obsidian.scss';
  font-size: 1em;
  line-height: normal;
  padding: 1.25em;
  position: relative;
  transform: translateZ(0);
  will-change: scroll-position;
  // display: inline-block;



  pre {
    margin-top: 1.25em;
  }
}
</style>
