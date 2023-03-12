<template>
  <div id="form-date-container">
    <v-menu
      ref="menu"
      v-model="dateMenu"
      attach="#form-date-container"
      bottom
      nudge-bottom="55"
      min-width="0px"
      :return-value.sync="dateValue"
      :close-on-content-click="!dateStepper ? true : false"
    >
      <template #activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on">
          <TextInput
            :label="label"
            :red-label="redLabel"
            full-width
            readonly
            animate-label
            required
            class="date-picker-input"
            :value="selectedDate"
            :breakpoint="breakpoint"
          />
        </div>
      </template>
      <v-date-picker
        ref="picker"
        v-model="dateValue"
        :no-title="!dateStepper ? true : false"
        :active-picker.sync="internalActivePicker"
        color="var(--darker-green)"
        max="2050-01-01"
        min="1900-01-01"
        @change="save"
        @input="handleDateSelected"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import TextInput from "./TextInput.vue"

export default Vue.extend({
  components: { TextInput },

  props: {
    label: {
      type: String,
      default: "Date",
    },
    breakpoint: {
      type: Object,
      default: null,
    },
    dateStepper: {
      type: Boolean,
      default: false,
    },
    redLabel: {
      type: Boolean,
      default: null,
    },
    hint: {
      type: Boolean,
      default: null,
    },
  },
  data: () => ({
    internalActivePicker: "YEAR" as null | string,
    selectedDate: null as string | null,
    dateMenu: false,
    dateValue: null as null | string,
  }),
  computed: {
    currentDateLocalized() {
      return new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10)
    },
  },
  watch: {
    dateMenu(val, prevValue) {
      if (this.dateStepper && val && !prevValue) {
        this.$nextTick(() => this.setActivePicker())
      }
    },
  },

  methods: {
    handleDateSelected() {
      this.selectedDate = this.formatDate(this.dateValue)
      this.$emit("input", this.selectedDate)
    },
    formatDate(date: string | null) {
      if (!date) return ""

      const [year, month, day] = date.split("-")
      return `${month}/${day}/${year}`
    },

    save(date: string) {
      // eslint-disable-next-line no-unused-vars
      const menuRef = this.$refs.menu as unknown as { menu: HTMLDivElement; save: (param: string) => boolean }
      this.$nextTick(function setMenu() {
        menuRef.save(date)
      })
    },

    setActivePicker() {
      const refPicker = this.$refs.picker as unknown as { activePicker: string }
      this.$nextTick(function setPick() {
        refPicker.activePicker = "YEAR"
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.date-picker-input {
  border-radius: 0 !important;
}

::v-deep {
  .v-menu__content,
  .v-picker__body {
    max-width: 20rem !important;
    width: 100%;
    background-color: var(--dark-green) !important;
    color: var(--beige);
    // color: var(--dark);
  }

  .v-date-picker-title {
    padding-left: 1.6rem;
    flex-direction: row;
    justify-content: start;
    color: var(--beige);
    // background-color: var(--dark-green) !important;
  }
  .v-picker__title {
    padding: 1.6rem 0.8rem 0.6rem 0.8rem;
    // color: var(--beige);
    // background-color: var(--dark-green) !important;
  }

  .v-date-picker-title__date {
    font-size: 1.4rem;
    margin-left: 2rem;
    // color: var(--beige);
    // background-color: var(--dark-green) !important;
  }

  .v-date-picker-table__current {
    background-color: var(--darker-green);
    .v-btn,
    .v-btn__content {
      background-color: var(--darker-green);
      color: var(--beige) !important;
      border: none;
    }
  }

  .v-date-picker-table {
    .v-btn__content {
      color: var(--darker-green);
    }
  }

  .v-date-picker-table--date {
    th {
      color: var(--beige) !important;
    }
  }
}
</style>
