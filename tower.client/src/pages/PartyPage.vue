<template>
  <h1>This is the party page</h1>
  <p>{{ thisParty.name }}</p>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { onMounted } from '@vue/runtime-core'
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
      thisParty: computed(() => AppState.activeParty)
    }
  }
}
</script>
