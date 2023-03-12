<template>
  <div class="artemisia-mobile-view-container">
    <ContentTransition
      :is-active="set1IsActive"
      container-id="artemisia-mobile-content-set-1"
      class="artemisia-mobile-content-set-1"
    >
      <div class="artemisia-mobile-set-1">
        <div class="artemisia-mobile-text1">
          <p :class="`${breakpoint.name}-body`">
            The name Artemisia has a three tier meaning. Artemisia represents feelings and aesthetics that bring a well
            rounded, versatility and uniqueness to my design.
          </p>
        </div>
        <ImageTransition
          id="artemisia-mobile-image-1"
          :is-active="imageSet1IsActive"
          class="artemisia-mobile-image1"
          content-image="asset1/assetImage1.png"
          container-image="asset1/asset1Container.png"
        />
      </div>
    </ContentTransition>
    <ContentTransition
      :is-active="true"
      container-id="artemisia-mobile-content-set-2"
      class="artemisia-mobile-content-set-2"
    >
      <div class="artemisia-mobile-set-2">
        <div class="artemisia-mobile-text2">
          <p :class="`${breakpoint.name}-body`" style="padding-bottom: 2rem">
            Artemisia the painter (Artemisia Gentileschi) painting during the 17th century, she was influenced by the
            dark baroque style, her rich colors are romantic and moody. Artemisia painted strong allegorical women in a
            time when women were not allowed to paint. She was a survivor and a radical.
          </p>
          <p :class="`${breakpoint.name}-body`" style="padding-bottom: 2rem">
            Artemisia the goddess; a strong feminine figure. She is goddess of the moon, the hunt and wild animals. She
            represents strength and grace. She embodies a natural, organic, wild and feminine style.
          </p>
          <p :class="`${breakpoint.name}-body`">
            Artemisia the plant; A nod to my years behind a bar. Artemisia is of the daisy family but notoriously known
            as Artemisia absinthium or wormwood in Absinthe. From the Middle Ages to now it has been used in spirits,
            wine, bitters, and as a replacement for hops. It is historical, versatile, organic and rooted in culture and
            sharing.
          </p>
        </div>
      </div>
    </ContentTransition>
    <ContentTransition
      :is-active="true"
      container-id="artemisia-mobile-content-set-3"
      class="artemisia-mobile-content-set-3"
    >
      <div class="artemisia-mobile-set-3">
        <div class="artemisia-mobile-image2">
          <ImageTransition
            id="artemisia-mobile-image-2"
            :is-active="imageSet2IsActive"
            class="artemisia-mobile-image-2"
            content-image="asset2/assetImage2.png"
            container-image="asset2/asset2Container.png"
          />
        </div>
      </div>
    </ContentTransition>
    <ContentTransition
      :is-active="true"
      container-id="artemisia-mobile-content-set-4"
      class="artemisia-mobile-content-set-4"
    >
      <div class="artemisia-mobile-set-4">
        <div class="artemisia-mobile-text4">
          <p :class="`${breakpoint.name}-body`">
            I channel these influences into my design work with flowers to create something unique. The crossroad
            between art and history is where great stories and moments are born. I want each design and every flower to
            tell its distinct story. That story starts here!
          </p>
        </div>
        <ImageTransition
          id="artemisia-mobile-image-3"
          :is-active="imageSet3IsActive"
          class="artemisia-mobile-image-3"
          content-image="asset3/assetImage3.png"
          container-image="asset3/asset3container.png"
        />
      </div>
    </ContentTransition>
  </div>
</template>

<script>
import ContentTransition from "@/components/Transitions/ContentTransition.vue"
import ImageTransition from "@/components/Transitions/ImageTransition.vue"

