<template>
  <div class="home-container">
    <div class="content-container" src="@/assets/flowerImages/AG-13.jpg">
      <div class="logo-container">
        <div class="logo">
          <div class="logo-border">
            <LogoBorder />
            <LogoBorderText class="wrap-around-text" />
          </div>
          <div class="logo-image"></div>

          <div class="logo-letters-container">
            <div
              v-for="(letter, index) in letters"
              :key="index"
              class="logo-letters"
              :style="'animation-delay: ' + (index + 30) * 125 + 'ms'"
            >
              <v-img
                :src="letter.src"
                height="50"
                :width="setLetterWidth(letter.letter)"
                max-width="110"
                contain
              ></v-img>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="background-container"></div>
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
import LogoBorder from "@/components/Logo/LogoBorder.vue"
import LogoBorderText from "@/components/Logo/LogoBorderText.vue"

export default {
  components: {
    LogoBorder,
    LogoBorderText,
  },
  props: {
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
    windowHeight: {
      type: String,
      default: null,
    },
    windowWidth: {
      type: String,
      default: null,
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
  }),
  // computed: {
  //   handleResize() {
  //     this.window.innerHeight = window.innerHeight
  //     this.window.innerWidth = window.innerWidth
  //   },
  // },
  watch: {},
  mounted() {},
  methods: {
    setLogoImageSize() {
      "left: 5.2vh;"
    },
    hasLetterM(string) {
      return string.includes("letterM")
    },
    setLetterWidth(letter) {
      if (letter === "i" || letter === "t") {
        return "45"
      }
      if (letter === "r" || letter === "m") {
        return "50"
      }
      return "40"
    },
  },
}
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
  width: 100%;
}

.content-container {
  position: absolute;
  background: linear-gradient(to top left, rgba(0, 11, 17, 0.2), transparent 100%),
    linear-gradient(to bottom right, rgba(0, 11, 17, 0.5), transparent 100%),
    url("@/assets/flowerImages/AG-13.jpg") no-repeat, center;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 210vh;
  width: 100%;
  top: 0;
  // overflow-y: hidden;
  // overflow-x: hidden;
}

.background-container {
  background-color: var(--orange);
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  animation: top 2s cubic-bezier(0.92, -0.03, 0.35, 1) forwards;
  animation-delay: 4s;
}

.logo-container {
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  border: 1px solid red;
  height: 100%;
  max-height: 60rem;
  width: 100%;
  max-width: 45rem;
  position: relative;
  // position: -webkit-sticky;
  // position: sticky;
  top: 0px;
  z-index: 2;

  .logo-border {
    // position: absolute;
    top: 0;
    margin: 0 auto;
    height: 60rem;
    width: 32.5rem;
    stroke-dasharray: 2000;
    stroke-dashoffset: 2000;
    animation: dash 3.5s linear forwards;
    animation-delay: 0.5s;
    transform: scale(0.99);
  }

  .wrap-around-text {
    width: 250%;
    height: 100%;
    position: absolute;
    top: 0;
    opacity: 0;
    left: -66.5%;
    animation: borderText 0.25s linear forwards;
    animation-delay: 5.5s;
  }

  .logo-image {
    // position: absolute;
    position: relative;
    opacity: 0;
    top: -100.5%;
    // left: 5%;
    margin: 0 auto;
    height: 60rem;
    width: 32.5rem;
    background: url("../assets/logoLineWhite.png") no-repeat, center;
    background-size: contain;
    background-position: center;
    transform: scale(0.97);
    animation: opacity 0.5s linear forwards;
    animation-delay: 3.3s;
  }

  .logo-letters-container {
    height: 30%;
    width: 100%;
    position: absolute;
    bottom: -20%;
    left: 0%;
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

@keyframes top {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes borderText {
  0% {
    transform: scale(0.6);
    opacity: 0;
  }
  100% {
    transform: scale(0.6);
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
</style>
