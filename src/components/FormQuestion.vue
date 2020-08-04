<template>
  <div class="form-question">
    <div v-if="onCreateView">
      <div class="flex-container">
        <div class="question">
          Question
          <input type="text" v-model="question" placeholder="Your question" />
        </div>
        <div class="type">
          Type
          <select v-model="answerType">
            <option disabled value="">Please select one</option>
            <option
              v-for="(entry, index) in types"
              v-bind:value="entry"
              :key="`dropdown-${index}`"
            >
              {{ entry }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex-container">
        <div v-if="needAnswerList" class="answer-list">
          Answer list:
          <button class="add" v-on:click="addNewAnswer()">+</button>
          <div
            v-for="(answer, index) in answerList"
            :key="`answer-${index}`"
            class="answer"
          >
            <button class="remove" v-on:click="removeAnswer(index)">x</button>
            <input
              type="text"
              v-model="answerList[index]"
              placeholder="Answer"
            />
          </div>
        </div>
        <div class="required">
          <input
            type="checkbox"
            v-model="required"
            :value="false"
            id="required"
          />
          <label for="required">Required </label>
        </div>
      </div>
    </div>
    <div class="added" v-else>
      <h3 :class="{ required: required }">{{ question }}</h3>
      <ul v-if="needAnswerList">
        <li v-for="(item, index) in answerList" :key="`answerOp-${index}`">
          {{ item }}
        </li>
      </ul>
      <div v-else>Answer type: {{ answerType }}</div>
    </div>
    <button class="toggle" v-on:click="toggleView()">
      {{ toggleContent }}
    </button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "FormQuestion",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      onCreateView: true,
      question: "",
      answerType: "",
      required: false,
      answerList: [""],
      types: [
        "multiple answers (checkbox)",
        "text",
        "single answer (radio btn)",
        "date",
        "dropdown"
      ],
      typesWithAnswerList: [
        "multiple answers (checkbox)",
        "single answer (radio btn)",
        "dropdown"
      ],
      typesMapping: {
        "multiple answers (checkbox)": "checkbox",
        text: "text",
        "single answer (radio btn)": "radiobtn",
        date: "datepicker",
        dropdown: "dropdown"
      },
      toggleContent: "SAVE"
    };
  },
  computed: {
    needAnswerList() {
      return this.typesWithAnswerList.indexOf(this.answerType) > -1;
    }
  },
  methods: {
    addNewAnswer() {
      this.answerList.push("");
    },

    removeAnswer(index) {
      this.answerList.splice(index, 1);
    },

    toggleView() {
      const isSave = this.toggleContent == "SAVE";
      if (isSave) {
        this.sendQuestionUpdate();
      }
      this.onCreateView = !this.onCreateView;
      this.toggleContent = isSave ? "EDIT" : "SAVE";
    },

    sendQuestionUpdate() {
      const question = {
        questionId: this.id,
        question: this.question,
        required: this.required,
        answerType: this.typesMapping[this.answerType],
        answerList: this.answerList.filter(el => {
          return el != "";
        })
      };

      question.answerList =
        question.answerList.length == 0 ? undefined : question.answerList;

      this.$emit("qupdate", question);
    }
  }
};
</script>

<style scoped>
.form-question {
  background-color: lightsteelblue;
  margin: 10px 20px 10px 20px;
  padding: 20px;
}
.flex-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.added {
  text-align: left;
}

.required:before {
  content: " *";
  color: red;
}

.answer-list {
}
</style>
