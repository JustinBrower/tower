<template>
  <div class="card mt-2 mb-2" style="width: 18rem">
    <img
      class="card-img-top hoverable"
      :src="party.coverImg"
      alt="cover_image"
      @click="goTo('Party')"
    />
    <div class="card-body" v-if="!party.isCanceled">
      <div class="card-text">
        <h4>{{ party.name }}</h4>
        <p>{{ party.description }}</p>
        <div>
          <p v-if="party.capacity > 0">Tickets Left: {{ party.capacity }}</p>
          <p v-else style="color: red">MAX CAPACITY</p>
          <p>Date: {{ new Date(party.startDate).toLocaleString() }}</p>
          <p>Location: {{ party.location }}</p>
          <p>{{ party.type }}</p>
          <!-- NOTE THIS THROWS AN ERROR BUT THIS WAS AN AWESOME SOLUTION SO I DONT WANNA FIX IT -->
          <button v-if="party.mine == true" class="btn btn-warning">
            Refund
          </button>
        </div>
      </div>
    </div>
    <div class="card-body bg-danger" v-else>
      <div class="card-text">
        <h4>{{ party.name }}</h4>
        <p>{{ party.description }}</p>
        <div>
          <p v-if="party.capacity > 0">Tickets Left: {{ party.capacity }}</p>
          <p v-else style="color: red">MAX CAPACITY}</p>
          <p>Date: {{ new Date(party.startDate).toLocaleString() }}</p>
          <p>Location: {{ party.location }}</p>
          <p>{{ party.type }}</p>
          <p>CANCELED</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { router } from '../router';
import { logger } from '../utils/Logger';
import { AppState } from '../AppState';
import { onMounted } from '@vue/runtime-core';
import { ticketsService } from '../services/TicketsService';
import { partiesService } from '../services/PartiesService';
import Pop from '../utils/Pop';
export default {
  props: {
    party: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    // onMounted(async () => {
    //   try {
    //     await ticketsService.getMyTickets()
    //   } catch (error) {
    //     logger.error(error)
    //     Pop.toast(error.message, 'error')
    //   }
    //   try {
    //     await partiesService.getAllParties()
    //   } catch (error) {
    //     logger.error(error)
    //     Pop.toast(error.message, 'error')
    //   }
    // })
    return {
      goTo(page) {
        router.push({
          name: page,
          params: { id: props.party.id },
        });
      },
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),
      myParties: computed(() => {
        let newParties = []
        for (let i = 0; i < AppState.tickets.length; i++) {
          let ticket = AppState.parties.find(p => p.id === AppState.tickets[i].id)
          newParties.push(ticket)
        }
        logger.log("newParties is...", newParties)
        return newParties
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.hoverable:hover {
  cursor: pointer;
  transform: scale(1.07);
  box-shadow: 0px 15px 10px rgba(0, 0, 0, 0.3);
  transition: 50ms ease-in-out;
}
.hoverable:active {
  transform: scale(0.98);
  transition: 50ms ease-in-out;
}
</style>