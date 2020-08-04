<template>
  <div class="questionnaire">
    <h1> Please answer to the following questions: </h1>
  <form class="form"  @submit.stop.prevent="submit">
    <div v-if="error" class="error">
      {{ error }} <br />
      Check the console for more details.
    </div>
    <div
      v-else-if="Object.keys(config).length"
      class="step"
      v-for="(step, index) in steps"
      :key="`step-${index}`"
    >
      <h2 class="step-title">Step number: {{ index }}</h2>
      <Question
        v-for="(question, idx) in step"
        :key="question.questionId"
        :questionId="question.questionId"
        :question="question.question"
        :required="question.required"
        :answerType="question.answerType"
        :answerList="question.answerList"
        @completed="completed"
      >
        {{ idx + 1 }}. {{ question.question }}
      </Question>
    </div>
    <p>
      <input type="submit" value="Submit" :disabled="requiredCompleted" />
    </p>
  </form>
  </div>
</template>

<script>
// @ is an alias to /src
import Question from "@/components/Question.vue";
import configValidator from "@/utils/configValidator.js";
import configuration from "@/inputConfigurations/validCompleteConfig1.js";

export default {
  name: "Questionnaire",
  components: {
    Question
  },
  data() {
    return {
      config: {},
      error: null,
      answers: {},
      requiredQuestions: {},
      requiredCounter: 0
    };
  },
  computed: {
    steps() {
      console.log("in computed ", this.config);
      return this.config ? this.config.steps : null;
    },

    requiredCompleted() {
      if (
        Object.entries(this.requiredQuestions).length == this.requiredCounter
      ) {
        return false;
      }
      return true;
    }
  },
  methods: {
    getConfig(config) {
      const usedConfiguration = config ? config : configuration;

      this.config = Object.assign({}, this.config, usedConfiguration);
      this.config.steps.forEach(step => {
        step.forEach(question => {
          if (question.required) {
            this.requiredCounter++;
          }
        });
      });

      console.log("config - ", this.config);
      this.error = this.configValidation(usedConfiguration)
        ? null
        : "The configuration is not valid!";
    },

    submit() {
      this.$router.push({path: "/about?", query: this.generateOutput()});
    },

    generateOutput() {
      let steps = [];
      for (let step of this.config.steps) {
        let questionsOnStep = [];
        for (let question of step) {
          questionsOnStep.push({
            questionId: question.questionId,
            answer: this.answers[question.questionId]
          });
        }
        steps.push(questionsOnStep);
      }
      const output = {
        quizId: this.config.quizId,
        steps: steps
      };

      console.log("[OUTPUT]: ", output);
      return output;
    },

    configValidation() {
      return configValidator(this.config);
    },

    completed(data) {
      console.log("completed from Questionnaire - ", data);
      this.$set(this.answers, data.questionId, data.answer);
      if (data.required) {
        this.$set(this.requiredQuestions, data.questionId, data.answer);
      }
    }
  },
  mounted() {
    console.log(this.$route.query);
    if (this.$route.query) {
      let conf = this.$route.query;

      for (let i = 0; i < conf.steps.length; i++) {
        if (!Array.isArray(conf.steps[i])) {
          conf.steps[i] = JSON.parse(conf.steps[i]);
        }
        for (let j = 0; j < conf.steps[i].length; j++) {
          conf.steps[i][j] = JSON.parse(conf.steps[i][j]);
        }
      };
      this.getConfig(conf);
    } else {
      this.getConfig();
    }

    console.log("beforeMount ", this.config);
  }
};
</script>
<style scoped>
.step {
  padding-bottom: 10px;
  background-color: aliceblue;
}
.step-title {
  text-align: center;
}
</style>
