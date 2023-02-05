<template>
  <div :id="intersectionId" class="circle-container" :style="`background-color: ${backgroundColor}; ${overflow};`">
    <div
      class="circle-content-container"
      :style="`width: ${containerScale}; height: ${containerScale}; ${topPositionNumber}; right: ${rightPosition};`"
    >
      <div
        class="circle-content"
        :style="`background-color: ${circleColor}; transform: scale(${contentScale}); top: -60%;`"
      ></div>
    </div>
  </div>
</template>

<script>
const CIRCLE_IN = "circle-in"
const CIRCLE_OUT = "circle-out"

export default {
  props: {
    ratio: {
      type: Number,
      default: 0,
    },
    nextItemRatio: {
      type: Number,
      default: 0,
    },
    active: {
      type: String,
      default: null,
    },
    backgroundColor: {
      type: String,
      default: "white",
    },
    circleColor: {
      type: String,
      default: "white",
    },
    variety: {
      type: String,
      default: CIRCLE_IN,
    },
    intersectionId: {
      type: String,
      default: "",
    },
    isPortrait: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    contentSize: 0,
    topPosition: 0,
    isVisible: true,
  }),
  computed: {
    isElementActive() {
      return this.active === this.intersectionId
    },

    overflow() {
      if (this.isElementActive) {
        return ""
      }
      return "overflow: hidden;"
    },
    contentScale() {
      if (this.variety === CIRCLE_OUT) {
        return this.isPortrait ? this.activeRatio * 1.5 : this.activeRatio * 1.2
      }
      const activeRatioScale = this.nextItemRatio * 2 + this.ratio
      return this.isPortrait ? activeRatioScale : activeRatioScale + 0.25
    },

    containerScale() {
      return this.isPortrait ? `${this.activeRatio * 100}vh` : `${this.activeRatio * 100}vw`
    },

    rightPosition() {
      if (this.isPortrait) {
        const heightRatio = window.innerHeight / 100
        return this.getRightPosition(heightRatio)
      }
      const widthRatio = window.innerWidth / 100
      return this.getRightPosition(widthRatio)
    },

    activeRatio() {
      if (this.variety === CIRCLE_OUT) {
        return 1 - this.nextItemRatio
      }
      return this.ratio
    },

    topPositionNumber() {
      if (this.variety === CIRCLE_OUT) {
        return ""
      }

      return "top: 100%;"
    },
  },
  methods: {
    getRightPosition(ratio) {
      const currentVh = this.activeRatio * 100
      const currentPixelWidth = currentVh * ratio
      const amountOutsideContent = currentPixelWidth - window.innerWidth
      const result = amountOutsideContent / 2
      return `${result}px`
    },
  },
}
</script>

<style lang="scss" scoped>
.circle-container {
  height: 100vh;
  max-height: 100vh;
  width: 100%;
  top: 0;
}

.circle-content-container {
  position: relative;
}

.circle-content {
  height: 100%;
  width: 100%;
  margin: 0 auto;
  position: absolute;
  border-radius: 100%;
}
</style>
