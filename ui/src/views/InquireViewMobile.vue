<template>
  <div class="inquire-mobile-view-container">
    <div class="inquire-mobile-view-content">
      <ContentTransition
        :is-active="set1IsActive"
        container-id="inquiry-mobile-content-set-1"
        class="inquiry-mobile-content-set-1"
      >
        <div class="inquiry-description">
          <p :class="`${breakpoint.name}-body`">Inquiring about a wedding? Please fill out the form below!</p>
        </div>
        <v-form ref="form" class="form" @submit.prevent="handleSubmit">
          <v-container class="form-container">
            <FormSectionContent>
              <template #row-1>
                <FormRow class="form-row" p-top p-btm>
                  <template #column-1>
                    <p :class="`${breakpoint.name}-input section-label`">Contact</p>
                    <v-divider class="section-divider"></v-divider>
                  </template>
                </FormRow>
              </template>

              <template #row-2>
                <FormRow class="form-row" p-top p-btm>
                  <template #column-1>
                    <TextInput
                      v-model="inquiryForm.person1.firstName"
                      animate-label
                      label="First Name"
                      :breakpoint="breakpoint"
                    />
                  </template>
                </FormRow>
              </template>

              <template #row-3>
                <FormRow class="form-row" p-top p-btm>
                  <template #column-1>
                    <TextInput
                      v-model="inquiryForm.person1.lastName"
                      animate-label
                      label="Last Name"
                      :breakpoint="breakpoint"
                    />
                  </template>
                </FormRow>
              </template>

              <template #row-4>
                <FormRow class="form-row" p-top p-btm>
                  <template #column-1>
                    <TextInput
                      v-model="inquiryForm.person2.firstName"
                      animate-label
                      label="First Name"
                      :breakpoint="breakpoint"
                    />
                  </template>
                </FormRow>
              </template>

              <template #row-5>
                <FormRow class="form-row" p-top p-btm>
                  <template #column-1>
                    <TextInput
                      v-model="inquiryForm.person2.lastName"
                      animate-label
                      label="Last Name"
                      :breakpoint="breakpoint"
                    />
                  </template>
                </FormRow>
              </template>

              <template #row-6>
                <FormRow class="form-row" p-top p-btm>
                  <template #column-1>
                    <TextInput
                      v-model="inquiryForm.contact.email"
                      animate-label
                      type="email"
                      label="Email"
                      :breakpoint="breakpoint"
                    />
                  </template>
                  <template #column-2>
                    <TextInput
                      v-model="inquiryForm.contact.phoneNumber"
                      animate-label
                      label="Phone"
                      phone
                      :breakpoint="breakpoint"
                    />
                  </template>
                </FormRow>
              </template>

              <template #row-7>
                <FormRow class="form-row" p-top p-btm>
                  <template #column-1> <v-divider class="section-divider"></v-divider></template>
                </FormRow>
              </template>
              <template #row-8>
                <FormRow class="form-row" p-top p-btm>
                  <template #column-1>
                    <div>
                      <p class="section-label">What is your floral budget?</p>
                      <v-btn-toggle
                        v-model="inquiryForm.floralBudget.range"
                        tile
                        group
                        dense
                        mandatory
                        style="display: flex; flex-direction: column"
                      >
                        <div style="width: 100%; padding-top: 1rem">
                          <v-btn color="var(--beige)" class="budget-btn" outlined value="$3,000-$5,000">
                            $3,000-$5,000
                          </v-btn>
                          <v-btn color="var(--beige)" class="budget-btn" outlined value="$5,000-$7,000">
                            $5,000-$7,000
                          </v-btn>
                        </div>
                        <div style="width: 100%">
                          <v-btn color="var(--beige)" class="budget-btn" outlined value="$7,000-$9,000">
                            $7,000-$9,000
                          </v-btn>
                          <v-btn
                            color="var(--beige)"
                            class="budget-btn"
                            outlined
                            value="$9,000+"
                            style="min-width: 11rem"
                          >
                            $9,000 +
                          </v-btn>
                        </div>
                      </v-btn-toggle>
                    </div>
                  </template>
                </FormRow>
              </template>

              <template #row-9>
                <FormRow class="form-row" p-top p-btm>
                  <template #column-1>
                    <FormDatePicker
                      v-model="inquiryForm.date"
                      label="Wedding Date"
                      date-stepper
                      :breakpoint="breakpoint"
                    />
                  </template>
                  <template #column-2>
                    <TextInput v-model="inquiryForm.time" animate-label label="Wedding Time" :breakpoint="breakpoint" />
                  </template>
                </FormRow>
              </template>

              <template #row-10>
                <FormRow class="form-row" p-top p-btm>
                  <template #column-1>
                    <TextInput
                      v-model="inquiryForm.estimatedGuestCount"
                      animate-label
                      label="Est. Guest Count"
                      :breakpoint="breakpoint"
                    />
                  </template>
                </FormRow>
              </template>

              <template #row-11>
                <FormRow class="form-row" p-top p-btm>
                  <template #column-1>
                    <p :class="`${breakpoint.name}-input section-label`">Ceremony</p>
                    <v-divider class="section-divider"></v-divider>
                  </template>
                </FormRow>
              </template>

              <template #row-12>
                <FormRow class="form-row" p-top p-btm>
                  <template #column-1>
                    <TextInput
                      v-model="inquiryForm.ceremony.venueName"
                      animate-label
                      label="Venue Name"
                      :breakpoint="breakpoint"
                    />
                  </template>
                </FormRow>
              </template>

              <template #row-13>
                <FormRow class="form-row" p-top p-btm>
                  <template #column-2>
                    <TextInput
                      v-model="inquiryForm.ceremony.venueAddress.street1"
                      animate-label
                      label="Street Address"
                      :breakpoint="breakpoint"
                    />
                  </template>
                </FormRow>
              </template>

              <template #row-14>
                <FormRow class="form-row" p-top p-btm>
                  <template #column-1>
                    <TextInput
                      v-model="inquiryForm.ceremony.venueAddress.city"
                      animate-label
                      label="City"
                      :breakpoint="breakpoint"
                    />
                  </template>
                  <template #column-2>
                    <FormStateSelect v-model="inquiryForm.ceremony.venueAddress.state" :breakpoint="breakpoint" />
                  </template>
                  <template #column-3>
                    <TextInput
                      v-model="inquiryForm.ceremony.venueAddress.zipCode"
                      animate-label
                      label="Zip"
                      :breakpoint="breakpoint"
                    />
                  </template>
                </FormRow>
              </template>

              <template #row-15>
                <FormRow class="form-row" p-top p-btm>
                  <template #column-1>
                    <p :class="`${breakpoint.name}-input section-label`">Reception:</p>
                    <v-divider class="section-divider"></v-divider>
                  </template>
                </FormRow>
              </template>

              <template #row-16>
                <FormRow class="form-row" p-top p-btm>
                  <template #column-1>
                    <TextInput
                      v-model="inquiryForm.reception.venueName"
                      animate-label
                      label="Venue Name"
                      :breakpoint="breakpoint"
                    />
                  </template>
                </FormRow>
              </template>

              <template #row-17>
                <FormRow class="form-row" p-top p-btm>
                  <template #column-1>
                    <TextInput
                      v-model="inquiryForm.reception.venueAddress.street1"
                      animate-label
                      label="Street Address"
                      :breakpoint="breakpoint"
                    />
                  </template>
                </FormRow>
              </template>
              <template #row-18>
                <FormRow class="form-row" p-top p-btm>
                  <template #column-1>
                    <TextInput
                      v-model="inquiryForm.reception.venueAddress.city"
                      animate-label
                      label="City"
                      :breakpoint="breakpoint"
                    />
                  </template>
                  <template #column-2>
                    <FormStateSelect v-model="inquiryForm.reception.venueAddress.state" :breakpoint="breakpoint" />
                  </template>
                  <template #column-3>
                    <TextInput
                      v-model="inquiryForm.reception.venueAddress.zipCode"
                      animate-label
                      label="Zip"
                      :breakpoint="breakpoint"
                    />
                  </template>
                </FormRow>
              </template>

              <template #row-19>
                <FormRow class="form-row" p-top p-btm>
                  <template #column-1>
                    <TextArea
                      v-model="inquiryForm.additionalComments"
                      label="Comments or Important Details "
                      :breakpoint="breakpoint"
                    />
                  </template>
                </FormRow>
              </template>
            </FormSectionContent>

            <div class="submit-container">
              <div :class="`result-container ${breakpoint.name}-input`">
                <p>{{ submissionResult }}</p>
              </div>
              <v-btn class="submit-btn" type="submit" depressed color="var(--beige)" x-large> submit </v-btn>
            </div>
          </v-container>
        </v-form>
      </ContentTransition>
      <ContentTransition
        :is-active="set2IsActive"
        container-id="inquiry-mobile-content-set-2"
        class="inquiry-mobile-content-set-2"
      >
        <div class="inquiry-photo"></div>
      </ContentTransition>
    </div>
  </div>
