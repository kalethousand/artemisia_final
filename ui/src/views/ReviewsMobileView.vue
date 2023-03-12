<template>
  <div class="reviews-mobile-view-container">
    <div id="reviews-mobile-image-1" :class="`background-image-container ${backgroundImageActive}`">
      <div class="reviews-mobile-content-image"></div>
      <div class="reviews-mobile-background-image"></div>
    </div>
    <div class="reviews-mobile-text-container">
      <ContentTransition
        :is-active="set1IsActive"
        no-translate-y
        container-id="reviews-mobile-content-set-1"
        class="reviews-mobile-content-set-1"
      >
        <div class="reviews-mobile-set-1">
          <div class="reviews-mobile-text1">
            <p :class="`${breakpoint.name}-body-bold`">
              Our wedding in 2021 was exceptionally better thanks to Kaytee, with Artemisia. Dillon and I were so
              positively overwhelmed with how great the tables, bouquets, and the arbor looked. She NAILED our simple,
              natural, and classy style! Additionally, Kaytee was so understanding and flexible for so many covid
              wedding changes. Could not be happier with everything!<br /><br />
              P.S. we also bought Christmas wreaths from Artemisia and adored them.
            </p>
            <br />
            <h5 :class="`${breakpoint.name}-subtitle`">— Caitlin</h5>
          </div>
        </div>
      </ContentTransition>
      <ContentTransition
        :is-active="true"
        no-translate-y
        container-id="reviews-mobile-content-set-2"
        class="reviews-mobile-content-set-2"
      >
        <div :class="`reviews-mobile-set-2 ${set2IsActive}`">
          <div class="reviews-mobile-text2">
            <p :class="`${breakpoint.name}-body-bold`">
              We hired Kaytee for our July 2021 wedding and she went above and beyond what our floral vision was and it
              was better than we could have imagined. Every aspect was perfect from the bouquets, arch decor,
              centerpieces, to the extra details she added (sprig of greenery with menus and on our welcome sign!). We
              live out of state and she was so easy to work with and very responsive. At the end of our wedding she even
              offered to dry and press my bridal bouquet as an extra service because I had no way of taking it on the
              plane with me. Her service and skill is exceptional and we will be recommending her services to our family
              and friends in Michigan! Thank you, Kaytee!
            </p>
            <br />
            <h5 :class="`${breakpoint.name}-subtitle`">— Nicole</h5>
          </div>
        </div>
      </ContentTransition>
    </div>
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
    idArray: ["reviews-mobile-content-set-1", "reviews-mobile-image-1", "reviews-mobile-content-set-2"],
    contentElements: null,
    observer: null,
    reviews: {
      intersectionRatio: null,
      isVisible: false,
    },
    reviewsContentSet1: {
      intersectionRatio: null,
      isVisible: false,
    },
    reviewsImageSet1: {
      intersectionRatio: null,
      isVisible: false,
    },
    reviewsContentSet2: {
      intersectionRatio: null,
      isVisible: false,
    },
  }),
  computed: {
    set1IsActive() {
      if (this.reviewsContentSet1.isVisible) return true
      return false
    },
    backgroundImageActive() {
      if (this.reviewsImageSet1.isVisible) return "background-active"
      return ""
    },
    imageSet1IsActive() {
      if (this.reviewsContentSet1.isVisible) return true
      return false
    },

    set2IsActive() {
      if (this.reviewsContentSet2.isVisible) return "review-active"
      return ""
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
      const rootElement = document.getElementById(`app`)
      const options = {
        root: rootElement,
        threshold: [...Array(100)].map((el, index) => (0.01 * index).toFixed(2)),
      }
      const handleIntersectionEvent = entries => {
        entries.forEach(entry => {
          if (entry.target.id === `reviews-mobile-content-set-1`) {
            this.reviewsContentSet1.intersectionRatio = this.fetchIntersectionRatio(entry)
            this.reviewsContentSet1.isVisible = this.entryVisible(entry.intersectionRatio)
          }
          if (entry.target.id === `reviews-mobile-image-1`) {
            this.reviewsImageSet1.intersectionRatio = this.fetchIntersectionRatio(entry)
            this.reviewsImageSet1.isVisible = this.entryVisible(entry.intersectionRatio)
          }
          if (entry.target.id === `reviews-mobile-content-set-2`) {
            this.reviewsContentSet2.intersectionRatio = this.fetchIntersectionRatio(entry)
            this.reviewsContentSet2.isVisible = this.entryVisible(entry.intersectionRatio)
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
.reviews-mobile-view-container {
  height: 260vh;
  width: 100%;
  position: relative;

  .background-image-container {
    height: 180vh;
    width: 80vw;

    position: sticky;
    top: 0vh;
    opacity: 1;
    margin-left: 4.65vw;
    transition-delay: 0.5s;
    transition: 0.5s;

    .reviews-mobile-content-image {
      position: absolute;
      top: -10vh;
      left: -35vh;
      height: 320vh;
      width: 220vw;
      background: url("../assets/images/asset4/asset4Image.png");
      background-repeat: no-repeat;
      background-size: contain;
    }

    .reviews-mobile-background-image {
      position: relative;
      top: -10vh;
      left: -32vh;
      height: 320vh;
      width: 220vw;
      background: url("../assets/images/asset4/asset4Container.png");
      background-repeat: no-repeat;
      background-size: contain;
    }
  }

  .background-active {
    opacity: 1;
    transition: 0.15s;
  }

  .reviews-mobile-content-set-1 {
    height: 90rem;
    width: 100%;
    position: absolute;
    top: -20vh;
    padding-top: 5vh;

    .reviews-mobile-set-1 {
      position: sticky;
      top: 20vh;
      display: flex;
      align-items: center;

      .reviews-mobile-text1 {
        color: var(--beige);
        width: 100%;
        max-width: 110rem;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }

  .reviews-mobile-content-set-2 {
    width: 100%;
    position: absolute;
    top: 90vh;

    .reviews-mobile-set-2 {
      position: sticky;
      top: 20vh;
      display: flex;
      align-items: center;
      opacity: 0;
      transition: 0.45s;

      .reviews-mobile-text2 {
        color: var(--beige);
        width: 100%;
        max-width: 110rem;
        margin: 0 auto;
        padding-top: 15rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
}

.review-active {
  opacity: 1 !important;
}
</style>
