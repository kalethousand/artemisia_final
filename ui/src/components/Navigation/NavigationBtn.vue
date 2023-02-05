<template>
  <div class="nav-btn-container d-flex justify-end align-end">
    <v-btn class="nav-btn" color="var(--beige)" outlined icon @click="handleClick(!open)">
      <v-icon v-if="open" color="var(--beige)" class="nav-open">{{ setBtnIcon }}</v-icon>
      <v-icon v-else color="var(--beige)" class="nav-closed">{{ setBtnIcon }}</v-icon>
    </v-btn>
  </div>
</template>

<script>
const OPEN = "open"
const CLOSED = "closed"

export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    variety: {
      type: String,
      default: OPEN,
    },
  },
  computed: {
    setBtnIcon() {
      if (this.variety === CLOSED) {
        return "mdi-menu"
      }
      return "mdi-close"
    },
  },
  methods: {
    handleClick(value) {
      this.$emit("click", value)
    },
  },
}
</script>

<style lang="scss" scoped>
.nav-btn-container {
  height: 8vh;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: var(--z-index-navigation);
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  .nav-btn {
    border: 0.2rem solid var(--beige);
    margin-right: 4.5vw;

    .nav-open {
      transition: 0.75s ease-in-out;
      transform: rotate(-180deg);
    }

    .nav-closed {
      transition: 0.75s ease-in-out;
      transform: rotate(180deg);
    }
  }
}
</style>
