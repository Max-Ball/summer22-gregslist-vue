<template>
  <div class="job-page">
    <div class="container">
      <div class="row">
        <div class="col-md-4" v-for="n in 30">
          <JobCard />
          <!-- JOB Card -->
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import JobCard from '../components/Cards/JobCard.vue';
export default {
  setup() {
    return {};
  },
  components: { JobCard }
};
</script>



<style>
</style>