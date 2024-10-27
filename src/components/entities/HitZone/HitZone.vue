<script setup lang="ts">
defineProps<{
  isOverHitZone: boolean
  isLoose: boolean
}>()
</script>

<template>
  <div
    class="hit-zone__wrapper"
    :class="[isOverHitZone && 'active', isLoose && 'is-loose']"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.hit-zone__wrapper {
  width: 156px;
  height: 156px;
  position: absolute;
  top: 0;
  left: 0;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(0, 213, 255, 0) 50.19%,
    #00d5ff 100%
  );
  z-index: 10;
  border-radius: 50%;
  overflow: hidden;

  &.active {
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(0, 213, 255, 0) 50.19%,
      #fff 100%
    );
  }

  &.is-loose {
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(0, 213, 255, 0) 50.19%,
      #ff3333 100%
    );
  }
}
</style>
