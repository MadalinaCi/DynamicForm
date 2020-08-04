<template>
  <div :class="{ question: true, required: required }">
    <slot></slot>
    <Answer
      :type="answerType"
      :list="answerList"
      :required="required"
      :questionId="questionId"
      @completed="completed"
    ></Answer>
  </div>
</template>

<script>
import Answer from "./Answer.vue";

export default {
  name: "Question",
  components: {
    Answer
  },
  props: {
    questionId: {
      type: String,
      required: true
    },
    question: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      required: true
    },
    answerType: {
      type: String,
      required: true
    },
    answerList: Array
  },
  mounted() {
    console.log("in Question, ", this.props);
  },
  methods: {
    completed(data) {
      this.$emit("completed", data);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.question {
  margin: 15px;
  font-size: 20px;
  margin-left: 50px;
}

.required:before {
  content: " *";
  color: red;
}
</style>
