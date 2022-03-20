<template>
  <div class="card mt-2 mb-2" style="width: 18rem">
    <img class="card-img-top" :src="party.coverImg" alt="Card image cap" />
    <div class="card-body">
      <div class="card-text">
        <h4>{{ party.name }}</h4>
        {{ party.description }}
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    party: {
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
</style>