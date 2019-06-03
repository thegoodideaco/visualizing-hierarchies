<template>
  <div class="hierarchy-generator">
    <div
      class="tools"
      @input="onGroupChange">
      <select
        :disabled="selectGroups.length === 0"
        :value="'Select a Group'"
        class="block">
        <option disabled>
          Select a Group
        </option>
        <option
          v-for="(item, index) in selectGroups"
          :key="index">
          <span class="p-2">{{ item.name }}</span>
        </option>
      </select>
    </div>

    <div class="list">
      <!-- Show enabled groups -->
      <draggable v-model="pickedGroups">
        <div
          v-for="(item, index) in pickedGroups"
          :key="index"
          class="border border-dashed">
          <div>
            <span>{{ item.name }}</span>

            <button @click="unselectGroup(item)">
              x
            </button>
          </div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import * as _ from 'lodash'
import { nest, ascending, hierarchy } from 'd3'
export default {
  components: {
    draggable
  },
  inheritAttrs: false,
  props:        {
    /**
     * Groups
     * @type {Vue.PropOptions<{name: string, key: (item) => any}[]>}
     */
    groups: {
      type: Array,
      default() {
        return [
          {
            name: 'First Letter of App',
            key:  item => {
              const [firstWord] = _.words(_.deburr(item.App))

              return firstWord.substr(0, 1)
            }
          },
          {
            name: 'First Word of App',
            key:  item => _.words(_.deburr(item.App))[0]
          },
          {
            name: 'Category',
            key:  item => item.Category
          },
          {
            name: 'Content Rating',
            key:  item => item['Content Rating']
          },
          {
            name: 'Type',
            key:  item => item['Type']
          },
          {
            name: 'Rating',
            key:  item => ~~parseFloat(item.Rating)
          },
          {
            name: 'Installs',
            key:  item => item.Installs
          }
        ]
      }
    }
  },
  data() {
    return {
      /**
       * @type {{name: string, key: (item) => any}[]}
       */
      pickedGroups: null
    }
  },
  computed: {
    /**
     * Represents the groups that aren't being used
     * @returns {{name: string, key: (item) => any}[]}
     */
    selectGroups() {
      /**
       * Return original groups in nothing is selected
       */
      if (!this.pickedGroups || !this.pickedGroups.length) {
        return this.groups
      }

      /**
       * Otherwise, return the filtered list
       */
      return this.groups.filter(group => !this.pickedGroups.includes(group))
    },

    /**
     * @returns {d3.Nest}
     */
    nest() {
      if(!this.pickedGroups || !this.pickedGroups.length) return
      const nester = nest()

      this.pickedGroups.forEach(group => {
        nester.key(group.key).sortKeys(ascending)
      })

      return nester
    }
  },
  watch: {


    nest: {

      /** @param {d3.Nest} val */
      handler(val) {
        if(val) {
          this.$emit('change', hierarchy({
            key:    'all',
            values: val.entries(this.$attrs.data)
          }, n => n.values) )
        }else{
          this.$emit('change', null)
        }
      }
    }
  },
  methods: {
    /**
     * @param {Event} event
     */
    onGroupChange(event) {
      const defaultValue = event.target.options[0].value
      const val = event.target.value
      event.preventDefault()
      event.target.value = defaultValue

      // debugger

      const valueObj = this.groups.find(g => g.name === val)

      this.pickedGroups = [...(this.pickedGroups || []), valueObj]
    },

    /**
     * Removes a selected group item
     * @param {{name: string}} item
     */
    unselectGroup(item) {
      this.pickedGroups.splice(this.pickedGroups.indexOf(item), 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.hierarchy-generator {
  display: inline-grid;
  grid: auto 1fr / 1fr;
}
.list {
  margin-top: 10px;
  overflow: auto;
  > div {
    display: grid;
    row-gap: 10px;

    > * > {
      * {
        display: grid;
        grid: auto / 1fr auto;

        > {
          * {
            padding: 5px;
          }

          button {
            background: green;
            height: 100%;
            width: 40px;
          }
        }
      }
    }
  }
}
</style>

