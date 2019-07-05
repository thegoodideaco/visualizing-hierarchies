<template>
  <div class="md-viewer">
    <div class="h-full pr-2">
      <div
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
  computed: {
    markdown() {
      return () =>
        marked(this.value, {
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

<style lang="scss" src="@/assets/scss/_markdown.scss">

</style>
