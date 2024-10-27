<script setup lang="ts">

interface IHitIndicatorProps {
  isActive: boolean
}

const props = defineProps<IHitIndicatorProps>()
</script>

<template>
  <div class="hit-dot" :class="[props.isActive ? 'active' : '']"></div>
</template>

<style scoped>
.hit-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ffffff40;
  border: 1px solid transparent;

  &.active {
    border-color: #00d4ff;
    background-color: #fff;
    box-shadow: 0px 0px 8px 0px rgba(0, 212, 255, 1);
  }
}
</style>
