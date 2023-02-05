<template>
  <div id="home-view" class="home-view-container">
    <div class="home-content-container">
      <LogoContainer :is-mobile="isMobile" />
    </div>
    <div class="home-background-container"></div>
  </div>
</template>

<script>
import LogoContainer from "@/components/Logo/LogoContainer.vue"
// import TextTransition from "@/components/Transitions/TextTransition.vue"

export default {
  components: { LogoContainer },
  // components: { TextTransition },
  props: {
    isPortrait: {
      type: Boolean,
      default: false,
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
    breakpoint: {
      type: Object,
      default: null,
    },
    componentSize: {
      type: Number,
      default: 1,
    },
  },
  data: () => ({
    contentElements: null,
    observer: null,
    home: {
      intersectionRatio: null,
      isVisible: false,
    },
  }),
  computed: {
    isActive() {
      if (this.home.isVisible) return true
      return false
    },
  },
  mounted() {
    this.fetchContentElements()
    this.initObserver()
  },
  methods: {
    fetchContentElements() {
      const idArray = [`home-view`]
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
          if (entry.target.id === `home-view`) {
            this.home.intersectionRatio = this.fetchIntersectionRatio(entry)
            this.home.isVisible = this.entryVisible(entry.intersectionRatio)
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
.home-view-container {
  height: 200vh;
  width: 100%;
  // border: 2px solid green;
  // position: relative;

  .home-content-container {
    // position: absolute;
    border: 3px solid green;
    background: linear-gradient(to top left, rgba(0, 11, 17, 0.2), transparent 100%),
      linear-gradient(to bottom right, rgba(0, 11, 17, 0.5), transparent 100%),
      url("../assets/flowerImages/AG-13.jpg") no-repeat, center;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    // height: 150vh;
    height: 100%;
    width: 100%;
    background-color: red;
    overflow-y: hidden;
    overflow-x: hidden;
  }

  .home-background-container {
    background-color: var(--orange);
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0vh;
    animation: top 2s cubic-bezier(0.92, -0.03, 0.35, 1) forwards;
    animation-delay: 3s;
  }
}

@keyframes top {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
