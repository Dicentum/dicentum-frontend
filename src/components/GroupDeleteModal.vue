<script>
import userService from "@/services/userService.js";
import { useToast } from 'vue-toastification';
import groupService from "@/services/groupService.js";

export default {
  name: 'GroupDeleteModal',
  data() {
    return {
      code: "",
    }
  },
  methods: {
    closeModal() {
      document.getElementById('close').click();
    },
    async deleteGroup() {
      try {
        const userId = await this.$store.state.userid;
        await groupService.deleteRequestGroup(this.code, userId);
        this.closeModal();
        this.$toast.info('Request deleted!');
      } catch (error) {
        if (error.message.startsWith('Internal Error: CastError:')) {
          this.$toast.error("Error: The group code is not valid")
        } else {
          console.error(error.message || 'Failed to send request.');
          this.$toast.error(error.message || 'Failed to send request.');
        }
      }
    }
  },
  mounted() {
    this.$toast = useToast();
  }
};
</script>

<template>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-danger w-45 py-2" data-bs-toggle="modal" data-bs-target="#groupDeleteModal">
    Delete current request
  </button>

  <!-- Modal -->
  <div class="modal fade" ref="modal" id="groupDeleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Delete request</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close" id="close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent>
            <p>Write here the code for the parliamentary group you want to delete the request</p>
            <div class="form-floating mb-3">
              <input type="text" class="form-control" placeholder="id" v-model="code">
              <label for="floatingInput">Group code</label>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-danger" @click="deleteGroup">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.close {
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: .5;
}
button, select {
  text-transform: none;
}
button, input {
  overflow: visible;
}
.close:not(:disabled):not(.disabled) {
  cursor: pointer;
}
.modal-header .close {
  padding: 1rem;
  margin: -1rem -1rem -1rem auto;
}
button.close {
  padding: 0;
  background-color: transparent;
  border: 0;
  -webkit-appearance: none;
}
</style>