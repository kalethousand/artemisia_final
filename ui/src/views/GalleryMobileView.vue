<template>
  <div class="gallery-mobile-view-container">
    <ContentTransition
      :is-active="galleryContentIsActive"
      no-translate-y
      container-id="gallery-mobile-content"
      class="gallery-mobile-content"
    >
      <div id="gallery-mobile-carousel" class="gallery-mobile-container">
        <v-carousel
          :continuous="false"
          :cycle="cycle"
          hide-delimiter-background
          show-arrows-on-hover
          height="100%"
          @change="event => handleCarouselEvent(event)"
        >
          <v-carousel-item transition="fade-transition" reverse-transition="fade-transition">
            <AngelaGraham :active="galleryContent.isVisible" :is-mobile="isMobile" class="gallery-mobile-slide" />
          </v-carousel-item>
          <v-carousel-item transition="fade-transition" reverse-transition="fade-transition">
            <CaitlinDillion :is-mobile="isMobile" class="gallery-mobile-slide" />
          </v-carousel-item>
          <v-carousel-item transition="fade-transition" reverse-transition="fade-transition">
            <ElyseScott :is-mobile="isMobile" class="gallery-mobile-slide" />
          </v-carousel-item>
          <v-carousel-item transition="fade-transition" reverse-transition="fade-transition">
            <TiannaZane :is-mobile="isMobile" class="gallery-mobile-slide" />
          </v-carousel-item>
          <v-carousel-item transition="fade-transition" reverse-transition="fade-transition">
            <WynneBirthday :is-mobile="isMobile" class="gallery-mobile-slide" />
          </v-carousel-item>
          <v-carousel-item transition="fade-transition" reverse-transition="fade-transition">
            <SavannahShoot :is-mobile="isMobile" class="gallery-mobile-slide" />
          </v-carousel-item>
        </v-carousel>
      </div>
    </ContentTransition>
  </div>
</template>

<script>
import ContentTransition from "@/components/Transitions/ContentTransition.vue"
import AngelaGraham from "@/components/GalleryComponents/AngelaGraham.vue"
import CaitlinDillion from "@/components/GalleryComponents/CaitlinDillion.vue"
import ElyseScott from "@/components/GalleryComponents/ElyseScott.vue"
import TiannaZane from "@/components/GalleryComponents/TiannaZane.vue"
import WynneBirthday from "@/components/GalleryComponents/WynneBirthday.vue"
import SavannahShoot from "@/components/GalleryComponents/SavannahShoot.vue"

export default {
  components: { ContentTransition, AngelaGraham, CaitlinDillion, ElyseScott, TiannaZane, WynneBirthday, SavannahShoot },
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
    idArray: ["gallery-mobile-content"],
    activeSlide: null,
    contentElements: null,
    cycle: false,
    observer: null,
    galleryContent: {
      intersectionRatio: null,
      isVisible: false,
    },
  }),
  computed: {
    galleryContentIsActive() {
      if (this.galleryContent.isVisible) return true
      return false
    },
  },
  mounted() {
    this.fetchContentElements()
    this.initObserver()
  },
  methods: {
    fetchContentElements() {
      // const idArray = [`gallery-mobile-view`]
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
          if (entry.target.id === `gallery-mobile-content`) {
            this.galleryContent.intersectionRatio = this.fetchIntersectionRatio(entry)
            this.galleryContent.isVisible = this.entryVisible(entry.intersectionRatio)
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
    handleCarouselEvent(event) {
      this.activeSlide = event
    },
  },
}
</script>
<style lang="scss" scoped>
.gallery-mobile-view-container {
  height: 200vh;
  width: 100%;
  position: relative;
  z-index: 6;

  .gallery-mobile-content {
    height: 180rem;
    width: 100%;
    position: absolute;
    top: -10rem;

    .gallery-mobile-container {
      height: 120rem;
      width: 100%;
      position: sticky;
      top: 15vh;
      opacity: 1;
      transition-delay: 0.5s;
      transition: 0.5s;
    }
  }
}

.gallery-mobile-carousel {
  opacity: 0;
  height: 60%;
  transition-delay: 0.5s;
  transition: 0.5s;
}

.active {
  opacity: 1;
  transform: translateY(0px);
}

.active-carousel {
  opacity: 1;
}

::v-deep {
  .v-window__container {
    display: block;
  }
}
</style>
