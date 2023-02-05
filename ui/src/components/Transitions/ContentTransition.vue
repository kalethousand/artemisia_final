<template>
  <div :id="`${containerId}`" :class="setActiveClass('content-container')">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    containerId: {
      type: String,
      default: null,
    },
    noTranslateY: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    setActiveClass(className) {
      if (this.isActive && !this.noTranslateY) {
        return `${className} active`
      }
      if (this.isActive && this.noTranslateY) {
        return `${className}-fast active-no-translate`
      }
      return `${className}`
    },
  },
}
</script>

<style lang="scss" scoped>
.content-container {
  opacity: 0;
  transform: translateY(20px);
  transition: 0.35s;
  transition-delay: 0.85s;
}

.content-container-fast {
  opacity: 0;
  transform: translateY(20px);
  transition: 0.35s;
  transition-delay: 0.5s;
}
.active {
  opacity: 1;
  transform: translateY(0px);
}
.active-no-translate {
  opacity: 1;
  transition: 0.35s;
  transition-delay: 0.15s;
}
</style>
