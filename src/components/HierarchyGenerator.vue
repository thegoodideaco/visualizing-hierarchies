<template>
  <div class="hierarchy-generator">
    <div class="tools">
      <select
        :disabled="selectGroups.length === 0"
        :value="'Select a Group'"
        class="block w-full"
        @input="onAddGroup">
        <option disabled>
          Select a Group
        </option>
        <option v-for="(item, index) in selectGroups"
                :key="index">
          <span class="p-2">{{ item.name }}</span>
        </option>
      </select>
    </div>

    <div class="list select-none">
      <!-- Show enabled groups -->
      <draggable v-model="pickedGroups"
                 v-bind="dragOptions"
                 handle=".handle">
        <div
          v-for="(item, index) in pickedGroups"
          :key="index"
          class="border border-dashed">
          <div>
            <span class="handle">{{ item.name }}</span>

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
import words from 'lodash/words'
import deburr from 'lodash/deburr'
import { nest, hierarchy, timeFormat } from 'd3'
export default {
  components: {
    draggable
  },
  inheritAttrs: false,
  props:        {
    /**
     * A collection of nest methods to be passed to d3.Nest
     * @type {Vue.PropOptions<{name: string, key: (item) => any}[]>}
     */
    groups: {
      type: Array,
      default() {
        return [
          {
            name: 'First Letter of App',
            key:  item => {
              const [firstWord] = words(deburr(item.App))

              return firstWord.substr(0, 1)
            }
          },
          {
            name: 'First Word of App',
            key:  item => words(deburr(item.App))[0]
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
          },
          {
            name: 'Year last updated',
            key:  item => timeFormat('%Y')(Date.parse(item['Last Updated']))
          },
          {
            name: 'Month last updated',
            key:  item => timeFormat('%B')(Date.parse(item['Last Updated']))
          },
          {
            name: 'Day last updated',
            key:  item => timeFormat('%A')(Date.parse(item['Last Updated']))
          }
        ]
      }
    },

    data: {
      type:     Array,
      required: true
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
      if (!this.pickedGroups || !this.pickedGroups.length) return
      const nester = nest()

      this.pickedGroups.forEach(group => {
        nester.key(group.key)

        if (group.sortKeys) {
          nester.sortKeys(group.sortKeys)
        }
      })

      return nester
    },

    /** @returns {draggable.} */
    dragOptions() {
      return {
        animation:  200,
        disabled:   false,
        ghostClass: 'bg-blue-500'
      }
    }
  },
  watch: {
    /**
     * Emits a new hierarchy whenever the nest function changes
     */
    nest: {
      /** @param {d3.Nest} val */
      handler(val) {
        if (val) {
          this.$emit(
            'change',
            hierarchy(
              {
                key:    'all',
                values: val.entries(this.data)
              },
              n => n.values
            )
          )
        } else {
          this.$emit('change', null)
        }
      },
      immediate: true
    },

    data(val) {
      if (val) {
        this.$emit(
          'change',
          hierarchy(
            {
              key:    'all',
              values: val
            },
            n => n.values
          )
        )
      }
    }
  },
  methods: {
    /**
     * @param {Event} event
     */
    onAddGroup(event) {
      const defaultValue = event.target.options[0].value
      const val = event.target.value
      const valueObj = this.groups.find(g => g.name === val)

      event.preventDefault()
      event.target.value = defaultValue

      this.pickedGroups = [...(this.pickedGroups || []), valueObj]
    },

    /**
     * Removes a selected group item
     * @param {{name: string}} item
     */
    unselectGroup(item) {
      if (!this.pickedGroups.includes(item)) return
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
            background: transparent;
            height: 100%;
            width: 40px;

            &:hover {
              outline: none;
              color: rgb(112, 255, 155);
            }

            &:focus {
              outline: none;
            }
          }
        }
      }
    }
  }
}
</style>
