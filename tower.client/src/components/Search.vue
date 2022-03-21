<template>
  <form class="form-group row" @submit.prevent="search">
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <div class="row">
          <input
            v-model="query"
            type="text"
            class="col-9"
            placeholder="search...."
          />
          <button class="btn btn-info col-3">search</button>
        </div>
      </div>
      <div class="col-3"></div>
    </div>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import Pop from "../utils/Pop";
import { partiesService } from '../services/PartiesService';
export default {
  setup() {
    const query = ref("");
    return {
      query,
      async search() {
        try {
          await partiesService.search(query.value);
        } catch (error) {
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>