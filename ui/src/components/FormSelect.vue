<template>
  <div class="inquiry-select">
    <v-select
      :value="value"
      :items="items"
      :label="label"
      filled
      color="var(--beige)"
      hide-details
      flat
      :attach="attach"
      :full-width="fullWidth"
      :menu-props="{ bottom: true, offsetY: true }"
      @input="handleInput($event)"
    >
      <template #label>
        <p :class="`text-input-label ${breakpoint.name}-input`">{{ label }}</p>
      </template>
      <template slot="item" slot-scope="data">
        <div class="select-item">{{ data.item.text }}</div>
      </template>
    </v-select>
  </div>
</template>
<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    items: {
      type: Array,
      required: true,
    },
    breakpoint: {
      type: Object,
      default: null,
    },
    label: {
      type: String,
      default: "",
    },
    fullWidth: {
      type: Boolean,
      default: null,
    },
    attach: {
      type: Boolean,
      default: true,
    },
    value: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    selectedItem: null,
  }),
  methods: {
    handleInput(value: string) {
      this.$emit("input", value)
    },
  },
})
</script>

<style lang="scss" scoped>
::v-deep {
  .v-select {
    border-radius: 0 !important;

    .v-input__slot {
      height: 5.6rem;
    }
    .v-input__slot::before,
    .v-input__slot::after {
      display: none;
    }
  }

  .v-list-item--active {
    background-color: var(--darker-green);
    .select-item {
      background-color: var(--dark-green);
    }
  }

  .v-menu__content {
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
    // box-shadow: none !important;
    max-height: 60rem !important;
  }
  .v-list {
    background: var(--darker-green) !important;
    padding: 2rem !important;
  }
}
.inquiry-select {
  border-radius: 0 !important;
  // color: white;
}
.select-item {
  font-size: 1.4rem;
  color: var(--beige);
}

.text-input-label {
  color: var(--beige);
  font-size: 1.4rem;
  line-height: 2.2rem;
  font-weight: 400;
}
</style>
