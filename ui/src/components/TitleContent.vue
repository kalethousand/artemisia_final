<template>
  <div class="title-text-container" :style="`${raiseZIndex}`">
    <div :class="setActiveClass('title-text-content')">
      <div :class="`${breakpoint.name}-title`" :style="`color: var(--beige); `">
        <TextTransition :intersection-ratio="intersectionRatio" variety="move-y" style="padding-left: 1rem">{{
          titleText
        }}</TextTransition>
      </div>
      <div :class="`${breakpoint.name}-subtitle`">
        <TextTransition
          v-if="isSubtitle"
          class="subtitle-content"
          :intersection-ratio="intersectionRatio"
          variety="move-y"
          :delay="0.5"
        >
          {{ subtitleText }}
        </TextTransition>
      </div>
    </div>
  </div>
</template>

<script>
import TextTransition from "./Transitions/TextTransition.vue"

export default {
  components: { TextTransition },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    titleText: {
      type: String,
      default: null,
    },
    removeTitleUnderline: {
      type: Boolean,
      default: false,
    },
    subtitleText: {
      type: String,
      default: null,
    },
    breakpoint: {
      type: Object,
      default: null,
    },
    intersectionRatio: {
      type: Number,
      default: null,
    },
    raiseTitleZIndex: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isSubtitle() {
      return this.subtitleText !== null
    },
    raiseZIndex() {
      if (this.raiseTitleZIndex) return "z-index: 10;"
      return ""
    },
  },
  methods: {
    setActiveClass(className) {
      if (this.isActive && !this.removeTitleUnderline) {
        return `${className} active`
      }
      if (this.isActive && this.removeTitleUnderline) {
        return `${className} active-no-underline`
      }
      return `${className}`
    },
  },
}
</script>

<style lang="scss" scoped>
.title-text-container {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: var(--z-index-title);

  .title-text-content {
    position: sticky;
    top: 10vh;
    opacity: 0;
    transition: 0.15s;
    padding-left: 1rem;
    font-family: "EmberlyLightItalic";
    letter-spacing: 0.03rem;
    font-weight: 100;
    line-height: 1;
  }

  .title-text {
    color: var(--beige);
  }

  .title-text-content-title::after {
    content: "";
    height: 0;
    width: 0;
    background-color: var(--beige);
    position: absolute;
    left: 0;
    animation: reverseTitleAccent 0.15s cubic-bezier(0.92, -0.03, 0.35, 1) forwards;
  }

  .active {
    opacity: 1;
    transform: translateY(0px);
  }

  .active-no-underline {
    opacity: 1;
    transform: translateY(0px);
  }

  .active::after {
    content: "";
    height: 2px;
    width: 0px;
    background-color: var(--beige);
    position: absolute;
    left: 0;
    animation: titleAccent 0.5s cubic-bezier(0.92, -0.03, 0.35, 1) forwards;
  }

  .subtitle-content {
    padding-left: 2rem;
    padding-bottom: 2rem;
  }

  @keyframes titleAccent {
    0% {
      height: 2px;
      width: 0px;
    }
    100% {
      height: 2px;
      width: 100%;
    }
  }

  @keyframes reverseTitleAccent {
    0% {
      height: 2px;
      width: 100%;
    }
    100% {
      height: 2px;
      width: 0px;
    }
  }
}
</style>
