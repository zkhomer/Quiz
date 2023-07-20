<template>
  <input :type="type" :value="value" @input="$emit('input', $event.target.value)" />
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
      default: '',
    },
  },
};
</script>
