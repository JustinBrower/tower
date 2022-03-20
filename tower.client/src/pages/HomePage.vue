<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3" v-for="p in parties" :key="p.id">
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
