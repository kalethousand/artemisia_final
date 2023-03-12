<template>
  <v-dialog
    :retain-focus="false"
    :value="dialogOpen"
    :width="`${setDialogImageContainerToImageWidth}px`"
    :content-class="isMobile ? 'dialog-container mobile-dialog' : 'dialog-container'"
    @click:outside="closeModal()"
    @keydown.esc="closeModal()"
  >
    <div class="dialog-content-container" :style="`width: ${setDialogImageContainerToImageWidth}px`">
      <div class="toolbar-container" :style="`width: ${setDialogImageContainerToImageWidth}px`">
        <v-btn class="gallery-close-btn" icon depressed rounded @click="closeModal()">
          <v-icon class="gallery-close-btn-icon">mdi-close-circle</v-icon>
        </v-btn>
      </div>
      <div v-if="image === null"></div>
      <div v-else class="dialog-image-container">
        <div :style="`background-image: url(${encodeOriginalImageUrl})`" class="dialog-image"></div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      default: null,
    },
    dialogOpen: {
      type: Boolean,
      default: false,
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    dialogHeight: null,
    dialogWidth: null,
  }),
  computed: {
    encodeOriginalImageUrl() {
      return encodeURI(this.image.src)
    },
    setDialogImageContainerToImageWidth() {
      if (this.isMobile && this.image !== null) {
        const updatedImage = this.setImageDimensions(this.image.src)
        const { width } = updatedImage
        const { height } = updatedImage
        const imageRatio = width / height
        const newImageHeight = window.innerHeight
        const newImageWidth = newImageHeight * imageRatio
        return newImageWidth
      }
      if (this.image !== null) {
        const updatedImage = this.setImageDimensions(this.image.src)
        const { width } = updatedImage
        const { height } = updatedImage
        const imageRatio = width / height
        const newImageHeight = window.innerHeight * 0.9
        const newImageWidth = newImageHeight * imageRatio
        return newImageWidth
      }
      return null
    },
  },
  methods: {
    closeModal() {
      this.$emit("close")
    },
    setImageDimensions(image) {
      const newImage = new Image()
      newImage.src = image
      return newImage
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog-container {
  height: 80vh;
}

.dialog-content-container {
  background-color: transparent;
  display: flex;
  flex-direction: column;
  height: 80vh;
  position: relative;

  .toolbar-container {
    height: 10rem;
    padding: 0 5rem;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    left: 0;
    background-color: transparent;

    .gallery-close-btn {
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      z-index: 999;
      background-color: var(--charcoal);

      .gallery-close-btn-icon {
        color: var(--beige);
        font-size: 4rem;
      }
    }
  }
}

.mobile-dialog {
  height: 90vh;

  .toolbar-container {
    display: none;
  }
}

.dialog-image-container {
  background-color: transparent;
  height: 100%;
  width: 100%;

  .dialog-image {
    height: 100%;
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}

::v-deep {
  .v-dialog {
    border-radius: 2rem;
  }
}
</style>
