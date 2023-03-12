<template>
  <div id="slide" :class="isMobile ? 'gallery-slide1 gallery-slide-mobile' : 'gallery-slide1'">
    <div :class="isMobile ? 'gallery-slide-title slide-mobile' : 'gallery-slide-title'">
      <h3>Elyse &amp; Scott</h3>
    </div>
    <div
      v-for="(image, index) in images"
      :key="image.id"
      :class="isMobile ? 'gallery-slide-img mobile-slide-img' : 'gallery-slide-img'"
      @click="handleSelectImg(image)"
    >
      <v-img
        eager
        :src="image.src"
        height="29rem"
        width="35rem"
        class="gallery-img"
        :style="'animation-delay: ' + (index + 7) * 125 + 'ms'"
      >
      </v-img>
    </div>
    <GalleryDialog :dialog-open="isDialogOpen" :image="selectedImage" :is-mobile="isMobile" @close="closeModal()" />
  </div>
</template>

<script>
import ElyseScott1 from "@/assets/carousel/ElyseScott/2109-elyse-scott-michigan-wedding-preview-14.jpg"
import ElyseScott2 from "@/assets/carousel/ElyseScott/2109-elyse-scott-michigan-wedding-preview-15.jpg"
import ElyseScott3 from "@/assets/carousel/ElyseScott/2109-elyse-scott-michigan-wedding-preview-20.jpg"
import ElyseScott4 from "@/assets/carousel/ElyseScott/2109-elyse-scott-michigan-wedding-preview-23.jpg"
import ElyseScott5 from "@/assets/carousel/ElyseScott/2109-elyse-scott-michigan-wedding-preview-24.jpg"
import ElyseScott6 from "@/assets/carousel/ElyseScott/2109-elyse-scott-michigan-wedding-preview-26.jpg"
import GalleryDialog from "./GalleryDialog.vue"

export default {
  components: { GalleryDialog },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    images: [
      { src: ElyseScott1, id: "1" },
      { src: ElyseScott2, id: "2" },
      { src: ElyseScott3, id: "3" },
      { src: ElyseScott4, id: "4" },
      { src: ElyseScott5, id: "5" },
      { src: ElyseScott6, id: "6" },
    ],

    isDialogOpen: false,
    selectedImage: null,
  }),
  methods: {
    handleSelectImg(imageObject) {
      this.selectedImage = imageObject
      this.isDialogOpen = true
    },

    closeModal() {
      this.isDialogOpen = false
      this.selectedImage = null
    },
  },
}
</script>

//
<style lang="scss" scoped>
// .gallery-slide1 {
//   height: 100%;
//   width: 100%;
//   max-width: 154rem;
//   margin: 0 auto;
//   padding: 8rem 2.5rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-wrap: wrap;
//   row-gap: 0.5rem;
//   column-gap: 1.75rem;
//   position: relative;

//   .gallery-slide-title {
//     position: absolute;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 100%;
//     top: -1rem;
//     font-size: 4rem;
//     letter-spacing: 4px;
//     color: var(--beige);
//     font-weight: 100;
//     font-family: "Bigilla";
//     opacity: 0;
//     transform: translateY(20px);
//     animation: titleAnimation 1s cubic-bezier(0.92, -0.03, 0.35, 1) forwards;
//   }

//   .gallery-slide-title::before {
//     content: "";
//     height: 0;
//     width: 0;
//     background-color: var(--beige);
//     position: absolute;
//     left: 0;
//     animation: titleAccent 1.25s cubic-bezier(0.92, -0.03, 0.35, 1) forwards;
//   }
//   .gallery-slide-title::after {
//     content: "";
//     height: 0;
//     width: 0;
//     background-color: var(--beige);
//     position: absolute;
//     right: 0;
//     animation: titleAccent 1.25s cubic-bezier(0.92, -0.03, 0.35, 1) forwards;
//   }
// }

// .gallery-slide-img {
//   border-radius: 1rem;
//   overflow-y: hidden;
//   overflow-x: hidden;
//   height: 29rem;
//   width: 35rem;
//   position: relative;
//   cursor: pointer;
//   transition: 0.5s;

//   .gallery-img {
//     transform: translateY(29rem);
//     height: 29rem;
//     width: 35rem;
//     border-radius: 1rem;
//     transition: 0.5s;
//     animation: img 1s cubic-bezier(0.92, -0.03, 0.35, 1) forwards;
//   }
// }

// .gallery-slide-img:hover {
//   height: 28rem;
//   width: 34rem;
// }

// @keyframes img {
//   0% {
//     transform: translateY(-29rem);
//   }
//   100% {
//     transform: translateY(0);
//   }
// }

// .active-gallery-image {
//   height: 0%;
//   background-color: var(--dark-pink);
//   z-index: 2;
// }

// @keyframes titleAnimation {
//   0% {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   100% {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }

// @keyframes titleAccent {
//   0% {
//     height: 0px;
//     width: 0px;
//   }
//   100% {
//     height: 2px;
//     width: 30%;
//   }
// }
//
</style>
