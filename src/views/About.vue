<template>
  <div class="about">
    <h1>This is the output JSON configuration:</h1>
    <pre class="output">{{ output }}</pre>
    <h4>Your answers have been successfully submitted!</h4>
  </div>
</template>
<script>
  export default {
    name: "About",
    data() {
      return {
        output: {}
      }
    },
    mounted() {
      console.log(this.$route.query);
      this.output = JSON.stringify(this.$route.query, undefined, 2);
    }
  }
</script>
<style scoped>
 .output {
   text-align: left;
   font-size: 15px;
 }
</style>
