<template>
  <div class="about-view-container">
    <ContentTransition :is-active="set1IsActive" container-id="about-content-set-1" class="about-content-set-1">
      <div id="about-image-1" :class="`about-background-image-container about-${backgroundImageActive}`">
        <div class="about-content-image"></div>
        <div class="about-background-image"></div>
      </div>
    </ContentTransition>
    <ContentTransition :is-active="set2IsActive" container-id="about-content-set-2" class="about-content-set-2">
      <div class="about-set-2">
        <div class="about-text-2">
          <p :class="`${breakpoint.name}-body-bold`">
            Born and raised Michigan gal and Wayne State Art History alumni. I'm a collector of history facts,
            documentary movies, lover of all critters and travel junkie. <br /><br />
          </p>
          <p :class="`${breakpoint.name}-body-bold about-detail`">
            I fell in love with weddings and floral design after planning my own wedding in 2018 and took the leap from
            bar wench to floral designer shortly after. <br /><br />Having spent my pre-flower career in the service
            industry, I love to meet new people and hear their stories of love, adventure or oddity.<br /><br />
            I look forward to helping you create a floral story uniquely you.
          </p>
        </div>
      </div>
    </ContentTransition>
  </div>
</template>

<script>
import ContentTransition from "@/components/Transitions/ContentTransition.vue"

export default {
  components: { ContentTransition },
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
    idArray: ["about-content-set-1", "about-image-1", "about-content-set-2"],
    contentElements: null,
    observer: null,
    about: {
      intersectionRatio: null,
      isVisible: false,
    },
    aboutContentSet1: {
      intersectionRatio: null,
      isVisible: false,
    },
    aboutImageSet1: {
      intersectionRatio: null,
      isVisible: false,
    },
    aboutContentSet2: {
      intersectionRatio: null,
      isVisible: false,
    },
  }),
  computed: {
    set1IsActive() {
      if (this.aboutContentSet1.isVisible) return true
      return false
    },
    backgroundImageActive() {
      if (this.aboutImageSet1.isVisible) return "background-active"
      return ""
    },
    // imageSet1IsActive() {
    //   if (this.aboutContentSet1.isVisible) return true
    //   return false
    // },

    set2IsActive() {
      if (this.aboutContentSet2.isVisible) return true
      return false
    },
  },
  mounted() {
    this.fetchContentElements()
    this.initObserver()
  },
  methods: {
    fetchContentElements() {
      // const idArray = [`about-view`]
      this.contentElements = this.idArray.map(el => document.getElementById(el))
    },
    initObserver() {
      const rootElement = document.getElementById(`app`)
      const options = {
        root: rootElement,
        threshold: [...Array(100)].map((el, index) => (0.01 * index).toFixed(2)),
      }
      const handleIntersectionEvent = entries => {
        entries.forEach(entry => {
          if (entry.target.id === `about-content-set-1`) {
            this.aboutContentSet1.intersectionRatio = this.fetchIntersectionRatio(entry)
            this.aboutContentSet1.isVisible = this.entryVisible(entry.intersectionRatio)
          }
          if (entry.target.id === `about-image-1`) {
            this.aboutImageSet1.intersectionRatio = this.fetchIntersectionRatio(entry)
            this.aboutImageSet1.isVisible = this.entryVisible(entry.intersectionRatio)
          }
          if (entry.target.id === `about-content-set-2`) {
            this.aboutContentSet2.intersectionRatio = this.fetchIntersectionRatio(entry)
            this.aboutContentSet2.isVisible = this.entryVisible(entry.intersectionRatio)
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
      if (intersectionRatio >= 0.3) {
        return true
      }
      return false
    },
  },
}
</script>
<style lang="scss" scoped>
.about-view-container {
  // border: 3px solid red;
  height: 300vh;
  width: 100%;
  position: relative;

  .about-content-set-1 {
    height: 130rem;
    width: 100%;
    padding-left: 5rem;
    position: absolute;
    top: 0;

    .about-background-image-container {
      height: 100vh;
      width: 100%;
      position: sticky;
      top: 29vh;
      opacity: 1;
      transition-delay: 0.5s;
      transition: 0.5s;
      max-width: 120rem;
      margin: 0 auto;
      // border: 3px solid black;
      // background-color: black;

      .about-content-image {
        position: absolute;
        top: 0;
        right: 0;
        // border: 1px solid blue;
        height: 110vh;
        width: 75%;
        background: url("../assets/images/kayteeBio/kayteeBioAssetImage.png");
        background-size: cover;
        background-repeat: no-repeat;
      }

      .about-background-image {
        // border: 2px solid purple;
        position: absolute;
        top: 0;
        right: 0;
        height: 115vh;
        width: 78%;
        background: url("../assets/images/kayteeBio/kayteeBioImageContainer.png");
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
  }

  .about-background-active {
    opacity: 1;
    transition: 0.15s;
  }

  .about-content-set-2 {
    // border: 1px solid blue;
    height: 120rem;
    width: 55%;
    max-width: 68rem;
    padding-left: 8%;
    position: absolute;
    top: 0;

    .about-set-2 {
      position: sticky;
      top: 35vh;
      display: flex;
      align-items: center;
      // border: 1px solid green;

      .about-text-2 {
        color: var(--beige);
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .about-detail {
          width: 45%;
          // border: 1px solid red;
        }
      }
    }
  }
}
</style>
