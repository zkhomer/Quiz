<template>
  <button :class="buttonClass" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    buttonClass: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped></style>
