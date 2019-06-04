<template>
  <div v-bar
       class="md-viewer">
    <div class="gpu">
      <div class="hljs dark"
           v-html="markdown" />
    </div>
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

<style scoped lang="scss">
@import '@/assets/scss/_markdown.scss';
.md-viewer {
  display: inline-block;
  background-color: #18242b;
  color: darken(#fff, 2);

  /deep/ a {
    color: #00f185;
    text-decoration: none;

    &:hover,
    &:active {
      color: darken(#00f185, 10);
    }
  }

  /deep/ pre {
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 10px;
    overflow-x: auto;
    margin-bottom: 35px;

    &::-webkit-scrollbar {
      background: none;
      height: 7px;
      width: 7px;
      padding: 5px;
    }

    &::-webkit-scrollbar-track-piece {
      width: 3px;
      height: 3px;
    }

    &::-webkit-scrollbar-button {
      width: 3px;
      height: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(#fff, 0.5);
      width: 3px;
      height: 3px;
      margin: 5px;
      transition: background-color 300ms ease;

      &:hover,
      &:active {
        background-color: #fff;
      }
    }


  }
}
.hljs {
  font-size: 0.9rem;
  line-height: normal;
  padding: 1.25em;
  position: relative;
  transform: translateZ(0);
  will-change: scroll-position;
  // display: inline-block;

  background-color: #18242b;
}
</style>
