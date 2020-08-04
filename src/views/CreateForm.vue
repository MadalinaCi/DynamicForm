<template>
  <div class="create-form">
    <h1>Create your form!</h1>
    <FormGroup
      v-for="(value, key, index) in groups"
      :key="`formgroup-${index}`"
      :id="key"
      @gupdate="groupUpdate"
    >
      Step {{ index + 1 }}:
      <template v-slot:removeGroup>
        <button class="remove" v-on:click="removeGroup(key)">
          REMOVE group
        </button>
      </template>
    </FormGroup>
    <button v-on:click="addNewGroup">ADD new group</button>
    <button v-on:click="generateConfig">GENERATE form</button>
  </div>
</template>

<script>
import FormGroup from "../components/FormGroup.vue";
export default {
  name: "CreateForm",
  components: {
    FormGroup
  },
  data() {
    const uid = this.generateUniqueId();
    var groups = Object.fromEntries([[uid, ""]]);
    return {
      groups: groups
    };
  },
  methods: {
    addNewGroup() {
      const id = this.generateUniqueId();
      this.$set(this.groups, id, "");
    },

    removeGroup(key) {
      this.$delete(this.groups, key);
    },

    groupUpdate(data) {
      const group = data ? data.g : null,
        id = data ? data.id : null;

      if (id && group) {
        this.$set(this.groups, id, group);
      }
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

    generateConfig() {
      const groups = Object.values(this.groups).filter(el => {
        return typeof el === "object" && el !== null;
      });

      let questionsNo = 0,
        steps = [];
      groups.forEach(group => {
        let g = group;
        for (let i = 0; i < group.length; i++) {
          g[i] = JSON.stringify(group[i]);
        }
        steps.push(g);
        questionsNo = questionsNo + group.length;
      });

      let config = {
        quizId: this.generateUniqueId(),
        stepsNo: groups.length,
        questionsNo: questionsNo,
        steps: steps
      };

      this.$router.push({ path: "/?", query: config });
    }
  }
};
</script>

<style scoped>
button {
  margin: 5px;
}
</style>
