<template>
  <v-app id="app" class="app">
    <ContentContainer />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue"
import ContentContainer from "./components/Content/ContentContainer.vue"
import { getCssVariableValue } from "./util/getCssVariableValue"

export default Vue.extend({
  components: { ContentContainer },
  beforeMount() {
    this.$vuetify.theme.options.customProperties = true
    this.$vuetify.theme.themes.light.primary = getCssVariableValue("--primary")
    this.$vuetify.theme.themes.light.secondary = getCssVariableValue("--secondary")
    this.$vuetify.theme.themes.dark.primary = getCssVariableValue("--primary")
    this.$vuetify.theme.themes.dark.secondary = getCssVariableValue("--secondary")
    this.$vuetify.theme.themes.light.input = getCssVariableValue("--primary")
    this.$vuetify.theme.themes.light.background = getCssVariableValue("--beige")
  },
})
</script>

<style lang="scss">
@import url("./styles/_breakpoint-fontsize.scss");
@import url("./styles/_global.scss");
@import url("./styles/_color-palette.scss");
@import url("./styles/_z-indices.scss");
@import url("./styles/_fonts.scss");

#app {
  height: 100vh;
  width: 100vw;
  overflow-y: auto;
  overflow-x: hidden;

  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
