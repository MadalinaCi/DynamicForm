<template>
  <div class="output">
    <h1>This is the output JSON configuration:</h1>
    <pre class="output-json">{{ output }}</pre>
    <h4>Your answers have been successfully submitted!</h4>
  </div>
</template>
<script>
export default {
  name: "Output",
  data() {
    return {
      output: {}
    };
  },
  mounted() {
    this.output = JSON.stringify(this.$route.query, undefined, 2);
  }
};
</script>
<style scoped>
.output-json {
  text-align: left;
  font-size: 15px;
}
</style>
