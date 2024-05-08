<script>
import { useRoute } from 'vue-router';
import groupService from "@/services/groupService.js";
import GroupSquare from "@/components/GroupSquare.vue";
import PersonSquare from "@/components/PersonSquare.vue";
import PersonRequestSquare from "@/components/PersonRequestSquare.vue";
import {useToast} from "vue-toastification";
import fileService from "@/services/fileService.js";

const API_URL = import.meta.env.VITE_API_URL;

export default {
  name: 'GroupDetailView',
  components: {PersonSquare, GroupSquare, PersonRequestSquare},
  data() {
    return {
      group: null,
      image: null,
      showImage: false,
      apiURL: API_URL,
      userRole: this.$store.state.userRole,
    };
  },
  created() {
    this.fetchGroupData();
  },
  methods: {
    async fetchGroupData() {
      try {
        const id = this.$route.params.id;
        this.group = await groupService.getGroup(id);
        if (this.group.logo) {
          await this.fetchImage(this.group.logo);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async editGroup() {
      this.$router.push({name: 'editGroup'});
    },
    async managePeople() {
      this.$router.push({name: 'groupsManage'});
    },
    async fetchImage() {
      try {
        if (this.group.logo) {
          const imageData = await fileService.getImageData(this.group.logo);
          this.image = imageData.filename;
          this.showImage = true;
        }
      } catch (error) {
        console.error(error.message);
        this.$toast.error(error.message);
      }
    },
    async deleteGroup() {
      try {
        await groupService.deleteGroup(this.group._id);
        this.$router.push({name: 'groups'});
        this.$toast.success('Group deleted successfully!');
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.$toast = useToast();
  }
};
</script>

<template>
  <div v-if="group">
    <BBreadcrumb>
      <BBreadcrumbItem @click="this.$router.push({path: '/dashboard'});"> Dashboard </BBreadcrumbItem>
      <BBreadcrumbItem @click="this.$router.push({name: 'groups'});">Groups</BBreadcrumbItem>
      <BBreadcrumbItem active>Details</BBreadcrumbItem>
    </BBreadcrumb>
    <div class="group-details">
      <div v-if="showImage">
        <img :src="apiURL+'/files/'+image" alt="Group logo" class="group-logo">
      </div>
      <div class="group-info">
        <div class="editable">
          <h2>{{group.name}}</h2>
          <div v-if="userRole == 'admin'">
          <BDropdown end text="Options" variant="secondary" class="options-dropdown">
            <BDropdownItem @click="editGroup">Edit</BDropdownItem>
            <BDropdownItem @click="managePeople">Manage people</BDropdownItem>
            <BDropdownDivider />
            <BDropdownItem @click="deleteGroup" style="color: firebrick">Delete</BDropdownItem>
          </BDropdown>
          </div>
        </div>
        <h4>{{group.description }}</h4>
        <p class="text-start" v-if="group.seats">
          <span>Seats: <strong>{{group.seats.toString()}}</strong></span>
        </p>
      </div>
    </div>
    <div v-if="group.color && group.seats">
      <br>
      <div style="display: flex; flex-wrap: wrap;">
        <div v-for="user in group.users" :key="user.id" :style="{ backgroundColor: group.color, width: '50px', height: '50px', borderRadius: '50%', marginRight:'5px' }"></div>
        <div v-for="n in (group.seats - group.users.length)" :key="n" :style="{ backgroundColor: 'grey', width: '50px', height: '50px', borderRadius: '50%', marginRight:'5px', marginBottom: '5px' }"></div>
      </div>
      <br>
    </div>
    <div v-if="group.users && group.users.length">
      <h2>Users:</h2>
      <PersonSquare v-for="user in group.users" :key="user" :userId="user"/>
    </div>
  </div>
  <div v-else>
    <BButton variant="primary" disabled>
      <BSpinner small type="grow" />
      Loading...
    </BButton>
  </div>
</template>

<style scoped>
.group-details {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.group-info {
  flex: 1; /* To make the group info section take remaining space */
}

.editable {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.options-dropdown {
  margin-left: auto; /* Pushes the dropdown to the right */
}

.group-logo {
  width: 6rem;
  height: 6rem;
  object-fit: cover;
  border-radius: 50%;
}
</style>

