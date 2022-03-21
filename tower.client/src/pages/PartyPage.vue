<template>
  <div class="container-fluid bg-secondary">
    <div class="row justify-content-center">
      <div class="col-12">
        <h1>{{ thisParty.name }}</h1>
        <div class="row justify-content-center">
          <div class="col-12 justify-content-center d-flex">
            <p>
              {{ thisParty.description }}
              <img
                class="details-size img-fluid image-opaque"
                :src="thisParty.coverImg"
                alt="cover_image"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p v-if="thisParty.capacity > 0">
          Tickets Left: {{ thisParty.capacity }}
        </p>
        <p v-else style="color: red">MAX CAPACITY</p>
        <p>Date: {{ new Date(thisParty.startDate).toLocaleString() }}</p>
        <p>Location: {{ thisParty.location }}</p>
        <p>Type: {{ thisParty.type }}</p>
      </div>
      <div v-if="thisParty.creatorId == account.id && !thisParty.isCanceled">
        <button @click="cancelParty" class="btn btn-danger me-2 p-1">
          CANCEL
        </button>
        <button @click="editParty" class="btn btn-primary">EDIT</button>
      </div>
      <div v-if="thisParty.creatorId !== account.id && !thisParty.isCanceled">
        <button @click="buyTicket" class="btn btn-success">Buy Ticket</button>
      </div>
      <p>{{ thisParty.isCanceled }}</p>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { onMounted, watchEffect } from '@vue/runtime-core'
import { partiesService } from '../services/PartiesService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { useRoute } from 'vue-router'
export default {
  name: 'Party',
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        await partiesService.setActive(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      async cancelParty() {
        try {
          if (await Pop.confirm()) {
            await partiesService.cancelParty(this.thisParty.id)
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      thisParty: computed(() => AppState.activeParty),
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped lang="scss">
.details-size {
  height: auto;
  width: 115vh;
}
.image-opaque {
  opacity: 50%;
}
</style>
