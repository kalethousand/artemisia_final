<template>
  <div class="nav-drawer-container">
    <v-navigation-drawer
      :value="open"
      fixed
      temporary
      right
      width="100vw"
      class="navigation-drawer"
      color="var(--darker-green)"
      style="z-index: var(--z-index-navigation-drawer)"
      @input="handleInput"
    >
      <NavigationBtn :open="open" variety="open" @click="handleInput" />
      <NavigationAction
        :active="active"
        :anchors="anchors"
        :breakpoint="breakpoint"
        @navigation="handleNavigation"
        @close="handleInput(!open)"
      />
    </v-navigation-drawer>
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
  methods: {
    handleNavigation(value) {
      this.$emit("navigation", value)
      this.handleInput(!this.open)
    },
    handleInput(value) {
      this.$emit("navigation-open", value)
    },
  },
}
</script>
