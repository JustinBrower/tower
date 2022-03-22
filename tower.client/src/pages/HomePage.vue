<template>
  <div class="container-fluid">
    <div class="row bg-secondary pt-2 pb-2 justify-content-center">
      <div class="col-10">
        <div class="row">
          <div class="col-2 d-flex justify-content-around">
            <button class="btn btn-info" @click="partyFilter('concert')">
              All
            </button>
          </div>
          <div class="col-2 d-flex justify-content-around">
            <button class="btn btn-info" @click="partyFilter('concert')">
              Concert
            </button>
          </div>
          <div class="col-2 d-flex justify-content-around">
            <button class="btn btn-info" @click="partyFilter('convention')">
              Convention
            </button>
          </div>
          <div class="col-2 d-flex justify-content-around">
            <button class="btn btn-info" @click="partyFilter('digital')">
              Digital
            </button>
          </div>
          <div class="col-2 d-flex justify-content-around">
            <button class="btn btn-info" @click="partyFilter('sport')">
              Sport
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid bg-primary">
    <div class="row">
      <div
        class="col-3 d-flex justify-content-around"
        v-for="p in parties"
        :key="p.id"
      >
        <Party :party="p" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { partiesService } from '../services/PartiesService'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      try {
        await partiesService.getAllParties()
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, 'error')
      }
    })
    return {
      async partyFilter(type) {
        try {
          await partiesService.partyFilter(type)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      parties: computed(() => AppState.parties)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
