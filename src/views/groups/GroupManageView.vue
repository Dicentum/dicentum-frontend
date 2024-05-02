<script>
import groupService from "@/services/groupService.js";
import parliamentService from "@/services/parliamentService.js";
import {useToast} from "vue-toastification";
import userService from "@/services/userService.js";
import PersonAddSquare from "@/components/PersonAddSquare.vue";

export default {
  name: 'EditGroupView',
  components: {PersonAddSquare},
  data() {
    return {
      group: {},
      users: [],
      searchTerm: '',
    }
  },
  computed: {
    filteredUsers() {
      if (this.searchTerm) {
        return this.users.filter(user =>
            ['name', 'surname', 'description', 'email'].some(field =>
                user[field] && user[field].includes(this.searchTerm)
            )
        );
      } else {
        return this.users;
      }
    }
  },
  methods: {
    async fetchGroupData() {
      try {
        const id = this.$route.params.id;
        this.group = await groupService.getGroup(id);
      } catch (error) {
        console.error(error);
      }
    },
    cancelUpdate() {
      this.$router.go(-1);
    },
    async searchUsers(){
      this.users = await userService.getAllUsers();
      console.log(this.users);
    }
  },
  mounted() {
    this.$toast = useToast();
    this.fetchGroupData();
  }
};
</script>

<template>
  <div class="container">
    <div class="startinfo">
      <div class="editable" v-if="group">
        <h2>Manage people in {{group.name}}</h2>
        <br>
        <div v-if="group.requestedUsers && group.requestedUsers.length">
          <h4>Requested Users:</h4>
          <PersonRequestSquare v-for="user in group.requestedUsers" :key="user" :userId="user"/>
          <br>
        </div>
        <div>
          <BInputGroup prepend="Search" class="mt-3">
            <BFormInput v-model="searchTerm" @keyup.enter="searchUsers"/>
            <BInputGroupAppend>
              <BButton variant="outline-success" @click="searchUsers">Go</BButton>
            </BInputGroupAppend>
          </BInputGroup>
        </div>
        <div v-if="filteredUsers.length">
          <br>
          <h4>Result:</h4>
          <PersonAddSquare v-for="user in filteredUsers" :key="user._id" :userId="user._id"/>
        </div>
      </div>
      <div v-else>
        <BSpinner />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>