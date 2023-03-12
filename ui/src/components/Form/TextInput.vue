<template>
  <v-text-field
    v-mask="mask"
    :class="labelWrap ? 'inquiry-input label-wrap' : 'inquiry-input'"
    :value="value"
    :label="label"
    color="var(--beige)"
    flat
    filled
    hide-details
    :prefix="currency ? '$' : ''"
    :suffix="percentage ? '%' : ''"
    :on="on"
    :attrs="attrs"
    :readonly="readonly"
    :full-width="fullWidth"
    :type="type"
    :rules="required !== null ? [requiredRule] : []"
    @input="handleInput($event)"
    @keypress="numberOnly ? isNumber($event) : ''"
  >
    <template #label>
      <p
        v-if="label"
        :class="redLabel ? '${breakpoint.name}-input red-label ' : `text-input-label ${breakpoint.name}-input`"
        :style="smallLabel ? 'font-size: 1.4rem' : ''"
      >
        {{ label }}
      </p>
    </template>
  </v-text-field>
</template>

<script>
import Vue from "vue"
import { required as requiredRule } from "vuelidate/lib/validators"

const PHONE_MASK = "#(###)###-####"

export default Vue.extend({
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    smallLabel: {
      type: Boolean,
      default: null,
    },
    label: {
      type: String,
      default: "",
    },
    phone: {
      type: Boolean,
      default: null,
    },
    readonly: {
      type: Boolean,
      default: null,
    },
    fullWidth: {
      type: Boolean,
      default: null,
    },
    on: {
      type: Object,
      default: null,
    },
    attrs: {
      type: Object,
      default: null,
    },
    redLabel: {
      type: Boolean,
      default: null,
    },
    percentage: {
      type: Boolean,
      default: null,
    },
    currency: {
      type: Boolean,
      default: null,
    },
    labelWrap: {
      type: Boolean,
      default: null,
    },
    numberOnly: {
      type: Boolean,
      default: null,
    },
    animateLabel: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
    },
    required: {
      type: Boolean,
      default: null,
    },
    breakpoint: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    requiredRule,
  }),
  computed: {
    mask() {
      return this.phone === null ? null : PHONE_MASK
    },
  },

  methods: {
    handleInput(value) {
      this.$emit("input", value)
    },
    isNumber(event) {
      const { target } = event
      const expect = target.value.toString() + event.key.toString()

      if (!/^[-+]?[0-9]*\.?[0-9]*$/.test(expect)) {
        event.preventDefault()
        return false
      }
      return true
    },
  },
})
</script>

<style lang="scss" scoped>
.inquiry-input {
  // border-radius: 0 !important;
  color: var(--beige);

  ::v-deep {
    .v-label {
      max-width: 100%;
    }
    .v-input__slot::before {
      display: none;
    }
    .v-input__slot::after {
      color: var(--beige);
    }
    .v-label--active {
      transform: translateY(-0.6rem) scale(0.65);
    }

    .v-text-field__slot input {
      color: var(--beige);
    }
    .v-text-field__slot input::before {
      border-color: var(--beige);
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
      // top: 1rem !important;
      // padding: 0 0.5rem;
    }
  }
}

.text-input-label {
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--beige);
}

.red-label {
  color: var(--red);
}

.hint {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--dark-grey);
}
</style>
