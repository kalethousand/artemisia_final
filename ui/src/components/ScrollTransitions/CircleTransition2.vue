<template>
  <div :id="transitionId" class="transition-container" :style="`${containerPosition}; ${zIndex};`">
    <div class="transition" :style="`height: ${containerScale}; ${transitionPosition}`">
      <div
        class="transition-content"
        :style="`background-color: ${circleColor}; transform: scale(${activeScale}); width: ${containerScale}; right: ${rightPosition}; ${contentPosition}`"
      ></div>
    </div>
  </div>
</template>

<script>
const CIRCLE_IN = "circle-in"
const CIRCLE_OUT = "circle-out"

export default {
  props: {
    variety: {
      type: String,
      default: CIRCLE_IN,
    },
    circleColor: {
      type: String,
      default: "white",
    },
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
    window: {
      type: Object,
      required: true,
    },
    higherZIndex: {
      type: Boolean,
      default: false,
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
    activeScale() {
      const componentRatio = this.component.intersectionRatio
      const transitionRatio = this.transition.intersectionRatio
      const combinedRatio = componentRatio + transitionRatio
      const scale = combinedRatio * 0.25
      return combinedRatio + scale
    },

    containerScale() {
      return this.isPortrait ? `${this.activeScale * 100}vh` : `${this.activeScale * 100}vw`
    },

    rightPosition() {
      if (this.isPortrait) {
        const heightRatio = this.window.innerHeight / 100
        return this.getRightPosition(heightRatio)
      }
      const widthRatio = this.window.innerWidth / 100
      return this.getRightPosition(widthRatio)
    },

    containerPosition() {
      if (this.variety === CIRCLE_OUT) {
        return `top: ${this.componentSize - 1}99vh`
      }
      return `bottom: ${this.componentSize - 1}99vh`
    },

    transitionPosition() {
      if (this.variety === CIRCLE_OUT) {
        return this.isPortrait ? `top: 0vh` : `top: 0vh`
      }
      return this.isPortrait ? `top: -5vh` : `top: 15vh`
    },

    contentPosition() {
      if (this.variety === CIRCLE_OUT) {
        const scale = this.activeScale * 100
        const elementHeight = this.activeScale * this.window.innerWidth
        const test = this.getTopOffset(elementHeight)
        return this.isPortrait ? `top: -${scale * 0.25}vh` : `${test}`
      }
      return this.isPortrait ? `top: 25vh` : "top: 2vh"
    },

    overflow() {
      if (this.variety === CIRCLE_OUT && this.component.intersectionRatio > 0) {
        return "overflow: hidden"
      }
      if (this.variety === CIRCLE_IN && this.component.intersectionRatio > 0) {
        return "overflow: hidden"
      }
      return ""
    },

    zIndex() {
      return this.variety === CIRCLE_OUT || this.higherZIndex ? "z-index: 2" : "z-index: 1"
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

    getRightPosition(ratio) {
      const currentVh = this.activeScale * 100
      const currentPixelWidth = currentVh * ratio
      const amountOutsideContent = this.window.innerWidth - currentPixelWidth
      const result = amountOutsideContent / 2
      return `${result}px`
    },

    getTopOffset(objectHeight) {
      if (objectHeight > this.window.innerHeight) {
        const difference = this.window.innerHeight - objectHeight
        const scale = this.activeScale * 10
        const conversionRatio = this.window.innerWidth / 100
        const convertToVh = difference / conversionRatio
        return `top: ${convertToVh - scale}vh`
      }
      const scale = this.activeScale * 10
      return `top: -${scale}vh`
    },
  },
}
</script>

<style lang="scss" scoped>
.transition-container {
  height: 100vh;
  width: 100%;
  position: absolute;

  .transition {
    position: sticky;
    width: 100%;
    z-index: var(--z-index-transition);

    .transition-content {
      border-radius: 100%;
      height: 100%;
      position: absolute;
    }
  }
}
</style>
