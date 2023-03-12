<template>
  <v-textarea
    :value="value"
    :label="label"
    :auto-grow="autoGrow"
    :rows="`${rows}`"
    :row-height="`${rowHeight}`"
    :placeholder="placeholder"
    :class="`inquiry-textarea ${breakpoint}-input`"
    filled
    no-resize
    flat
    @input="handleInput($event)"
  >
    <template #label>
      <p v-if="label" class="text-input-label">
        {{ label }}
      </p>
    </template>
  </v-textarea>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    label: {
      type: String,
      default: "",
    },
    breakpoint: {
      type: Object,
      default: null,
    },
    value: {
      type: String,
      default: "",
    },
    rows: {
      type: Number,
      default: 6,
    },
    rowHeight: {
      type: Number,
      default: 20,
    },
    autoGrow: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    labelWrap: {
      type: Boolean,
      default: null,
    },
    mediumLabel: {
      type: Boolean,
      default: null,
    },
  },
  methods: {
    handleInput(value: string) {
      this.$emit("input", value)
    },
  },
})
</script>

<style lang="scss" scoped>
.inquiry-textarea {
  border-radius: 0 !important;

  ::v-deep {
    .v-label {
      max-width: 100%;
    }
    .v-input__slot::before {
      display: none;
    }
    .v-input__slot::after {
      display: none;
    }
    .v-label--active {
      transform: translateY(-0.6rem) scale(0.65);
    }

    .v-text-field__slot textarea {
      color: var(--beige) !important;
    }
  }
}

.label-wrap {
  ::v-deep {
    .v-label,
    .v-text-field,
    .v-text-field--solo {
      overflow: visible !important;
      text-overflow: clip;
      white-space: normal;
      top: 1rem !important;
      padding: 2rem;
    }
  }
}

.text-input-label {
  color: var(--beige);
  font-size: 1.4rem;
  // line-height: 2.2rem;
  font-weight: 400;
  // padding-left: 1rem;
}
</style>
