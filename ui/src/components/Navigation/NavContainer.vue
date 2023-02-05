<template>
  <div class="navigation-container d-flex justify-center align-center">
    <NavigationBtn v-if="isNavigationCompressed" :open="open" variety="closed" @click="handleOpenNavigation" />
    <div v-else class="nav-action-container">
      <NavigationAction :active="active" :anchors="anchors" :breakpoint="breakpoint" @navigation="handleNavigation" />
    </div>
  </div>
</template>

<script>
import NavigationAction from "./NavigationAction.vue"
import NavigationBtn from "./NavigationBtn.vue"

export default {
  components: { NavigationAction, NavigationBtn },
  props: {
    anchors: {
      type: Array,
      default: () => [],
    },
    active: {
      type: String,
      default: null,
    },
    breakpoint: {
      type: Object,
      default: null,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    navigationDrawerOpen: false,
  }),
  computed: {
    isNavigationCompressed() {
      if (this.breakpoint.name === "sm" || this.breakpoint.name === "xs") {
        return true
      }
      return false
    },
    navigationDisplay() {
      if (this.isNavigationCompressed) {
        return "end"
      }
      return "center"
    },
    navigationButtonIconClass() {
      if (this.open) {
        return "nav-is-open"
      }
      return "nav-is-close"
    },
  },
  methods: {
    handleNavigation(value) {
      this.$emit("navigation", value)
    },
    handleOpenNavigation() {
      this.$emit("navigation-open", !this.open)
    },
  },
}
</script>

<style lang="scss" scoped>
.navigation-container {
  position: fixed;
  top: 0;
  width: 100vw;
  padding-right: 4vw;
  z-index: var(--z-index-navigation);

  .nav-action-container {
    width: 100%;
    height: 8vh;
  }
}
</style>
