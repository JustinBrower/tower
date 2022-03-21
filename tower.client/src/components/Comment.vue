<template>
  <div class="bg-light">
    <img
      class="img-fluid profile-pic"
      :src="comment.creator.picture"
      alt="prof_pic"
    />
    <p class="ms-2">{{ comment.creator.name }}</p>
    <p class="ms-2">{{ comment.body }}</p>
    <i @click="deleteComment" class="mdi mdi-delete"></i>
  </div>
</template>


<script>
import { commentsService } from '../services/CommentsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
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
      }
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