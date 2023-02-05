<template>
  <div
    :id="transitionId"
    class="transition-container"
    :style="`${containerPosition}; ${overflow}; ${transitionHeight}`"
  >
    <div class="transition" :style="`height: ${containerScale}; ${transitionPosition}; right: ${rightPosition};`">
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
    transitionHeight() {
      return `height: ${this.transitionSize}00vh`
    },
    activeScale() {
      if (this.variety === CIRCLE_OUT) {
        const ratio = this.component.intersectionRatio + this.transition.intersectionRatio
        if (ratio > 0.5) {
          const updatedRatio = ratio - 0.5
          return 2.5 * updatedRatio
        }
        return 0
      }
      if (this.variety === CIRCLE_IN) {
        const ratio = this.transition.intersectionRatio + this.component.intersectionRatio
        if (ratio > 0.5) {
          const updatedRatio = ratio - 0.5
          return 2.5 * updatedRatio
        }
        return 0
      }
      return 0
    },

    containerScale() {
      return this.isPortrait ? `${this.activeScale * 100}vh` : `${this.activeScale * 100}vw`
    },

    rightPosition() {
      if (this.isPortrait) {
        const heightRatio = window.innerHeight / 100
        return this.getRightPosition(heightRatio)
      }
      const widthRatio = window.innerWidth / 100
      return this.getRightPosition(widthRatio)
    },

    containerPosition() {
      if (this.variety === CIRCLE_OUT) {
        return `top: ${this.transitionSize * 2}00vh`
      }
      return `bottom: ${this.transitionSize * 2}00vh`
    },

    transitionPosition() {
      if (this.variety === CIRCLE_OUT) {
        const scale = this.activeScale * 100
        if (this.isPortrait) {
          return "top: 0vh"
        }
        return `top: ${100 - scale}vh`
      }
      return "top: 0vh"
    },

    contentPosition() {
      if (this.variety === CIRCLE_OUT) {
        if (this.isPortrait) {
          const scale = this.activeScale * 100
          const difference = 100 - scale
          return `top: ${difference * 0.44}vh`
        }

        const scale = this.activeScale * 100
        const objectHeight = this.activeScale * window.innerWidth
        if (objectHeight > window.innerHeight) {
          return `${this.getTopOffset(objectHeight)}`
        }
        return `top: ${scale * 0.44}vh`
      }
      const scale = this.activeScale * 100
      if (this.isPortrait) {
        return `top: -8vh`
      }
      return `top: -${scale * 0.44}vh`
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
      const amountOutsideContent = window.innerWidth - currentPixelWidth
      const result = amountOutsideContent / 2
      return `${result}px`
    },

    getTopOffset(objectHeight) {
      const scale = this.activeScale * 44
      const difference = objectHeight - window.innerHeight
      const convertToPx = window.innerHeight / 100
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

  .transition {
    position: sticky;
    height: 100%;
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
