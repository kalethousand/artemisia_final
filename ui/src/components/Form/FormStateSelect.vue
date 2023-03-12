<template>
  <div id="formState" class="form-state-select">
    <FormSelect
      :value="value"
      :label="label"
      full-width
      attach
      solo
      :breakpoint="breakpoint"
      :items="statesListToRender"
      @input="handleInput($event)"
    />
  </div>
</template>

<script>
import FormSelect from "@/components/FormSelect.vue"
import ABBREVIATED_STATES_LIST from "@/constants/abbreviatedStatesList"

export default {
  components: { FormSelect },
  props: {
    abbreviated: {
      type: Boolean,
      default: true,
    },
    breakpoint: {
      type: Object,
      default: null,
    },
    value: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: "State",
    },
  },
  data: () => ({
    selectedState: null,
  }),
  computed: {
    statesListToRender() {
      return ABBREVIATED_STATES_LIST
    },
  },
  methods: {
    handleInput(value) {
      this.$emit("input", value)
    },
  },
}
</script>

<style lang="scss" scoped>
.form-state-select {
  border-radius: 0 !important;
  width: 100%;
}

::v-deep {
  .v-select__selection--comma {
    color: var(--beige) !important;
  }
  .v-list-item {
    min-height: 3.6rem;
  }
  .select-item {
    font-size: 1.2rem !important;
  }
}
</style>
