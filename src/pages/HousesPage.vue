<template>
  <div class="houses-page">
    <div class="container">
      <div class="row">
        <div class="col-4 p-3" v-for="h in houses" :key="h.id">
          <HouseCard :house="h" />
        </div>
      </div>
    </div>
  </div>
  <div>
    <button class="btn btn-fab btn-primary" title="Add House" data-bs-toggle="modal" data-bs-target="#house-form"
      @click="setActiveHouse()"><i class="mdi mdi-plus f-18 text-white"></i></button>
  </div>
  <Modal id="house-form">
    <HouseForm />
  </Modal>
</template>



<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { AppState } from "../AppState";
import { housesService } from "../services/HousesService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import HouseForm from "../components/HouseForm.vue";
import HouseCard from "../components/Cards/HouseCard.vue";
export default {
  setup() {
    async function getHouses() {
      try {
        await housesService.getHouse();
      }
      catch (error) {
        logger.log("[getting houses]", error);
        Pop.error(error);
      }
    }
    onMounted(() => { getHouses(); });
    return {
      houses: computed(() => AppState.houses),
      setActiveHouse() {
        housesService.setActiveHouse({});
      }
    };
  },
  components: { HouseForm, HouseCard }
};
</script>



<style lang="scss" scoped>
.btn-fab {
  position: fixed;
  border-radius: 50%;
  bottom: 3rem;
  right: 2rem;
}
</style>