<template>
  <div class="logo-container">
    <div class="logo-content">
      <LogoBorder />
      <!-- <div class="garbage"> -->

      <!-- </div> -->
    </div>
    <LogoBorderText :window-height="window.innerHeight" :window-width="window.innerWidth" />
    <div class="logo-image"></div>
    <div class="logo-letters-container">
      <div
        v-for="(letter, index) in letters"
        :key="index"
        class="logo-letters"
        :style="'animation-delay: ' + (index + 30) * 125 + 'ms'"
      >
        <v-img :src="letter.src" height="70" :width="setLetterWidth(letter.letter)" max-width="110" contain></v-img>
      </div>
    </div>
  </div>
</template>

<script>
import LetterA from "@/assets/LogoLetterSvgs/letterA.svg"
import LetterE from "@/assets/LogoLetterSvgs/letterE.svg"
import LetterI from "@/assets/LogoLetterSvgs/letterI.svg"
import LetterM from "@/assets/LogoLetterSvgs/letterM.svg"
import LetterR from "@/assets/LogoLetterSvgs/letterR.svg"
import LetterS from "@/assets/LogoLetterSvgs/letterS.svg"
import LetterT from "@/assets/LogoLetterSvgs/letterT.svg"
import LogoBorder from "./LogoBorder.vue"
import LogoBorderText from "./LogoBorderText.vue"

export default {
  components: {
    LogoBorder,
    LogoBorderText,
  },
  props: {
    isPortrait: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    intersectionRatio: {
      type: String,
      default: null,
    },
    homeScrollEvent: {
      type: Boolean,
      default: false,
    },
    wheelDelta: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    letters: [
      { src: LetterA, letter: "a" },
      { src: LetterR, letter: "r" },
      { src: LetterT, letter: "t" },
      { src: LetterE, letter: "e" },
      { src: LetterM, letter: "m" },
      { src: LetterI, letter: "i" },
      { src: LetterS, letter: "s" },
      { src: LetterI, letter: "i" },
      { src: LetterA, letter: "a" },
    ],
    window: {
      innerHeight: null,
      innerWidth: null,
    },
  }),
  computed: {},
  watch: {},
  mounted() {
    this.handleResize()
  },
  methods: {
    hasLetterM(string) {
      return string.includes("letterM")
    },
    setLetterWidth(letter) {
      if (letter === "i" || letter === "t") {
        return "45"
      }
      if (letter === "r" || letter === "m") {
        return "70"
      }
      return "60"
    },

    handleResize() {
      this.window.innerHeight = window.innerHeight
      this.window.innerWidth = window.innerWidth
    },
  },
}
</script>

<style lang="scss" scoped>
.logo-container {
  border: 1px solid green;
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100%;
  padding: 0 25%;
  left: 0;
  // min-width: 34rem;
  // max-width: 45rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-content {
  border: 2px solid red;
  height: 50%;
  // position: relative;
  // max-height: 60rem;
  width: 100%;
  // max-width: 45rem;
  position: -webkit-sticky;
  position: sticky;
  // top: 20px;
  z-index: 2;

  .logo-border {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    stroke-dasharray: 2000;
    stroke-dashoffset: 2000;
    animation: dash 3.5s linear forwards;
    animation-delay: 0.5s;
    transform: scale(0.9);
  }

  // .wrap-around-text {
  //   border: 2px solid blue;
  //   width: 50vw;
  //   // max-width: 100rem;
  //   height: 100vh;
  //   position: absolute;
  //   top: 0rem;
  //   opacity: 1;
  //   left: 0rem;
  //   animation: borderText 0.25s linear forwards;
  //   // animation-delay: 5.5s;
  // }
}
.logo-image {
  border: 3px solid pink;
  position: absolute;
  height: 50%;
  width: 50%;
  opacity: 0;
  background: url("@/assets/logoLineWhite.png") no-repeat, center;
  background-size: contain;
  background-position: center;
  animation: opacity 0.5s linear forwards;
  animation-delay: 3.3s;
  transform: scale(0.9);
}

.logo-letters-container {
  border: 3px solid orange;
  height: 50%;
  width: 50%;
  position: absolute;
  top: 75%;
  padding-top: 1rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  .logo-letters {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    display: block;
    animation: letter-animation 1s forwards;
    opacity: 0;

    .letter {
      height: 100%;
      width: 100%;
    }
  }
}

@keyframes borderText {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(0.5);
    opacity: 0.8;
  }
}

@keyframes letter-animation {
  0% {
    transform: translateY(10px);
    opacity: 0;
  }
  50% {
    transform: translateY(-8px);
  }

  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 2500;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes opacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
