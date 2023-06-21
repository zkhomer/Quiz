<template>
  <input :type="type" :value="value" @input="$emit('input', $event.target.value)" :disabled="disabled">
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Number],
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
