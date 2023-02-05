<template>
  <div>
    <div id="view-comp-2" class="view-component-2">
      <div id="test-content" class="test-container">
        <TextTransition :intersection-ratio="test.intersectionRatio" variety="rotate"> HERE LIES </TextTransition>
        <TextTransition :intersection-ratio="test.intersectionRatio" variety="rotate" :delay="0.15">
          SQUIDWARD'S
        </TextTransition>
        <TextTransition :intersection-ratio="test.intersectionRatio" variety="rotate" :delay="0.3">
          HOPES &amp; DREAMS
        </TextTransition>
      </div>
    </div>
  </div>
</template>

<script>
import TextTransition from "@/components/Transitions/TextTransition.vue"

export default {
  components: { TextTransition },
  props: {
    isPortrait: {
      type: Boolean,
      default: false,
    },
    breakpoint: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    contentElements: null,
    observer: null,
    test: {
      intersectionRatio: null,
      isVisible: false,
    },
  }),
  computed: {
    isActive() {
      if (this.test.isVisible) return true
      return false
    },
  },
  mounted() {
    this.fetchContentElements()
    this.initObserver()
  },
  methods: {
    fetchContentElements() {
      const idArray = [`view-comp-2`]
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
          if (entry.target.id === `view-comp-2`) {
            this.test.intersectionRatio = this.fetchIntersectionRatio(entry)
            this.test.isVisible = this.entryVisible(entry.intersectionRatio)
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
    entryVisible(intersectionRatio) {
      if (intersectionRatio >= 0.5) {
        return true
      }
      return false
    },
  },
}
</script>

<style lang="scss" scoped>
.view-component-2 {
  height: 100vh;
  width: 100%;
  // border: 2px solid green;
  position: relative;

  .test-container {
    height: 20vh;
    width: 100%;
    // border: 2px solid orange;
    position: sticky;
    top: 25vh;
  }
}
</style>
