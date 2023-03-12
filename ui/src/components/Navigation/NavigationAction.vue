<template>
  <div class="action-container">
    <div class="tabs-container" :style="setFlexStyles">
      <v-btn
        v-for="(anchor, index) in anchors"
        :key="index"
        text
        class="nav-menu"
        :style="setPadding"
        :class="{ active: active === anchor }"
        @click="handleNavigation(anchor)"
      >
        <div :class="`${breakpoint.name}-nav anchor-text`">{{ anchor }}</div>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
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
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isCompressed() {
      return this.isMobile
    },
    setFlexStyles() {
      if (this.isMobile) {
        return "justify-content: space-evenly; flex-direction: column; width: 100%; height: 40%;"
      }
      return "justify-content: flex-end;"
    },
    setPadding() {
      if (window.innerWidth < 1000) {
        return `padding: 0 0.4rem !important;`
      }
      return "padding: 0 0.8rem !important;"
    },
  },
  methods: {
    handleNavigation(value) {
      if (this.active !== value) {
        this.$emit("navigation", value)
      }
      this.$emit("close")
    },
  },
}
</script>

<style lang="scss" scoped>
.action-container {
  height: 100%;
  width: 100%;
  transition: 0.5s;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .tabs-container {
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
  }
}

.active {
  transition: 0.25s ease-in-out;
  transition-delay: 0.15s;
  position: relative;

  .anchor-text {
    color: var(--green) !important;
  }

  .anchor-text:before {
    content: "";
    background-color: var(--green);
    position: absolute;
    height: 0.5rem;
    width: 100% !important;
    z-index: 5;
    bottom: -1rem;
  }
}

.nav-menu {
  letter-spacing: 0.2rem;
  color: var(--beige) !important;
  margin: 1rem 1rem;
  transition: 0.25s ease-in-out;
  transition-delay: 0.15s;
  position: relative;

  .anchor-text {
    letter-spacing: 0.4rem;
  }

  .anchor-text:before {
    content: "";
    position: absolute;
    height: 0.5rem;
    width: 0;
    z-index: 5;
    bottom: -1rem;
    transition: 0.5s ease-in-out;
    transition-delay: 0.15s;
  }

  &:hover {
    color: var(--green);
  }
}

.dash-nav-btn {
  display: none;
}
</style>