export default {
  components: { ContentTransition, ImageTransition },
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
    idArray: [
      "artemisia-mobile-content-set-1",
      "artemisia-mobile-image-1",
      "artemisia-mobile-image-2",
      "artemisia-mobile-image-3",
    ],
    contentElements: null,
    observer: null,
    artemisia: {
      intersectionRatio: null,
      isVisible: false,
    },
    artemisiaContentSet1: {
      intersectionRatio: null,
      isVisible: false,
    },
    artemisiaImageSet1: {
      intersectionRatio: null,
      isVisible: false,
    },
    artemisiaImageSet2: {
      intersectionRatio: null,
      isVisible: false,
    },
    artemisiaImageSet3: {
      intersectionRatio: null,
      isVisible: false,
    },
  }),
  computed: {
    set1IsActive() {
      if (this.artemisiaContentSet1.isVisible) return true
      return false
    },
    imageSet1IsActive() {
      if (this.artemisiaImageSet1.isVisible) return true
      return false
    },
    imageSet2IsActive() {
      if (this.artemisiaImageSet2.isVisible) return true
      return false
    },
    imageSet3IsActive() {
      if (this.artemisiaImageSet3.isVisible) return true
      return false
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
          if (entry.target.id === `artemisia-mobile-content-set-1`) {
            this.artemisiaContentSet1.intersectionRatio = this.fetchIntersectionRatio(entry)
            this.artemisiaContentSet1.isVisible = this.entryVisible(entry.intersectionRatio)
          }
          if (entry.target.id === `artemisia-mobile-image-1`) {
            this.artemisiaImageSet1.intersectionRatio = this.fetchIntersectionRatio(entry)
            this.artemisiaImageSet1.isVisible = this.entryVisible(entry.intersectionRatio)
          }
          if (entry.target.id === `artemisia-mobile-image-2`) {
            this.artemisiaImageSet2.intersectionRatio = this.fetchIntersectionRatio(entry)
            this.artemisiaImageSet2.isVisible = this.entryVisible(entry.intersectionRatio)
          }
          if (entry.target.id === `artemisia-mobile-image-3`) {
            this.artemisiaImageSet3.intersectionRatio = this.fetchIntersectionRatio(entry)
            this.artemisiaImageSet3.isVisible = this.entryVisible(entry.intersectionRatio)
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
.artemisia-mobile-view-container {
  height: 500vh;
  width: 100%;
  position: relative;

  .artemisia-mobile-content-set-1 {
    height: 170rem;
    width: 100%;
    margin-bottom: 10rem;

    .artemisia-mobile-set-1 {
      position: sticky;
      top: 25vh;
      display: flex;
      align-items: center;
      flex-direction: column;

      .artemisia-mobile-text1 {
        color: var(--beige);
        width: 100%;
        padding: 0rem 2.75rem;
        display: flex;
        justify-content: center;
      }

      .artemisia-mobile-image1 {
        width: 200%;
        height: 200%;
        position: relative;
        top: 0rem;
      }
    }
  }

  .artemisia-mobile-content-set-2 {
    height: 75rem;
    width: 100%;
    display: flex;

    .artemisia-mobile-set-2 {
      height: 225rem;
      position: sticky;
      top: 0vh;
      width: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      .artemisia-mobile-text2 {
        color: var(--beige);
        width: 100%;
        height: 100%;
        padding: 0rem 2.75rem;
      }
    }
  }

  .artemisia-mobile-content-set-3 {
    height: 70rem;
    width: 100%;
    display: flex;

    .artemisia-mobile-set-3 {
      height: 70rem;
      position: sticky;
      top: 0vh;
      width: 100%;
      display: flex;
      align-items: center;

      .artemisia-mobile-image2 {
        width: 140%;
        height: 140%;
        position: relative;
        left: 10%;
        display: flex;
      }
    }
  }

  .artemisia-mobile-content-set-4 {
    height: 100rem;
    width: 100%;
    display: flex;

    .artemisia-mobile-set-4 {
      height: 85rem;
      position: sticky;
      top: 0vh;
      width: 100%;

      .artemisia-mobile-text4 {
        color: var(--beige);
        width: 100%;
        margin: 0 auto;
        padding: 3rem 2.75rem 8rem 2.75rem;
      }

      .artemisia-mobile-image-3 {
        width: 35rem;
        height: 35rem;
        margin: auto;
      }
    }
  }
}
</style>
