<template>
  <div class="component-container" :style="`${componentHeight}`">
    <div class="content">
      <slot name="component"></slot>
      <slot name="transition"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    componentSize: {
      type: Number,
      default: 1,
    },
    componentId: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    observer: null,
    contentElements: [],
    component: {
      intersectionRatio: null,
    },
  }),
  computed: {
    componentHeight() {
      return `height: ${this.componentSize}00vh`
    },
  },
  mounted() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.fetchContentElements()
      this.initObserver()
    },
    fetchContentElements() {
      const idArray = [this.componentId]
      this.contentElements = idArray.map(el => document.getElementById(el))
    },

    initObserver() {
      const rootElement = document.getElementById("app")
      const options = {
        root: rootElement,
        threshold: [...Array(100)].map((el, index) => (0.01 * index).toFixed(2)),
      }

      const handleIntersectionEvent = entries => {
        entries.forEach(entry => {
          if (entry.target.id === this.componentId) {
            this.component.intersectionRatio = this.fetchIntersectionRatio(entry)
            if (entry.intersectionRatio > 0.1) {
              this.$emit("active", this.componentId)
            }
          }
        })
      }
      this.observer = new IntersectionObserver(handleIntersectionEvent, options)
      this.contentElements.forEach(el => this.observer.observe(el))
    },

    fetchIntersectionRatio(entry) {
      const ratio = Number(entry.intersectionRatio.toFixed(2))
      return ratio
    },
  },
}
</script>

<style lang="scss" scoped>
.component-container {
  width: 100%;
  max-width: 100vw;

  .content {
    height: 100%;
    width: 100%;
    position: relative;
    max-width: 100vw;
  }
}
</style>
