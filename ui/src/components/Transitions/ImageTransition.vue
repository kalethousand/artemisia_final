<template>
  <div class="image-container">
    <v-img
      :class="setActiveClass('image-main-content')"
      :src="require(`@/assets/images/${contentImage}`)"
      :max-height="contentMaxHeight"
      :max-width="contentMaxWidth"
      contain
      eager
    ></v-img>
    <v-img
      v-if="containerImage"
      class="image-main-container"
      :src="require(`@/assets/images/${containerImage}`)"
      contain
      eager
    ></v-img>
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    contentImage: {
      type: String,
      required: true,
    },
    contentMaxHeight: {
      type: String,
      default: null,
    },
    contentMaxWidth: {
      type: String,
      default: null,
    },
    containerImage: {
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
  },
  computed: {
    isSubtitle() {
      return this.subtitleText !== null
    },
  },
  methods: {
    setActiveClass(className) {
      if (this.isActive) {
        return `${className} image-active`
      }
      return `${className}`
    },
  },
}
</script>

<style lang="scss" scoped>
.image-container {
  position: relative;
  display: flex;
  overflow: hidden;

  .image-main-content {
    opacity: 0;
    transform: scale(1.1);
    transition-delay: 0.15s;
    transition: 0.5s;
  }

  .image-active {
    opacity: 1;
    transform: scale(1);
  }

  .image-main-container {
    height: 100%;
    width: 100%;
    position: absolute;
  }
}
</style>
