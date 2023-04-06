<template>
  <input
    :min="minValue"
    :max="maxValue"
    :type="type"
    :placeholder="placeholder"
    class="field"
    v-model="inputValue"
    @input="emitValue"
    required
  />
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    minValue: {
      type: Number,
      default: 1,
    },
    maxValue: {
      type: Number,
      default: 116,
    },
  },
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    emitValue() {
      this.$emit("input-value", this.inputValue);
    },
  },
});
</script>

<style>
.field {
  display: block;
  width: 100%;
  margin: 0 auto 10px;
  height: 40px;
  text-align: center;
  padding: 5px;
}
</style>
