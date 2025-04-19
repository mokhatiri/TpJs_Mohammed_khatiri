<template>
  <div class="container">
    <div class="job_container">
      <div v-for="job in jobs" :key="job.id" class="jobs">
        <h2>{{ job.titre }}</h2>
        <router-link :to="{name: 'detail', params: {id: job.id}}">go see details ...</router-link><br>
        <a @click="this.$router.push({name: 'edit', params: { id : job.id }})">edit job details.</a>
      </div>
    </div>
    <FilterNav class="filter" @search="handleValueChanged"/>
  </div>
</template>

<script>
// @ is an alias to /src
import FilterNav from '@/components/FilterNav.vue'
import JobDetail from '@/views/JobDetail.vue'
export default {
  name: 'HomeView',
  components: {
    FilterNav,
    JobDetail
  },
  data() {
    return {
      jobs: [],
      title: "",
      content: "",
      min_salary: 0,
      max_salary: 0
    }
  },
  mounted(){
    this.fetchJobs();
  },
  methods: {
    handleValueChanged(newval){
      this.title = newval.title;
      this.content = newval.content;
      this.min_salary = newval.min_salary;
      this.max_salary = newval.max_salary;

      fetch(this.$apiURL + '/jobs')
      .then(response => response.json())
      .then(data => {
        this.jobs = data;
        let filtered = data.filter(job => {
          if(this.title && !job.titre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(this.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())){
            return false;
          }
          if(this.content && !job.description.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(this.content.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())){
            return false;
          }
          if(this.min_salary && job.salaire.replace(/[^0-9.-]+/g, "") < this.min_salary){
            return false;
          }
          if(this.max_salary && job.salaire.replace(/[^0-9.-]+/g, "") > this.max_salary){
            return false;
          }
          return true;
        });
        this.jobs = filtered;
      })
    }
  ,
  fetchJobs(){
      fetch(this.$apiURL + '/jobs')
      .then(response => response.json())
      .then(data => {
        this.jobs = data;
      })
    }
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Ensures the filter stays at the top */
}

.job_container {
  width: 70%;
  .jobs{
    width: 90%;
      background: #f4f4f4;
      margin: 10px auto;
      padding: 20px;
      border-radius: 10px;

  }
}

.filter {
  position: sticky;
  top: 10px;
  width: fit-content;
  height: fit-content;
  align-self: flex-start; /* Keeps it at the top when using flexbox */
}
a{
  color: rgb(229, 169, 4);
  text-decoration : underline;
}
</style>