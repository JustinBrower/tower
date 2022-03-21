<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img alt="logo" src="../assets/img/cw-logo.png" height="45" />
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
        <button
          data-bs-toggle="modal"
          data-bs-target="#filtersModal"
          class="btn btn-info hoverable"
        >
          Filters
        </button>
        <div class="ms-3" v-if="user.isAuthenticated">
          <button class="btn btn-success">Create Event</button>
        </div>
      </div>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
  <Modal id="filtersModal">
    <template #title>Add Filters...</template>

    <template #body>
      <form @submit="createTask" class="row">
        <div>
          <label class="p-2" for="concert">Concert</label>
          <input type="checkbox" />
          <label class="p-2" for="convention">Convention</label>
          <input type="checkbox" />
          <label class="p-2" for="sport">Sport</label>
          <input type="checkbox" />
          <label class="p-2" for="digital">Digital</label>
          <input type="checkbox" />
        </div>
        <!-- TODO MAKE THIS CLOSE MODAL -->
        <div class="d-flex justify-content-end align-items-center">
          <button type="button" class="btn btn-success">Save Changes</button>
        </div>
      </form>
    </template>
  </Modal>
</template>

<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
    };
  },
};
</script>

<style scoped>
</style>
