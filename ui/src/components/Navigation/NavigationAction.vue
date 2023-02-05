<template>
  <div class="action-container">
    <div class="tabs-container" :style="setFlexStyles">
      <v-btn
        v-for="(anchor, index) in anchors"
        :key="index"
        text
        class="nav-menu"
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
  },
  computed: {
    isCompressed() {
      if (this.breakpoint.name === "xs" || this.breakpoint.name === "sm") return true
      return false
    },
    setFlexStyles() {
      if (this.isCompressed) {
        return "justify-content: space-evenly; flex-direction: column; width: 100%; height: 40%;"
      }
      return "justify-content: flex-end;"
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
    height: 5px;
    width: 100% !important;
    z-index: 5;
    bottom: -10px;
  }
}

.nav-menu {
  letter-spacing: 2px;
  color: var(--beige) !important;
  margin: 0 1rem;
  transition: 0.25s ease-in-out;
  transition-delay: 0.15s;
  position: relative;

  .anchor-text {
    font-weight: 500;
    letter-spacing: 1.5px;
  }

  .anchor-text:before {
    content: "";
    position: absolute;
    height: 5px;
    width: 0px;
    z-index: 5;
    bottom: -10px;
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
