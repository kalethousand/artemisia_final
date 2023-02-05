<template>
  <div :id="transitionId" class="transition-container" :style="`${containerPosition}; ${overflow}; ${zIndex};`">
    <div class="transition" :style="`height: ${containerScale}; ${transitionPosition}; right: 0;`">
      <div
        class="transition-content"
        :style="`background-color: ${circleColor}; ${contentPosition}; width: ${containerScale}; right: ${rightPosition};`"
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
    transitionSize: {
      type: Number,
      default: 1,
    },
    window: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    observer: null,
    contentElements: [],
    component: {
      intersectionRatio: null,
      size: null,
    },
    transition: {
      intersectionRatio: null,
      size: 1,
    },
  }),
  computed: {
    activeScale() {
      if (this.variety === CIRCLE_OUT) {
        const ratio = this.transition.intersectionRatio + this.component.intersectionRatio
        return 1.5 * ratio
      }
      if (this.variety === CIRCLE_IN) {
        const ratio = this.transition.intersectionRatio + this.component.intersectionRatio
        return 1.5 * ratio
      }
      return 0
    },

    containerScale() {
      return this.isPortrait ? `${this.activeScale * 100}vh` : `${this.activeScale * 100}vw`
    },

    rightPosition() {
      if (this.isPortrait) {
        const heightRatio = this.window.innerHeight / 100
        return this.getRightPosition(heightRatio)
      }
      const heightRatio = this.window.innerWidth / 100
      return this.getRightPosition(heightRatio)
    },

    containerPosition() {
      if (this.variety === CIRCLE_OUT) {
        return `top: ${this.componentSize - 1}99vh`
      }
      return `bottom: ${this.componentSize - 1}99vh`
    },

    transitionPosition() {
      if (this.variety === CIRCLE_OUT) {
        const scale = this.activeScale * 100
        return this.isPortrait ? `top: ${155 - scale}vh` : `top: ${150 - scale}vh`
      }
      const scale = this.activeScale * 65
      return `top: ${-50 + scale}vh`
    },

    contentPosition() {
      const scale = this.activeScale * 100
      if (this.variety === CIRCLE_OUT) {
        return this.isPortrait ? `top: -${scale * 0.25}vh` : `top: -${scale * 0.25}vw`
      }
      return this.isPortrait ? `top: -${scale * 0.5}vh` : `top: -${scale * 0.5}vw`
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
      return this.variety === CIRCLE_OUT ? "z-index: 2" : "z-index: 1"
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
      this.transition.size = this.transitionSize
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
      const scale = this.activeScale * 44
      const difference = objectHeight - this.window.innerHeight
      const convertToPx = this.window.innerHeight / 100
      const convertToVh = difference / convertToPx
      return `top: ${scale - convertToVh}vh`
    },
  },
}
</script>

<style lang="scss" scoped>
.transition-container {
  height: 100vh;
  width: 100%;
  position: absolute;

  .transition-content-container {
    height: 100vh;
    width: 100%;
    top: 0;
  }

  .transition {
    position: absolute;
    height: 100%;
    min-height: 1px;
    width: 100%;

    .transition-content {
      border-radius: 100%;
      height: 100%;
      position: absolute;
      top: 0vh;
      margin: 0 auto;
    }
  }
}
</style>
