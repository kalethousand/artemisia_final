<template>
  <div class="text-cont" :style="`justify-content: ${justifyClass}`">
    <div :class="`text-${currentActivity}-${varietyClass} text`" :style="`${animationDelay}`">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { debounce } from "vue-debounce"

const ROTATE = "rotate"
const MOVE_Y = "move-y"

const START = "start"
const CENTER = "center"
const END = "end"

export default {
  props: {
    intersectionRatio: {
      type: Number,
      default: 0,
    },
    variety: {
      type: String,
      default: MOVE_Y,
    },
    delay: {
      type: Number,
      default: 0,
    },
    justify: {
      type: String,
      default: START,
    },
  },
  data: () => ({
    activeValue: -1,
  }),

  computed: {
    currentActivity() {
      if (this.activeValue === -1) {
        return "before-active"
      }

      if (this.activeValue === 1) {
        return "after-active"
      }
      return "active"
    },
    varietyClass() {
      if (this.variety === ROTATE) {
        return "rotate"
      }
      return "move-y"
    },
    animationDelay() {
      if (this.currentActivity === "active" || this.currentActivity === "before-active") {
        return this.delay !== 0 ? `opacity: 0; animation-delay: ${this.delay}s` : ""
      }
      return ""
    },
    justifyClass() {
      if (this.variety === CENTER) {
        return "center"
      }
      if (this.variety === END) {
        return "end"
      }
      return "start"
    },
  },
  watch: {
    intersectionRatio(currentValue, previousValue) {
      this.debouncedWatch(currentValue, previousValue)
    },
  },
  created() {
    this.debouncedWatch = debounce((newValue, oldValue) => {
      this.activeValue = this.findActiveValue(newValue, oldValue, this.activeValue)
    }, 100)
  },
  beforeUnmount() {
    this.debouncedWatch.cancel()
  },
  methods: {
    findActiveValue(currentValue, previousValue, activeValue) {
      if (currentValue >= 0.49) {
        return 0
      }
      if (currentValue > previousValue && currentValue < 0.5) {
        return activeValue >= 1 ? 1 : activeValue + 1
      }
      if (currentValue < previousValue && currentValue < 0.5) {
        return activeValue <= -1 ? -1 : activeValue - 1
      }
      if (currentValue === 0) {
        return -1
      }
      return 0
    },
  },
}
</script>

<style lang="scss" scoped>
.text-cont {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  overflow: hidden;
}
.text {
  // font-size: 6rem;
  color: var(--beige);
  // line-height: 6rem;
  transition: 0.5s ease-in-out;
}
.text-active-rotate {
  opacity: 0;
  animation: textRotateAfterActive 0.5s cubic-bezier(0.92, -0.03, 0.35, 1) forwards;
}

.text-before-active-rotate {
  animation: textRotateBeforeActive 0.5s cubic-bezier(0.92, -0.03, 0.35, 1) forwards;
}

.text-after-active-rotate {
  animation: textRotateAfterActive 0.5s cubic-bezier(0.92, -0.03, 0.35, 1) forwards;
}

.text-active-move-y {
  animation: textMoveYAfterActive 0.5s cubic-bezier(0.92, -0.03, 0.35, 1) forwards;
}

.text-before-active-move-y {
  animation: textMoveYBeforeActive 0.5s cubic-bezier(0.92, -0.03, 0.35, 1) forwards;
}

.text-after-active-move-y {
  animation: textMoveYAfterActive 0.5s cubic-bezier(0.92, -0.03, 0.35, 1) forwards;
}

@keyframes textMoveYAfterActive {
  0% {
    transform: translateY(4.5rem);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes textMoveYBeforeActive {
  0% {
    transform: translateY(0px);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-6rem);
  }
}

@keyframes textRotateAfterActive {
  0% {
    transform: translateY(4.5rem) rotate3d(1, 1, 1, -8deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes textRotateBeforeActive {
  0% {
    transform: translateY(0px);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-6rem) rotate3d(1, 1, 1, 4deg);
  }
}
</style>
