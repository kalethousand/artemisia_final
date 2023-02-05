<template>
  <div id="container" class="component-3-container">
    <div id="component3" class="component-3">
      <div id="component-content" class="content-container"></div>
      <div id="transition-container" class="transition-container">
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
    idArray: ["transition-container", "component-content"],
    contentElements: [],
    components: {
      container: {
        intersectionRatio: null,
        size: 1,
        top: null,
      },
      component3: {
        intersectionRatio: null,
        size: 1,
        top: null,
      },
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
      transition: {
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
        this.components.componentContent.intersectionRatio * 2 + this.components.transitionContainer.intersectionRatio

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
          // if (entry.target.id === "container") {
          //   this.components.container.intersectionRatio = this.fetchIntersectionRatio(entry, this.components.container)
          //   if (this.components.container.top === null) {
          //     this.components.container.top = entry.boundingClientRect.top
          //   }
          // }

          // if (entry.target.id === "component3") {
          //   this.components.component3.intersectionRatio = this.fetchIntersectionRatio(
          //     entry,
          //     this.components.component3
          //   )
          // }

          if (entry.target.id === "component-content") {
            this.components.componentContent.intersectionRatio = this.fetchIntersectionRatio(
              entry,
              this.components.componentContent
            )
            if (this.components.componentContent.top === null) {
              this.components.componentContent.top = entry.boundingClientRect.top
            }
          }

          if (entry.target.id === "transition-container") {
            this.components.transitionContainer.intersectionRatio = this.fetchIntersectionRatio(
              entry,
              this.components.transitionContainer
            )
          }

          // if (entry.target.id === "transition") {
          //   this.components.transition.intersectionRatio = this.fetchIntersectionRatio(
          //     entry,
          //     this.components.transition
          //   )
          //   if (this.components.transition.top === null) {
          //     this.components.transition.top = entry.boundingClientRect.top
          //   }
          // }
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
.component-3-container {
  height: 200vh;
  width: 100%;

  .component-3 {
    height: 100%;
    width: 100%;
    position: relative;

    .content-container {
      height: 100%;
      width: 100%;
      background-color: var(--dark-green);
      top: 0;
    }

    .transition-container {
      height: 100vh;
      width: 100%;
      position: absolute;
      overflow: hidden;
      bottom: 200vh;

      .transition {
        position: sticky;
        top: calc(100vh - 10%);
        height: 10%;
        width: 100%;
        overflow: hidden;

        .transition-content {
          border-radius: 100%;
          background-color: var(--green);
          height: 100%;
          position: absolute;
        }
      }
    }
  }
}
</style>
