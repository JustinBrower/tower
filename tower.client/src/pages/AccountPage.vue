<template>
  <div class="container-fluid">
    <div class="row p-2 mt-3 d-flex justify-content-center">
      <div class="text-start p-5 shadow col-6 bg-light">
        <h1 class="col-12 p-1 border-bottom border-primary text-primary">
          Account Management - {{ account.name }}
        </h1>
        <div class="row d-flex justify-content-center">
          <form @submit.prevent="editAccount">
            <p></p>
            <input
              v-model="editable.name"
              class="col-12 mt-1 p-1 rounded"
              type="text"
              placeholder="Edit Name"
            />
            <p></p>
            <input
              v-model="editable.picture"
              class="col-12 mt-1 p-1 rounded"
              type="text"
              placeholder="Edit Profile Picture"
            />
            <div class="d-flex p-2 justify-content-end">
              <button
                @click="editAccount"
                type="button"
                class="btn btn-info hoverable"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { accountService } from '../services/AccountService'
import Pop from '../utils/Pop'
export default {
  name: 'Account',
  setup() {
    const editable = ref({})
    return {
      editable,
      async editAccount() {
        try {
          await accountService.editAccount(editable.value)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message)
        }
      },
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
.hoverable:hover {
  transform: scale(1.07);
  box-shadow: 0px 15px 10px rgba(0, 0, 0, 0.3);
  transition: 50ms ease-in-out;
}
.hoverable:active {
  transform: scale(0.98);
  transition: 50ms ease-in-out;
}
p,
input,
button,
h1 {
  font-size: 16px;
}
</style>
