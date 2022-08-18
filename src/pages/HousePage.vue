<template>
  <div class="p-2" v-if="house">
    <img class="img-fluid" :src="house.img" alt="">
    <h4 class="text-center">{{ house.bedrooms }} bed | {{ house.bathrooms }} bath | {{ house.levels }} levels</h4>
    <p>{{ house.year }}</p>
    <p class="text-end text-success m-0">$<b>{{ house.price }}</b></p>
    <div class="p-2">
      <p>{{ house.description }}</p>
    </div>
    <button class="btn btn-danger m-3" @click="deleteHouse(house)">Delete</button>
    <button class=" btn btn-primary m-3" @click="adjustHouse(house)" data-bs-toggle="modal"
      data-bs-target="#house-form">Update</button>
    <Modal id="house-form">
      <HouseForm />
    </Modal>
  </div>
  <div v-else>
    loading...
  </div>
</template>



<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { housesService } from '../services/HousesService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {

  setup() {
    const route = useRoute()

    async function getHouseById() {
      try {
        await housesService.getHouseById(route.params.houseId)
      } catch (error) {
        logger.log('[getting house by id]', error)
        Pop.error(error)
      }
    }

    onMounted(() => { getHouseById() })

    return {
      house: computed(() => AppState.activeHouse),

      adjustHouse(house) {
        housesService.setActiveHouse(house)
      },

      async deleteHouse(house) {
        try {
          const yes = await Pop.confirm('Are you sure you want to delete this car?')
          if (!yes) { return }
          else {
            await housesService.deleteHouse(house.id)
          }
        } catch (error) {
          logger.log('[deleting house]', error)
          Pop.error(error)
        }
      }

    };
  },
};
</script>



<style>
</style>