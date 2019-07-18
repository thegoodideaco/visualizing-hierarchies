
// 1. Make sure to import 'vue' before declaring augmented types
declare module '*.vue' {
  import Vue from 'vue'
  // import Vue from 'vue'


  export default Vue
}

import Vue from 'vue'
// 2. Specify a file with the types you want to augment
//    Vue has the constructor type in types/vue.d.ts
declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {
    $myProperty: string
    openInEditor: (component?: any) => void
  }
}