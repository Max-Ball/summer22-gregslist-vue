<template>
  <div class="bg-white elevation-2">
    <router-link :to="{ name: 'House', params: { houseId: house.id } }">
      <img class="img-fluid" :src="house.img" alt="">
    </router-link>
  </div>
</template>



<script>
import { House } from '../../models/House';

export default {
  props: {
    house: { Type: House, required: true }
  },
  setup() {

    return {};
  },
};
</script>



<style>
</style>