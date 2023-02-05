<template>
  <div id="container" class="component-1-container">
    <div id="component1" class="component-1">
      <div id="component-content-1" class="content-container"></div>
      <div id="transition-container-1" class="transition-container">
        <div id="transition" class="transition" :style="`height: ${activeScale * 100}vw;`">
          <div
            class="transition-content"
            :style="`transform: scale(${activeScale}); width: ${activeScale * 100}vw; right: ${rightPosition};`"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      default: "transparent",
    },
  },
  data: () => ({
    observer: null,
    idArray: ["transition-container-1", "component-content-1"],
    contentElements: [],
    components: {
      componentContent: {
        intersectionRatio: null,
        size: 2,
        top: null,
      },
      transitionContainer: {
        intersectionRatio: null,
        size: 1,
        top: null,
      },
    },
  }),
  computed: {
    isElementActive() {
      if (
        this.components.transitionContainer.intersectionRatio > 0.25 &&
        this.components.componentContent.intersectionRatio < 0.6
      ) {
        return "transition-container"
      }
      if (this.components.componentContent.intersectionRatio > 0.6) {
        return "componentContent"
      }
      return ""
    },

    activeScale() {
      const scale =
        2 * this.components.componentContent.intersectionRatio + this.components.transitionContainer.intersectionRatio

      return scale
    },

    rightPosition() {
      if (this.isPortrait) {
        const heightRatio = window.innerHeight / 100
        return this.getRightPosition(heightRatio)
      }
      const widthRatio = window.innerWidth / 100
      return this.getRightPosition(widthRatio)
    },
  },
  mounted() {
    this.fetchContentElements()
    this.initObserver()
  },

  methods: {
    fetchContentElements() {
      this.contentElements = this.idArray.map(el => document.getElementById(el))
    },

    initObserver() {
      const rootElement = document.getElementById("app")
      const options = {
        root: rootElement,
        threshold: [...Array(100)].map((el, index) => (0.01 * index).toFixed(2)),
      }

      const handleIntersectionEvent = entries => {
        entries.forEach(entry => {
          if (entry.target.id === "component-content-1") {
            this.components.componentContent.intersectionRatio = this.fetchIntersectionRatio(
              entry,
              this.components.componentContent
            )
            if (this.components.componentContent.top === null) {
              this.components.componentContent.top = entry.boundingClientRect.top
            }
          }

          if (entry.target.id === "transition-container-1") {
            this.components.transitionContainer.intersectionRatio = this.fetchIntersectionRatio(
              entry,
              this.components.transitionContainer
            )
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
  },
}
</script>

<style lang="scss" scoped>
.component-1-container {
  height: 200vh;
  width: 100%;

  .component-1 {
    height: 100%;
    width: 100%;
    position: relative;

    .content-container {
      height: 100%;
      width: 100%;
      background-color: var(--navy);
      top: 0;
    }

    .transition-container {
      height: 100vh;
      width: 100%;
      position: absolute;
      overflow: hidden;
      top: 200vh;

      .transition {
        position: sticky;
        top: 0vh;
        height: 10%;
        width: 100%;
        overflow: hidden;

        .transition-content {
          border-radius: 100%;
          background-color: var(--navy);
          height: 100%;
          position: absolute;
          top: -80vh;
        }
      }
    }
  }
}
</style>
