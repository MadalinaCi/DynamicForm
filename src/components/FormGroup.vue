<template>
  <div class="form-group">
    <h3><slot></slot></h3>
    <FormQuestion
      v-for="(value, key, index) in questions"
      :key="`formquestion-${index}`"
      :id="key"
      @qupdate="questionUpdate"
    >
      <button class="remove" v-on:click="removeQuestion(key)">REMOVE</button>
    </FormQuestion>
    <button v-on:click="addNewQuestion()">ADD new question</button>
    <slot name="removeGroup"></slot>
  </div>
</template>

<script>
import FormQuestion from "./FormQuestion.vue";
export default {
  name: "FormGroup",
  components: {
    FormQuestion
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    const uid = this.generateUniqueId();
    var questions = Object.fromEntries([[uid, ""]]);
    return {
      questions: questions
    };
  },
  methods: {
    addNewQuestion(question) {
      if (question && question.questionId) {
        this.$set(this.questions, question.questionId, question);
      } else {
        const id = this.generateUniqueId();
        this.$set(this.questions, id, "");
      }
      this.sendGUpdate();
    },
    removeQuestion(id) {
      this.$delete(this.questions, id);
      this.sendGUpdate();
    },
    questionUpdate(data) {
      this.addNewQuestion(data);
    },
    generateUniqueId() {
      var dt = new Date().getTime();
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function(c) {
          var r = (dt + Math.random() * 16) % 16 | 0;
          dt = Math.floor(dt / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      return uuid;
    },
    sendGUpdate() {
      const questions = Object.values(this.questions).filter(el => {
        return typeof el === "object" && el !== null;
      });
      this.$emit("gupdate", { id: this.id, g: questions });
    }
  }
};
</script>

<style scoped>
.form-group {
  border: 2px solid lightgray;
  margin: 10px 20px 20px 20px;
  padding: 10px;
}

.remove {
  margin-left: 10px;
}
</style>
