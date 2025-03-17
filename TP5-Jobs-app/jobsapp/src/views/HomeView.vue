<template>
  <div class="container">
    <div v-for="job in jobs" :key="job.id" class="jobs">
      {{ job.title }}
      <details>
        <summary>see details...</summary>
        <JobDetail :job="job"/>
      </details>
      <a @click="this.$router.push({name: edit, param: {id : id}})"></a>
    </div>
    <FilterNav class="filter"/>
  </div>
</template>

<script>
// @ is an alias to /src
import FilterNav from '@/components/FilterNav.vue'
import JobDetail from '@/components/JobDetail.vue'
import data from '@/assets/jobs.json'

export default {
  name: 'HomeView',
  components: {
    FilterNav,
    JobDetail
  },
  data() {
    return {
      jobs: data,
    }
  }
}
</script>

<style>
.container {
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  .jobs {
    background: #f4f4f4;
    margin: 10px auto;
    padding: 20px;
    border-radius: 10px;
    grid-column: 1 / 3;
  }
  .filter {
    grid-column: 1 / 4;
  }
}

</style>