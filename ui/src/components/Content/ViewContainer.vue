<template>
  <div :id="componentId" class="component" :style="`background-color: ${backgroundColor}`">
    <div :class="`component-content ${lowerZIndex ? 'lower-z-index' : ''}`">
      <div
        v-if="isTitle"
        :id="`${componentId}-title`"
        class="title-container"
        :style="`${titleContainerHeight}; ${titleContainerPosition}; background-color: ${backgroundColor}`"
      >
        <TitleContent
          :breakpoint="breakpoint"
          :intersection-ratio="title.intersectionRatio"
          :title-text="titleText"
          :is-active="title.isVisible"
          :subtitle-text="isSubtitle && subtitleText"
          :raise-title-z-index="raiseTitleZIndex"
          :remove-title-underline="removeTitleUnderline"
        />
      </div>
      <div :class="`${contentContainerClass}`" :style="`${contentContainerHeight}; ${contentContainerPosition}`">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import TitleContent from "@/components/TitleContent.vue"

export default {
  components: { TitleContent },
  props: {
    backgroundColor: {
      type: String,
      default: "transparent",
    },
    componentId: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isPortrait: {
      type: Boolean,
      default: false,
    },
    startLate: {
      type: Boolean,
      default: false,
    },
    holdAtTop: {
      type: Boolean,
      default: false,
    },
    titleText: {
      type: String,
      default: null,
    },
    removeTitleUnderline: {
      type: Boolean,
      default: false,
    },
    subtitleText: {
      type: String,
      default: null,
    },
    breakpoint: {
      type: Object,
      default: null,
    },
    componentSize: {
      type: Number,
      default: 1,
    },
    removeContentPadding: {
      type: Boolean,
      default: false,
    },
    lowerZIndex: {
      type: Boolean,
      default: false,
    },
    raiseTitleZIndex: {
      type: Boolean,
      default: false,
    },
    raiseZIndex: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    contentElements: null,
    observer: null,
    title: {
      intersectionRatio: null,
      isVisible: false,
    },
  }),
  computed: {
    isTitle() {
      return this.titleText !== null
    },

    isSubtitle() {
      return this.titleText !== null
    },

    titleContainerHeight() {
      return this.holdAtTop ? "height: 100vh" : "height: 75vh"
    },

    titleContainerPosition() {
      return this.startLate ? "top: 100vh" : "top: 0vh;"
    },

    contentContainerHeight() {
      if (this.holdAtTop && this.startLate) {
        const actualHeight = this.componentSize * 50
        return `height: ${actualHeight - 25}vh`
      }
      return this.holdAtTop ? `height: ${this.componentSize - 2}00vh` : `height: ${this.componentSize - 1}00vh`
    },

    contentContainerPosition() {
      return this.startLate ? "top: 125vh" : "top: 25vh;"
    },

    contentContainerClass() {
      if (this.removeContentPadding && this.raiseZIndex) {
        return "content-no-padding raised-z"
      }
      if (this.raiseZIndex) {
        return "content raised-z"
      }
      if (this.removeContentPadding) {
        return "content-no-padding"
      }
      return "content"
    },
  },
  mounted() {
    if (this.titleText !== null) {
      this.fetchContentElements()
      this.initObserver()
    }
  },
  methods: {
    fetchContentElements() {
      const idArray = [`${this.componentId}-title`]
      this.contentElements = idArray.map(el => document.getElementById(el))
    },
    initObserver() {
      const rootElement = document.getElementById(`app`)
      const options = {
        root: rootElement,
        threshold: [...Array(100)].map((el, index) => (0.01 * index).toFixed(2)),
      }
      const handleIntersectionEvent = entries => {
        entries.forEach(entry => {
          if (entry.target.id === `${this.componentId}-title`) {
            this.title.intersectionRatio = this.fetchIntersectionRatio(entry)
            this.title.isVisible = this.entryVisible(entry.intersectionRatio)
          }
        })
      }
      this.observer = new IntersectionObserver(handleIntersectionEvent, options)
      this.contentElements.forEach(el => this.observer.observe(el, options))
    },
    fetchIntersectionRatio(entry) {
      const ratio = Number(entry.intersectionRatio.toFixed(2))
      return ratio
    },
    entryVisible(intersectionRatio) {
      if (intersectionRatio >= 0.25) {
        return true
      }
      return false
    },
  },
}
</script>

<style lang="scss" scoped>
.component {
  height: 100%;
  width: 100%;
}

.component-content {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  border: 2px solid red;

  .title-container {
    width: 80%;
    position: absolute;
    left: 10%;
  }

  .content {
    width: 90%;
    height: 40vh;
    position: relative;
    top: 25vh;
    // left: 5%;
    margin: 0 auto;
    z-index: var(--z-index-content);
    // border: 2px solid blue;
    max-width: 1150rem;
  }

  .content-no-padding {
    width: 100%;
    height: 40vh;
    position: absolute;
    top: 0vh !important;
    left: 0%;
    z-index: var(--z-index-content);
  }

  .raised-z {
    z-index: var(--z-index-raised-content);
  }
}

.lower-z-index {
  z-index: 1 !important;
}
</style>
