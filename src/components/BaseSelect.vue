<template>
  <select :value="value" @input="$emit('input', $event.target.value)" :disabled="disabled">
    <slot></slot>
  </select>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    value: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
