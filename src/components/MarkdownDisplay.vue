<template>
  <div class="md-viewer">
    <div
      class="hljs dark h-full overflow-auto"
      v-html="markdown()" />
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
      return () => marked(this.value, {
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
  background-color: rgba(27, 31, 34, 0.69);
  max-height: 100%;
  overflow: hidden;

 > div {

   touch-action: pan-y;

    &::-webkit-scrollbar {
    background: #1b1f22;
    width: 3px;

    &-thumb {
      background: rgba(247, 250, 252, 0.69);
    }
  }

  &:hover {
    &::-webkit-scrollbar {
      background: #1b1f22;
      // width: 10px;

      &-thumb {
        background: rgba(247, 250, 252, 0.69);
      }
    }
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

  @for $i from 1 through 6 {
    // for each $col_#{i}
    h#{$i} {
      // set the background-color to cornflowerblue and
      // each time lighten the color slightly
      color: darken(#54eda9, ($i * 2.5));
      line-height: 1.5rem + (5- ($i + 1)) * 2;
    }
  }

  a {
    color: rgb(51, 185, 80);

    &:hover {
      color: #fff;
    }
  }

  pre {
    margin: 1.25em -10px;
    background-color: rgba(0, 0, 0, 0.23);
    padding: 10px;
    font-size: 1.1em;
  }

  :not(pre) code {
    font-weight: bold;
    color: #00ffe9;
    font-size: 1.2em;
  }

  blockquote {
    border: 1px solid rgba(#fff, 0.1);
    border-left: 4px solid rgb(189, 65, 178);
    background-color: rgba(#000, 0.1);
    padding: 10px 15px;
    font-style: oblique;

    > blockquote {
      margin-left: 5px;
      margin-top: 10px;
    }
  }

  table {
    table-layout: fixed;
    width: 100%;
    font-size: 0.8em;
    margin-bottom: 1rem;

    tr {
      text-align: left;
    }

    thead {
      tr {
        background-color: rgba(46, 67, 82, 0.48);
        // border: 1px solid #2e4352;
      }
      th {
        padding: 10px;
        font-size: 1.2em;
        border: 1px solid rgba(#fff, 0.5);
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
    }

    tbody {
      > tr {
        padding: 5px;

        > td {
          padding: 10px;
          border: 1px dashed rgba(#fff, 0.5);
        }
      }
    }
  }

  hr {
    border: 1px dashed rgba(255, 255, 255, 0.19);
  }

  p {
    line-height: 1.5em;
  }

  > {
    ul,
    ol {
      margin-bottom: 1em;
    }
  }

  ul {
    list-style-type: disc;
    padding-left: 20px;
  }

  ol {
    list-style-type: upper-roman;
    list-style-position: unset;
    padding-left: 20px;
  }
}
</style>
