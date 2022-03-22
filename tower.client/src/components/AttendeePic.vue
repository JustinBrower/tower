<template #title>
  <div>
    <img class="mini-pic" :src="ticket.creator.picture" alt="" />
  </div>
</template>


<script>
export default {
  props: {
    ticket: {
      type: Object,
      required: true,
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.mini-pic {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
</style>