<template>
  <div class="component-4" :style="`background-color: ${backgroundColor}`"></div>
</template>

<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      default: "transparent",
    },
  },
}
</script>

<style lang="scss" scoped>
.component-4 {
  height: 200vh;
  width: 100%;
}
</style>
