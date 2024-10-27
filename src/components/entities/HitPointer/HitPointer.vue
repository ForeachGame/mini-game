<template>
  <div ref="pointer" class="hit-pointer__wrapper">
    <div class="hit-pointer"></div>
  </div>
</template>

<style scoped>
.hit-pointer__wrapper {
  position: absolute;
  top: 0;
  left: calc(156px / 2 - 2px);
  width: 4px;
  height: 80px;
  transform-origin: bottom center;
  z-index: 40;
}

.hit-pointer {
  position: relative;
  width: 4px;
  top: -4px;
  height: 44px;
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    rgba(255, 255, 255, 0) 105.64%
  );
  border-radius: 25px;
  transform-origin: bottom center;
}
</style>
