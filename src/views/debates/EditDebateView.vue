<script>
import groupService from "@/services/groupService.js";
import parliamentService from "@/services/parliamentService.js";
import {useToast} from "vue-toastification";
import userService from "@/services/userService.js";
import debatesService from "@/services/debatesService.js";

export default {
  name: 'EditDebateView',
  data() {
    return {
      debate: {},
      condition: false,
    }
  },
  methods: {
    formatDateToDateTimeLocal(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      const hours = ('0' + date.getHours()).slice(-2);
      const minutes = ('0' + date.getMinutes()).slice(-2);
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    },
    cancelEdit() {
      this.$router.go(-1);
    },
    async fetchDebate(){
      try {
        const id = this.$route.params.id;
        const debate = await debatesService.getDebate(id);
        debate.date = this.formatDateToDateTimeLocal(debate.date);
        debate.startDateVote = this.formatDateToDateTimeLocal(debate.startDateVote);
        debate.endDateVote = this.formatDateToDateTimeLocal(debate.endDateVote);
        this.debate = debate;
      } catch (error) {
        console.error(error);
      }
    },
    async editDebate() {
      try {
        if(this.condition){
          await debatesService.editDebate(this.debate._id, this.debate);
          this.$router.go(-1);
          this.$toast.success('Debate edited!');
        } else {
          this.$router.push({ name: 'debates' });
          this.$toast.error('You are not allowed to do that');
        }
      } catch (error) {
        this.$toast.error(error.message);
        console.log(error)
      }
    },
    async isAdminAndParliamentCreated() {
      try {
        const userId = await this.$store.state.userid;
        if (!userId) {
          throw new Error('User ID is not set');
        }
        const user = await userService.getUser(userId);
        const parliament = this.$store.state.parliamentId;
        if (user.role === "admin" && parliament) {
          this.condition = true;
        }
      } catch (error) {
        console.log('Failed to fetch user');
      }
    },
  },
  mounted() {
    this.$toast = useToast();
    this.fetchDebate().then(() => {
      this.isAdminAndParliamentCreated();
    });
  }
};
</script>

<template>
  <div class="container">
    <div class="startinfo">
      <div class="editable" v-if="condition">
        <h2>Edit {{ debate.title }}</h2>
        <br>
        <form @submit.prevent="editDebate">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" placeholder="Name" v-model="debate.title">
            <label for="floatingInput">Name</label>
          </div>
          <div class="form-floating mb-3">
            <textarea class="form-control" placeholder="Description" v-model="debate.description" style="height: 100px"></textarea>
            <label for="floatingTextarea2">Description</label>
          </div>
          <div class="form-floating mb-3">
            <select class="form-control" v-model="debate.type">
              <option disabled value="">Please select a debate mode</option>
              <option value="online">Online</option>
              <option value="presential">Presential</option>
            </select>
            <label for="floatingSelect">Mode</label>
          </div>
          <div class="form-floating mb-3">
            <input type="datetime-local" class="form-control" placeholder="Date" v-model="debate.date">
            <label for="floatingInput">Date</label>
          </div>
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" v-model="debate.isClosed">
            <label class="form-check-label" for="defaultCheck1">
              Already closed
            </label>
          </div>
          <transition name="fade">
            <div class="row mb-3" v-if="debate.isClosed == false">
            <div class="col">
              <div class="form-floating mb-3">
                <input type="datetime-local" class="form-control" placeholder="Voting start date" v-model="debate.startDateVote">
                <label for="floatingInput">Voting start date</label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating mb-3">
                <input type="datetime-local" class="form-control" placeholder="Voting end date" v-model="debate.endDateVote">
                <label for="floatingInput">Voting end date</label>
              </div>
            </div>
              <div>
                <div class="form-floating mb-3">
                  <textarea class="form-control" placeholder="Description" v-model="debate.votingDescription" style="height: 100px"></textarea>
                  <label for="floatingTextarea2">Voting description</label>
                </div>
              </div>
          </div>
          </transition>
          <div class="d-flex justify-content-between button-submit">
            <button class="btn btn-secondary w-45 py-2" type="button" @click="cancelEdit">Cancel</button>
            <button class="btn btn-primary w-45 py-2" type="submit">Edit</button>
          </div>
        </form>
      </div>
      <div v-else>
        <BButton variant="primary" disabled>
          <BSpinner small type="grow" />
          Loading...
        </BButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.button-submit{
  margin-bottom: 1rem;
}
</style>