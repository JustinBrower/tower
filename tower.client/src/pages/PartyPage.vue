<template>
  <div class="container-fluid bg-secondary">
    <div class="row justify-content-center">
      <img
        class="img-fluid bg-pic"
        :src="thisParty.coverImg"
        alt="cover_image"
      />
      <h1 class="col-2 text-name">{{ thisParty.name }}</h1>
    </div>
    <div class="row">
      <div class="col-12">
        <h1 class="text-description">{{ thisParty.description }}</h1>
        <h3 class="text-details">
          <p v-if="thisParty.capacity > 0">
            Tickets Left: {{ thisParty.capacity }}
          </p>
          <p v-else style="color: red">MAX CAPACITY</p>
          <p>Date: {{ new Date(thisParty.startDate).toLocaleString() }}</p>
          <p>Location: {{ thisParty.location }}</p>
          <p>Type: {{ thisParty.type }}</p>
        </h3>
      </div>
      <div v-if="thisParty.creatorId == account.id && !thisParty.isCanceled">
        <button @click="cancelParty" class="btn btn-danger me-2 p-1">
          CANCEL
        </button>
        <button
          data-bs-toggle="modal"
          data-bs-target="#editModal"
          class="btn btn-primary"
        >
          EDIT
        </button>
      </div>
      <div
        v-if="
          thisParty.creatorId !== account.id &&
          !thisParty.isCanceled &&
          thisParty.capacity > 0 &&
          yourTicket == undefined
        "
      >
        <button @click="buyTicket" class="btn btn-success">Buy Ticket</button>
      </div>
      <div style="color: red" v-else>
        Unable To Purchase
        <!-- TODO COULD ADD V-IF THAT SAYS IF YOU'RE ATTENDING -->
        <p v-if="thisParty.isCanceled" style="color: red">CANCELED</p>
      </div>
    </div>
    <div class="row justify-content-start pt-3">
      <div class="col-1" v-for="t in tickets" :key="t.ticketId">
        <AttendeePic :ticket="t" />
      </div>
    </div>
    <div class="row pt-3">
      <div class="col-4 bg-light p-2">
        <form @submit.prevent="postComment">
          <label class="me-2" for="comment">Comment: </label>
          <input required v-model="editable.body" type="text" />
          <button class="btn btn-primary ms-2">Comment</button>
        </form>
      </div>
    </div>
  </div>
  <div class="container-fluid bg-secondary pt-5">
    <div class="row">
      <div class="col-6" v-for="c in comments" :key="c.index">
        <Comment :comment="c" />
      </div>
    </div>
  </div>

  <Modal id="filtersModal">
    <template #title>Add Filters...</template>

    <template #body>
      <form @submit="filter" class="row">
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
  <Modal id="editModal">
    <template #title>Edit Event</template>

    <template #body>
      <form @submit.prevent="editParty" class="row">
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
            <select required v-model="editable.type">
              <option></option>
              <option>concert</option>
              <option>convention</option>
              <option>digital</option>
              <option>sport</option>
            </select>
          </div>
        </div>
        <!-- TODO MAKE THIS CLOSE MODAL -->
        <div class="p-2">
          <button @click="editParty" type="button" class="btn btn-primary">
            Edit Event
          </button>
        </div>
      </form>
    </template>
  </Modal>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState'
import { onMounted, watchEffect } from '@vue/runtime-core'
import { partiesService } from '../services/PartiesService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { useRoute } from 'vue-router'
import { commentsService } from '../services/CommentsService'
import { ticketsService } from '../services/TicketsService'
export default {
  name: 'Party',
  setup() {
    const editable = ref({});
    const route = useRoute();
    onMounted(async () => {
      try {
        await partiesService.setActive(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
      try {
        await commentsService.getPartyComments(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
      try {
        await ticketsService.getPartyTickets(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      editable,
      async cancelParty() {
        try {
          if (await Pop.confirm()) {
            await partiesService.cancelParty(this.thisParty.id)
            Pop.toast("Event Canceled!")
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async editParty() {
        try {
          await partiesService.editParty(editable.value, route.params.id)
          Pop.toast("Event Edited!")
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async postComment() {
        try {
          editable.value.eventId = route.params.id
          await commentsService.postComment(editable.value)
          Pop.toast("Comment Posted!")
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async buyTicket() {
        try {
          editable.value.eventId = this.thisParty.id
          const ticket = await ticketsService.buyTicket(editable.value)
          Pop.toast("Ticket Bought for " + this.thisParty.name)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      thisParty: computed(() => AppState.activeParty),
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),
      yourTicket: computed(() => AppState.tickets.find(t => t.accountId == AppState.account.id)),
      // theseTickets: computed(() => AppState.tickets.filter(t => t.id === AppState.activeParty.id))
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

.bg-pic {
  opacity: 50%;
  width: 100%;
  max-height: 125vh;
}

.text-name {
  opacity: 70%;
  position: absolute;
  top: 100px;
  left: 50px;
  background-color: black;
  color: white;
  padding-left: 40px;
  padding-right: 15px;
  padding-bottom: 10px;
}

.text-description {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 70%;
  background-color: black;
  color: white;
  padding-left: 40px;
  padding-right: 15px;
  padding-bottom: 10px;
}

.text-details {
  opacity: 70%;
  position: absolute;
  bottom: -50px;
  left: 50px;
  background-color: black;
  color: white;
  padding-top: 10px;
  padding-left: 40px;
  padding-right: 15px;
  padding-bottom: 10px;
}
</style>
