<template>
  <div class="inquire-form-section-content" :style="contentOutsideSection">
    <div v-for="n in numberOfRows" :key="n">
      <slot :name="`row-${n}`"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    outsideSection: {
      type: Boolean,
      default: null,
    },
  },
  data: () => ({
    numberOfRows: null as null | number,
  }),
  computed: {
    contentOutsideSection(): string {
      return this.outsideSection ? "padding: 2.5rem 4rem" : ""
    },
  },
  mounted() {
    this.numberOfRows = this.getNumberOfRows()
  },
  methods: {
    getNumberOfRows(): number {
      if (this.$slots) {
        return Object.keys(this.$slots).length
      }

      return 0
    },
  },
})
</script>

<style>
.inquire-form-section-content {
  width: 100%;
  max-width: 80rem;
  margin: auto;
  height: 100%;
}
</style>
