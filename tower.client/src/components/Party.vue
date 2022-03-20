<template>
  <div class="card mt-2 mb-2" style="width: 18rem">
    <img
      class="card-img-top hoverable"
      :src="party.coverImg"
      alt="Card image cap"
      @click="goTo('Party')"
    />
    <div class="card-body">
      <div class="card-text">
        <h4>{{ party.name }}</h4>
        {{ party.description }}
      </div>
    </div>
  </div>
</template>


<script>
import { router } from '../router';
export default {
  props: {
    party: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    return {
      goTo(page) {
        router.push({
          name: page,
          params: { id: props.party.id },
        });
      }
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