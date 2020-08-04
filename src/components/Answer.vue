<template>
  <div class="answer">
    <div v-if="type == 'radiobtn'">
      <div v-for="(entry, index) in list" :key="`radiobtn-${index}`">
        <input
          type="radio"
          v-model="singleAnswer"
          :value="entry"
          :id="entry"
          :required="required"
        />
        <label :for="entry">{{ entry }}</label>
      </div>
    </div>
    <div v-if="type == 'checkbox'">
      <div v-for="(entry, index) in list" :key="`checkbox-${index}`">
        <input
          type="checkbox"
          v-model="multipleAnswers"
          :value="entry"
          :id="entry"
        />
        <label :for="entry">{{ entry }}</label>
      </div>
    </div>
    <input
      v-if="type == 'text'"
      type="text"
      v-model="singleAnswer"
      placeholder="Type your answer..."
      :required="required"
    />
    <div v-if="type == 'dropdown'">
      <select v-model="dropdownValue">
        <option disabled value="">Please select one</option>
        <option
          v-for="(entry, index) in list"
          v-bind:value="entry"
          :key="`dropdown-${index}`"
        >
          {{ entry }}
        </option>
      </select>
    </div>
    <input
      v-if="type == 'datepicker'"
      type="date"
      v-model="singleAnswer"
      :required="required"
    />
  </div>
</template>

<script>
export default {
  name: "Answer",
  props: {
    type: {
      type: String,
      required: true
    },
    questionId: {
      type: String,
      required: true
    },
    list: Array,
    required: Boolean
  },
  data() {
    return {
      singleAnswer: null,
      multipleAnswers: [],
      dropdownValue: ""
    };
  },
  watch: {
    singleAnswer: function() {
      this.$emit("completed", {answer: this.singleAnswer, questionId: this.questionId, required: this.required});
    },
    multipleAnswers: function() {
      this.$emit("completed", {answer: this.multipleAnswers, questionId: this.questionId, required: this.required});
    },
    dropdownValue: function() {
      this.$emit("completed", {answer: this.dropdownValue, questionId: this.questionId, required: this.required});
    }
  }
};
</script>

<style scoped></style>
