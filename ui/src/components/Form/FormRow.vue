<template>
  <v-row :class="formRowClass" :no-gutters="noGutters" :style="addedPadding">
    <v-col v-for="n in numberOfColumns" :key="n" class="inquiry-form-col" :cols="n === 1 ? firstColumnSize : ''">
      <slot :name="`column-${n}`"></slot>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    halfSize: {
      type: Boolean,
      default: null,
    },
    twoThirdsSize: {
      type: Boolean,
      default: null,
    },
    threeFourthsSize: {
      type: Boolean,
      default: null,
    },
    oneFourthsSize: {
      type: Boolean,
      default: null,
    },
    noGutters: {
      type: Boolean,
      default: false,
    },
    lastRowInSection: {
      type: Boolean,
      default: null,
    },
    pLeft: {
      type: Boolean,
      default: null,
    },
    pTop: {
      type: Boolean,
      default: null,
    },
    pRight: {
      type: Boolean,
      default: null,
    },
    pBtm: {
      type: Boolean,
      default: null,
    },
    firstRow: {
      type: Boolean,
      default: null,
    },
  },
  data: () => ({
    columnSizeRatio: null as string | null,
    numberOfColumns: null as number | null,
  }),
  computed: {
    firstColumnSize(): string {
      if (this.halfSize) {
        return "6 : 3"
      }
      if (this.twoThirdsSize) {
        return "8 : 4"
      }
      if (this.threeFourthsSize) {
        return "10 : 2"
      }
      if (this.oneFourthsSize) {
        return "3 : 4.5"
      }
      return ""
    },

    formRowClass(): string {
      return this.lastRowInSection ? "inquiry-form-row" : "inquiry-form-row last-row-in-section"
    },

    addedPadding(): string {
      if (this.pTop) {
        return `padding: 1.5rem ${this.pRight ? "1.5rem" : "0rem"} ${this.pBtm ? "1.5rem" : "0rem"}  ${
          this.pLeft ? "1.5rem" : "0rem"
        };`
      }

      if (this.firstRow) {
        return `padding: 4rem ${this.pRight ? "1.5rem" : "0rem"} ${this.pBtm ? "1.5rem" : "0rem"}  ${
          this.pLeft ? "1.5rem" : "0rem"
        };`
      }

      return `padding: 0rem ${this.pRight ? "1.5rem" : "0rem"} ${this.pBtm ? "1.5rem" : "0rem"}  ${
        this.pLeft ? "1.5rem" : "0rem"
      };`
    },
  },
  mounted() {
    this.numberOfColumns = this.getNumberOfColumns()
  },
  methods: {
    getNumberOfColumns(): number {
      if (this.$slots) {
        return Object.keys(this.$slots).length
      }

      return 0
    },
  },
})
</script>

<style lang="scss" scoped>
.inquiry-form-row {
  height: 100%;
  display: flex;
  .col {
    padding-top: 0px;
  }
}

.last-row-in-section {
  ::v-deep {
    .col {
      padding-bottom: 0 !important;
    }
  }
}
</style>
