<template>
  <div :id="transitionId" class="transition-container" :style="`${topPosition}; opacity: ${activeScale}`">
    <div class="transition" :style="`opacity: ${activeScale}`">
      <div class="transition-content" :style="``"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isPortrait: {
      type: Boolean,
      default: false,
    },
    transitionId: {
      type: String,
      required: true,
    },
    componentId: {
      type: String,
      required: true,
    },
    componentSize: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    observer: null,
    contentElements: [],
    component: {
      intersectionRatio: null,
      size: null,
      top: null,
    },
    transition: {
      intersectionRatio: null,
      size: 1,
      top: null,
    },
  }),
  computed: {
    topPosition() {
      return `top: ${this.componentSize}00vh`
    },
    activeScale() {
      return this.component.intersectionRatio + this.transition.intersectionRatio
    },
  },
  mounted() {
    this.fetchContentElements()
    this.initObserver()
  },
  methods: {
    fetchContentElements() {
      const idArray = [this.componentId, this.transitionId]
      this.contentElements = idArray.map(el => document.getElementById(el))
    },

    initObserver() {
      this.component.size = this.componentSize
      const rootElement = document.getElementById("app")
      const options = {
        root: rootElement,
        threshold: [...Array(100)].map((el, index) => (0.01 * index).toFixed(2)),
      }

      const handleIntersectionEvent = entries => {
        entries.forEach(entry => {
          if (entry.target.id === this.componentId) {
            this.component.intersectionRatio = this.fetchIntersectionRatio(entry, this.component)
          }

          if (entry.target.id === this.transitionId) {
            this.transition.intersectionRatio = this.fetchIntersectionRatio(entry, this.transition)
          }
        })
      }
      this.observer = new IntersectionObserver(handleIntersectionEvent, options)
      this.contentElements.forEach(el => this.observer.observe(el))
    },

    fetchIntersectionRatio(entry, object) {
      const ratio = Number(entry.intersectionRatio.toFixed(2)) * object.size
      return ratio
    },
  },
}
</script>

<style lang="scss" scoped>
.transition-container {
  height: 100vh;
  width: 100%;
  position: absolute;
  z-index: 3;
}
.transition {
  height: 200vh;
  background-color: rgba(11, 11, 11, 0.7);
  position: sticky;
  top: 0vh;
}
</style>
