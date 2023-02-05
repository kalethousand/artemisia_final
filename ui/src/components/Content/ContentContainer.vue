<template>
  <div id="content-container" class="all-content">
    <NavContainer
      :active="activeElement"
      :anchors="anchors"
      :breakpoint="breakpoint"
      :open="navigationDrawerOpen"
      @navigation-open="handleOpenNavigation"
      @navigation="handleNavigation"
    />
    <NavDrawer
      :open="navigationDrawerOpen"
      :active="activeElement"
      :anchors="anchors"
      :breakpoint="breakpoint"
      @navigation="handleNavigation"
      @navigation-open="handleOpenNavigation"
    />
    <ComponentContainer component-id="home" :component-size="2" @active="handleActiveElement">
      <template #component>
        <ViewContainer
          :breakpoint="breakpoint"
          :component-size="2"
          component-id="home"
          :is-active="isActive('home')"
          background-color="transparent"
          :is-portrait="isPortrait"
          remove-content-padding
          lower-z-index
        >
          <HomeView :breakpoint="breakpoint" :component-size="4" :is-portrait="isPortrait" :is-mobile="isMobile" />
        </ViewContainer>
      </template>
    </ComponentContainer>

    <ComponentContainer component-id="artemisia" :component-size="6" @active="handleActiveElement">
      <template #component>
        <ViewContainer
          :breakpoint="breakpoint"
          component-id="artemisia"
          :component-size="6"
          :is-active="isActive('artemisia')"
          background-color="var(--darker-green)"
          :is-portrait="isPortrait"
          title-text="Who is Artemisia?"
          subtitle-text="/ˌɑːrtɪˈmiːziə/"
        >
          <ArtemisiaView :breakpoint="breakpoint" :component-size="6" :is-portrait="isPortrait" :is-mobile="isMobile" />
        </ViewContainer>
      </template>
      <template #transition>
        <CircleTransition2
          :is-portrait="isPortrait"
          variety="circle-out"
          circle-color="var(--darker-green)"
          transition-id="transition-2"
          component-id="artemisia"
          :window="window"
          :component-size="6"
        />
        <CircleTransition2
          :is-portrait="isPortrait"
          variety="circle-in"
          circle-color="var(--darker-green)"
          transition-id="transition-1"
          component-id="artemisia"
          higher-z-index
          :window="window"
          :component-size="6"
        />
      </template>
    </ComponentContainer>

    <ComponentContainer component-id="gallery" :component-size="3" @active="handleActiveElement">
      <template #component>
        <ViewContainer
          component-id="gallery"
          start-late
          :component-size="3"
          :breakpoint="breakpoint"
          :is-active="isActive('gallery')"
          background-color="var(--pink)"
          :is-portrait="isPortrait"
          title-text="Gallery"
          remove-title-underline
          raise-z-index
        >
          <GalleryView :breakpoint="breakpoint" :component-size="3" :is-portrait="isPortrait" :is-mobile="isMobile" />
        </ViewContainer>
      </template>
      <template #transition>
        <!-- <FadeOutTransition
          :is-portrait="isPortrait"
          component-id="gallery"
          :component-size="4"
          transition-id="transition-3"
        /> -->
        <CircleTransition2
          :is-portrait="isPortrait"
          variety="circle-out"
          circle-color="var(--pink)"
          transition-id="transition-4"
          component-id="gallery"
          :window="window"
          :component-size="3"
        />
      </template>
    </ComponentContainer>

    <ComponentContainer component-id="reviews" :component-size="3" @active="handleActiveElement">
      <template #component>
        <ViewContainer
          start-late
          :component-size="3"
          :breakpoint="breakpoint"
          component-id="reviews"
          background-color="var(--dark-pink)"
          title-text="Reviews"
          raise-title-z-index
        >
          <ReviewsView :breakpoint="breakpoint" :component-size="3" :is-portrait="isPortrait" :is-mobile="isMobile" />
        </ViewContainer>
      </template>
      <template #transition>
        <CenterCircleTransition2
          :is-portrait="isPortrait"
          variety="circle-out"
          circle-color="var(--dark-pink)"
          transition-id="transition-5"
          component-id="reviews"
          :window="window"
          :component-size="3"
        />
      </template>
    </ComponentContainer>

    <ViewComponent4 background-color="var(--navy)" />

    <ComponentContainer component-id="about" :component-size="4" @active="handleActiveElement">
      <template #component>
        <ViewContainer
          component-id="about"
          :component-size="4"
          :breakpoint="breakpoint"
          background-color="var(--light-orange)"
          title-text="Meet Kaytee"
        >
          <AboutView :breakpoint="breakpoint" :component-size="4" :is-portrait="isPortrait" :is-mobile="isMobile" />
        </ViewContainer>
      </template>
      <template #transition>
        <CircleTransition2
          :is-portrait="isPortrait"
          variety="circle-in"
          circle-color="var(--light-orange)"
          transition-id="transition-6"
          component-id="about"
          :window="window"
          :component-size="4"
        />
      </template>
    </ComponentContainer>

    <ComponentContainer component-id="inquire" :component-size="4" @active="handleActiveElement">
      <template #component>
        <ViewContainer
          component-id="inquire"
          :component-size="4"
          :breakpoint="breakpoint"
          background-color="var(--dark-green)"
          title-text="Inquiries"
        />

        <!-- </ViewContainer> -->
      </template>
      <template #transition>
        <CircleTransition2
          :is-portrait="isPortrait"
          variety="circle-in"
          circle-color="var(--dark-green)"
          transition-id="transition-7"
          component-id="inquire"
          higher-z-index
          :window="window"
          :component-size="4"
        />
      </template>
    </ComponentContainer>
    <div class="noisy" :style="`height: ${totalHeight}px`"></div>
  </div>
