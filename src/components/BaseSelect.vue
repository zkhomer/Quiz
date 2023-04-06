<template>
  <select @change="emmitValue" v-model="selectValue" class="field">
    <option v-if="options" disabled value="">Please select one...</option>
    <option v-for="option in options" :value="option" :key="option.id">
      {{ option.name || option }}
    </option>
  </select>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectValue: "",
    };
  },
  methods: {
    emmitValue() {
      this.$emit("select-value", this.selectValue);
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
