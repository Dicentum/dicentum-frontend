<script>
import groupService from "@/services/groupService.js";
import parliamentService from "@/services/parliamentService.js";
import {useToast} from "vue-toastification";
import userService from "@/services/userService.js";
import debatesService from "@/services/debatesService.js";

export default {
  name: 'CreateDebateView',
  data() {
    return {
      debate: {isClosed: false},
      condition: false,
    }
  },
  methods: {
    cancelCreate() {
      this.$router.go(-1);
    },
    async createDebate() {
      try {
        if(this.condition){
          this.debate.parliament = this.$store.state.parliamentId;
          this.debate.date = new Date(this.debate.date);
          this.debate.startDateVote = new Date(this.debate.startDateVote);
          this.debate.endDateVote = new Date(this.debate.endDateVote);
          await debatesService.createDebate(this.debate);
          this.$router.go(-1);
          this.$toast.success('Debate created!');
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
    this.isAdminAndParliamentCreated();
  }
};
</script>

<template>
  <div class="container">
    <div class="startinfo">
      <div class="editable" v-if="condition">
        <h2>Create a new debate</h2>
        <form @submit.prevent="createDebate">
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
            <button class="btn btn-secondary w-45 py-2" type="button" @click="cancelCreate">Cancel</button>
            <button class="btn btn-primary w-45 py-2" type="submit">Create</button>
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