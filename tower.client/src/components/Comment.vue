<template>
  <div class="bg-light">
    <img
      class="img-fluid profile-pic"
      :src="comment.creator.picture"
      alt="prof_pic"
    />
    <p class="ms-2">{{ comment.creator.name }}</p>
    <p class="ms-2">{{ comment.body }}</p>
    <i
      v-if="comment.creator.id == account.id"
      @click="deleteComment"
      title="Delete"
      class="mdi mdi-delete selectable"
    ></i>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { commentsService } from '../services/CommentsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    return {
      async deleteComment() {
        try {
          if (await Pop.confirm())
            await commentsService.deleteComment(props.comment.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      account: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>
.profile-pic {
  width: 100px;
  height: 100px;
  border-image: round;
}
</style>