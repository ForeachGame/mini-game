<template>
  <button>
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  padding: 10px 20px;
  border: none;
  background-color: #ccc;
  cursor: pointer;
  font-size: 16px;
}

button.active {
  background-color: #007bff;
  color: #fff;
}

button:not(:last-child) {
  margin-right: 10px;
}
</style>
