<template>
  <div class="md-viewer">
    <div class="h-full pr-2">
      <div ref="scroller"
           class="hljs dark h-full overflow-auto"
           v-html="markdown()" />
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
  data: () => ({
    markdown: () => null
  }),
  watch: {
    value: {
      async handler() {
        this.markdown = () => this.createMarkdown()
        await this.$nextTick()
        if (!this.$refs.scroller) return

        this.updateLinkTargets()

        this.$refs.scroller.scroll({
          top:      0,
          left:     0,
          behavior: 'smooth'
        })
      },
      immediate: true
    }
  },
  methods: {
    createMarkdown() {
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
    },

    /**
     * Makes all links open in a new window
     */
    updateLinkTargets() {
      /** @type {HTMLElement} */
      const { innerHTML } = this.$refs.scroller

      /**
       * Create a new div, apply innerHTML
       */
      const temp = document.createElement('div')
      temp.innerHTML = innerHTML

      /**
       * Make all targets blank
       */
      temp.querySelectorAll('a').forEach(anchor => {
        anchor.target = '_blank'
      })

      /**
       * Update HTML
       */
      this.$refs.scroller.innerHTML = temp.innerHTML
    }
  }
}
</script>

<style lang="scss" src="@/assets/scss/_markdown.scss"></style>