</template>

<script>
import ViewComponent4 from "@/views/ViewComponent4.vue"
// import ViewComponent2 from "@/views/ViewComponent2.vue"
import router from "@/router"
import HomeView from "@/views/HomeView.vue"
import ArtemisiaView from "@/views/ArtemisiaView.vue"
import ReviewsView from "@/views/ReviewsView.vue"
import AboutView from "@/views/AboutView.vue"
import GalleryView from "@/views/GalleryView.vue"
import ComponentContainer from "./ComponentContainer.vue"
import CenterCircleTransition2 from "../ScrollTransitions/CenterCircleTransition2.vue"
import CircleTransition2 from "../ScrollTransitions/CircleTransition2.vue"
// import FadeOutTransition from "../ScrollTransitions/FadeOutTransition.vue"
import NavContainer from "../Navigation/NavContainer.vue"
import ViewContainer from "./ViewContainer.vue"
import NavDrawer from "../Navigation/NavDrawer.vue"

export default {
  components: {
    ViewComponent4,
    ComponentContainer,
    CenterCircleTransition2,
    CircleTransition2,
    // FadeOutTransition,
    NavContainer,
    ViewContainer,
    // ViewComponent2,
    NavDrawer,
    HomeView,
    ArtemisiaView,
    ReviewsView,
    AboutView,
    GalleryView,
  },
  data: () => ({
    activeElement: null,
    anchors: ["home", "artemisia", "gallery", "reviews", "about", "inquire"],
    components: [],
    navigationDrawerOpen: false,
    window: {
      innerHeight: null,
      innerWidth: null,
    },
    totalHeight: 0,
  }),
  computed: {
    isPortrait() {
      return this.window.innerHeight > this.window.innerWidth
    },
    breakpoint() {
      return this.$vuetify.breakpoint
    },
    isMobile() {
      if (this.isPortrait) {
        return this.window.innerHeight < 845 && this.window.innerWidth < 400
      }
      return this.window.innerHeight < 400 && this.window.innerWidth < 845
    },
  },
  beforeMount() {
    window.addEventListener("resize", this.handleResize)
    window.addEventListener("popstate", e => this.handlePopState(e))
    this.handleResize()
  },
  mounted() {
    this.totalHeight = this.findTotalHeight()
    this.components = this.fetchComponentTops()
    if (this.components !== [] && window.location.href !== "http://localhost:8080") {
      const id = window.location.href.replace("http://localhost:8080/", "")
      const scrollAmount = this.setScrollAmount(id)
      const app = document.getElementById("app")
      app.scrollTo({ top: scrollAmount, left: 0 })
    }
  },
  methods: {
    handleResize() {
      this.window.innerHeight = window.innerHeight
      this.window.innerWidth = window.innerWidth

      if (this.components.length > 0) {
        this.components = this.fetchComponentTops()
      }
    },

    handleActiveElement(el) {
      if (this.activeElement !== el) {
        this.activeElement = el
        this.handleElementActiveHistoryChange(el)
      }
    },

    findTotalHeight() {
      const content = document.getElementById("content-container")
      const contentRect = content.getBoundingClientRect()
      return contentRect.height
    },

    isActive(componentId) {
      if (this.activeElement === componentId) {
        return true
      }
      return false
    },

    handleNavigation(id) {
      document.getElementById(id)
      this.scrollToSection(id)
    },

    scrollToSection(id) {
      const container = document.getElementById("app")
      const elTop = this.setScrollAmount(id)
      container.scrollTo({ top: elTop, left: 0, behavior: "smooth" })
      setTimeout(() => {}, 400)
    },

    setScrollAmount(id) {
      const el = this.components.filter(component => component.id === id)
      // if (id === "gallery") {
      //   const extraHeight = this.window.innerHeight * 0.75
      //   return el[0].top + extraHeight
      // }
      if (id === "gallery" || id === "reviews") {
        const extraHeight = this.window.innerHeight
        return el[0].top + extraHeight
      }
      return el[0]?.top
    },

    fetchComponentTops() {
      const contentElements = this.anchors.map(anchor => document.getElementById(anchor))
      const contentObjects = contentElements.map(el => {
        const contentTop = el.getBoundingClientRect().top
        const content = { id: el.id, top: contentTop }
        return content
      })
      return contentObjects
    },

    setupComponentTopsWithRouter() {
      const routes = router.getRoutes()
      for (let i = 0; i < routes.length; i += 1) {
        const route = routes[i]
        if (route.meta.id !== undefined) {
          const [contentElement] = this.components.filter(component => component.id === route.meta.id)
          routes[i].meta.topPosition = contentElement.top
        }
      }
    },

    handleElementActiveHistoryChange(componentId) {
      // eslint-disable-next-line no-restricted-globals
      router.push(`/${componentId}`).catch(() => {})
    },

    handlePopState(event) {
      const id = event.currentTarget.location.pathname.substring(1)
      document.getElementById(id)
      this.scrollToSection(id)
    },

    handleOpenNavigation(value) {
      setTimeout(() => {
        this.navigationDrawerOpen = value
      }, 600)
    },
  },
}
</script>

<style lang="scss" scoped>
.all-content {
  width: 100%;
}

.noisy {
  // border: 3px solid purple;
  background-image: url(data:image/png;base64,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);
  background-repeat: repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 4;
  opacity: 0.8;
  // display: none;
}
</style>