</template>

<script>
import emailjs from "@emailjs/browser"
import TextInput from "@/components/Form/TextInput.vue"
import FormDatePicker from "@/components/Form/FormDatePicker.vue"
import FormStateSelect from "@/components/Form/FormStateSelect.vue"
import TextArea from "@/components/Form/TextArea.vue"
import FormRow from "@/components/Form/FormRow.vue"
import FormSectionContent from "@/components/Form/FormSectionContent.vue"
import ContentTransition from "@/components/Transitions/ContentTransition.vue"

export default {
  components: { TextInput, FormDatePicker, FormStateSelect, TextArea, FormRow, FormSectionContent, ContentTransition },
  props: {
    isPortrait: {
      type: Boolean,
      default: false,
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
    breakpoint: {
      type: Object,
      default: null,
    },
    componentSize: {
      type: Number,
      default: 1,
    },
  },
  data: () => ({
    isLoading: false,
    idArray: ["inquiry-mobile-content-set-1", "inquiry-mobile-content-set-2"],
    contentElements: null,
    observer: null,
    submissionResult: "",
    inquiryContentSet1: {
      intersectionRatio: null,
      isVisible: false,
    },
    inquiryContentSet2: {
      intersectionRatio: null,
      isVisible: false,
    },
    inquiryForm: {
      person1: {
        firstName: null,
        lastName: null,
      },
      person2: {
        firstName: null,
        lastName: null,
      },
      contact: {
        email: null,
        phoneNumber: null,
      },
      floralBudget: {
        range: null,
      },
      date: null,
      time: null,
      ceremony: {
        venueName: null,
        venueAddress: {
          street1: null,
          city: null,
          state: null,
          zipCode: null,
        },
      },
      reception: {
        venueName: null,
        venueAddress: {
          street1: null,
          city: null,
          state: null,
          zipCode: null,
        },
      },
      estimatedGuestCount: null,
      additionalComments: null,
    },
  }),
  computed: {
    set1IsActive() {
      if (this.inquiryContentSet1.isVisible) return true
      return false
    },
    set2IsActive() {
      if (this.inquiryContentSet2.isVisible) return true
      return false
    },
  },
  mounted() {
    this.fetchContentElements()
    this.initObserver()
  },
  methods: {
    fetchContentElements() {
      this.contentElements = this.idArray.map(el => document.getElementById(el))
    },
    initObserver() {
      const rootElement = document.getElementById(`app`)
      const options = {
        root: rootElement,
        threshold: [...Array(100)].map((el, index) => (0.01 * index).toFixed(2)),
      }
      const handleIntersectionEvent = entries => {
        entries.forEach(entry => {
          if (entry.target.id === `inquiry-mobile-content-set-1`) {
            this.inquiryContentSet1.intersectionRatio = this.fetchIntersectionRatio(entry)
            this.inquiryContentSet1.isVisible = this.entryVisible(entry.intersectionRatio)
          }
          if (entry.target.id === `inquiry-mobile-content-set-2`) {
            this.inquiryContentSet2.intersectionRatio = this.fetchIntersectionRatio(entry)
            this.inquiryContentSet2.isVisible = this.entryVisible(entry.intersectionRatio)
          }
        })
      }
      this.observer = new IntersectionObserver(handleIntersectionEvent, options)
      this.contentElements.forEach(el => this.observer.observe(el))
    },
    fetchIntersectionRatio(entry) {
      const ratio = Number(entry.intersectionRatio.toFixed(2))
      return ratio
    },
    entryVisible(intersectionRatio) {
      if (intersectionRatio >= 0.3) {
        return true
      }
      return false
    },

    setSubmissionResult(result) {
      if (result === "error") {
        return "An error occurred and we weren't about to submit your inquiry at this time."
      }
      if (result === "success") {
        return "Thanks for reaching out! Please watch out for a response email in 24 - 48 hours. Look forward to speaking with you!"
      }
      return "Not submitted"
    },

    handleSubmit() {
      const formattedFormForEmail = this.formatEmail()
      this.sendEmail(formattedFormForEmail)
      this.submissionResult = this.setSubmissionResult("success")
    },

    formatEmail() {
      return {
        person1_name: `${this.inquiryForm.person1.firstName} ${this.inquiryForm.person1.lastName}`,
        person2_name: `${this.inquiryForm.person2.firstName} ${this.inquiryForm.person2.lastName}`,
        contact_email: `${this.inquiryForm.contact.email}`,
        contact_phone: `${this.inquiryForm.contact.phoneNumber}`,
        floral_budget: `${this.inquiryForm.floralBudget.range}`,
        wedding_date: `${this.inquiryForm.date}`,
        wedding_time: `${this.inquiryForm.time}`,
        ceremony_venue_name: `${this.inquiryForm.ceremony.venueName}`,
        ceremony_address: `${this.inquiryForm.ceremony.venueAddress.street1}, ${this.inquiryForm.ceremony.venueAddress.city}, ${this.inquiryForm.ceremony.venueAddress.state}, ${this.inquiryForm.ceremony.venueAddress.zipCode}`,
        reception_venue_name: `${this.inquiryForm.reception.venueName}`,
        reception_address: `${this.inquiryForm.reception.venueAddress.street1}, ${this.inquiryForm.reception.venueAddress.city}, ${this.inquiryForm.reception.venueAddress.state}, ${this.inquiryForm.reception.venueAddress.zipCode}`,
        estimated_guests: `${this.inquiryForm.estimatedGuestCount}`,
        details: `${this.inquiryForm.additionalComments}`,
      }
    },

    sendEmail(formattedFormForEmail) {
      emailjs
        .send(
          `${process.env.VUE_APP_EMAIL_JS_SERVICE_ID}`,
          `${process.env.VUE_APP_EMAIL_JS_TEMPLATE_ID}`,
          formattedFormForEmail,
          `${process.env.VUE_APP_EMAIL_JS_PUBLIC_KEY}`
        )
        .then("success")
    },
  },
}
</script>
<style lang="scss" scoped>
.inquire-mobile-view-container {
  height: 220vh;
  width: 100%;
  position: relative;
  z-index: 4;

  .inquire-mobile-view-content {
    position: sticky;
    top: 25vh;
    height: 160vh;
  }

  .inquire-mobile-content-set-1 {
    opacity: 1;
    transition-delay: 0.15s;
    transition: 0.25s;

    .inquire-mobile-form-container {
      padding: 10% 5% 0 5%;

      .form {
        width: 80%;
        margin: auto;

        .form-container {
          height: 100%;
          width: 100%;
        }
      }
    }
  }

  .section-label {
    color: var(--beige);
    font-weight: 400;
    font-size: 1.2rem;
    padding-top: 1rem;
    margin: 0;
  }

  .section-divider {
    border-color: var(--beige);
  }

  .budget-btn {
    color: var(--darker-green);
    font-size: 1rem;
  }

  .submit-container {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    .result-container {
      max-width: 60rem;
      text-align: center;
      color: var(--darker-green);
      font-weight: 500;
      font-size: 1.4rem;
      min-height: 5rem;
      margin: 1rem;
    }

    .submit-btn {
      color: var(--darker-green);
      font-size: 1.4rem;
      width: 30%;
    }
  }

  .inquiry-description {
    color: var(--beige);
    text-align: center;
    margin: 0 auto;
    width: 80%;
  }

  .inquire-mobile-content-set-2 {
    opacity: 1;
    transition-delay: 0.15s;
    transition: 0.25s;
    max-width: 40rem;
  }

  .inquiry-photo {
    height: 30rem;
    width: 30rem;
    margin: 4rem auto 0 auto;
    border-top-left-radius: 100%;
    border-top-right-radius: 100%;
    opacity: 0.9;
    background: linear-gradient(to top left, rgba(0, 11, 17, 0.1), transparent 100%),
      linear-gradient(to bottom right, rgba(0, 11, 17, 0.1), transparent 100%),
      url("../assets/images/inquiry/inquiryAsset2.png");

    background-size: cover;
    background-repeat: no-repeat;
  }
}
</style>
