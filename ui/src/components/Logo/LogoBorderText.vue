<template>
  <div class="logo-border-text-container">
    <svg id="logo-border-text" class="logo-border-text" data-name="Layer 1" viewBox="50 0 500 500">
      <path
        id="curve"
        d="M10.93,543.37V284.49c0-149,125.39-269.82,280.07-269.82h30c154.68,0,280.07,120.8,280.07,269.82V543.37Z"
        transform="translate(0 20)"
        fill="none"
      />
      <text class="text-container" width="50" height="50">
        <textPath xlink:href="#curve" fill="#ffffff" class="logo-border-text-content" side="right" startOffset="95">
          Personalized floral design for those who love a great story
        </textPath>
      </text>
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    windowHeight: {
      type: Number,
      default: 0,
    },
    windowWidth: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="scss" scoped>
.logo-border-text-container {
  border: 3px solid blue;
  height: 100vh;
  width: 100vw;
  margin-right: 1rem;
  margin-bottom: 8rem;
  transform: scale(0.45);
  opacity: 0;
  position: absolute;
  animation: borderText 0.25s linear forwards;
  animation-delay: 5.5s;
}

.logo-border-text {
  height: 100%;
  width: 100%;
  border: 3px solid green;
}

.logo-border-text-content {
  font-size: 4.2rem;
  font-family: "Bigilla";
  font-weight: 800;
  letter-spacing: 4.5px;
}

@keyframes borderText {
  0% {
    transform: scale(0.35);
    opacity: 0;
  }
  100% {
    transform: scale(0.45);
    opacity: 0.8;
  }
}
</style>
