<template>
  <form class="house-form" @submit.prevent="handleSubmit()">
    <h3 class="text-primary">List Your House</h3>
    <div class="row justify-content-evenly">
      <div class="col-4 pt-5">
        <label for="form-label" min="1">Bedrooms</label>
        <input class="form-control" type="number" name="bedrooms" id="bedrooms" v-model="editable.bedrooms">
      </div>
      <div class="col-4 pt-5">
        <label for="form-label" min="0">Bathrooms</label>
        <input class="form-control" type="number" name="bathrooms" id="bathrooms" v-model="editable.bathrooms">
      </div>
      <div class="col-4 pt-5">
        <label for="form-label">Levels</label>
        <input class="form-control" type="number" name="levels" id="levels" v-model="editable.levels">
      </div>
      <div class="col-5 py-5">
        <label for="form-label">Price</label>
        <input class="form-control" type="number" name="price" id="price" v-model="editable.price">
      </div>
      <div class="col-7 py-5">
        <label for="form-label">Year</label>
        <input class="form-control" type="number" name="year" id="year" v-model="editable.year">
      </div>
      <div class="col-12 pb-5">
        <label for="form-label">Upload Image</label>
        <input class="form-control" type="text" name="img" id="img" v-model="editable.img">
      </div>
      <div class="col-10 pb-5">
        <label class="form-label">Description</label>
        <textarea class="w-100 form-control" name="description" id="description" rows="5"
          v-model="editable.description"></textarea>
      </div>
      <button type="submit" class="btn btn-primary w-100 p-2 mt-3 text-light" data-bs-dismiss="modal">Submit</button>
    </div>
  </form>
</template>



<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { housesService } from '../services/HousesService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';


export default {

  setup() {
    const editable = ref({})

    watchEffect(() => {
      if (!AppState.activeHouse) { return }
      editable.value = { ...AppState.activeHouse }
    })


    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value.id) {
            housesService.updateHouse(editable.value)
          } else {
            housesService.createHouse(editable.value)
          }
        } catch (error) {
          logger.error('[editing a house]', error)
          Pop.error(error)
        }
      }
    };
  },
};
</script>



<style>
</style>