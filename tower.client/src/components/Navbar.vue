<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        TOWER
        <!-- <img alt="logo" src="" height="45" /> -->
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <div class="navbar-nav me-auto">
        <div class="ms-3" v-if="user.isAuthenticated">
          <button
            data-bs-toggle="modal"
            data-bs-target="#createModal"
            class="btn btn-success"
          >
            Create Event
          </button>
        </div>
      </div>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
  <Modal id="createModal">
    <template #title>Create Event</template>

    <template #body>
      <form @submit.prevent="createParty" class="row">
        <div class="container-fluid">
          <div class="row">
            <label class="p-2" for="name">Name:</label>
            <input v-model="editable.name" required type="text" />
          </div>
          <div class="row">
            <label class="p-2" for="description">Description:</label>
            <input v-model="editable.description" required type="text" />
          </div>
          <div class="row">
            <label class="p-2" for="location">Location:</label>
            <input v-model="editable.location" required type="text" />
          </div>
          <div class="row">
            <label class="p-2" for="capacity">Capacity:</label>
            <input v-model="editable.capacity" required min="1" type="number" />
          </div>
          <div class="row">
            <label class="p-2" for="startDate">Start Date:</label>
            <input v-model="editable.startDate" required type="date" />
          </div>
          <div class="row">
            <label class="p-2" for="coverImg">Image:</label>
            <input v-model="editable.coverImg" required type="text" />
          </div>

          <div class="row">
            <label class="p-2" for="type">Type:</label>
            <select v-model="editable.type">
              <option></option>
              <option>concert</option>
              <option>convention</option>
              <option>digital</option>
              <option>sport</option>
            </select>
          </div>
        </div>
        <!-- TODO MAKE THIS CLOSE MODAL -->
        <div class="mt-2 d-flex justify-content-end align-items-center">
          <button @click="createParty" type="button" class="btn btn-success">
            Create Event
          </button>
        </div>
      </form>
    </template>
  </Modal>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { AppState } from '../AppState';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { partiesService } from '../services/PartiesService';
import { useRoute } from 'vue-router';
import { router } from '../router';
export default {
  setup() {
    const route = useRoute();
    const editable = ref({})
    return {
      editable,
      async createParty() {
        try {
          logger.log("attempting to create event...")
          const party = await partiesService.createParty(editable.value)
          router.push({ name: 'Party', params: { id: party.id } })
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      user: computed(() => AppState.user),
    };
  },
};
</script>

<style scoped>
</style>
