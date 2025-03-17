<template>
  <h1>Edit the job:</h1>
  <input type="text" placeholder="job title" v-model="title"><br>
  <textarea placeholder="job description" v-model="description"></textarea><br>
  <input type="number" placeholder="job salary" v-model="salaire">
  <span style="font-size: smaller; color: grey">(in MAD/an)</span><br>
  <button @click="submit">submit</button>
  <button @click="deleteJob">delete</button>
</template>
<script>
import data from "@/assets/jobs.json"

export default{
  data(){
    return {
      // id
      title : "", // titre
      description : "", // description
      salaire : 0, // salaire
      // date de création stays the same since the date of creation is fixed
    }
  },
  mounted(){
    let id = this.$route.params.id;
    let job = data.find(job => job.id == id);
    this.title = job.titre;
    this.description = job.description;
    this.salaire = parseFloat(job.salaire.replace(/[^0-9.-]+/g, ""));
    console.log(this.salaire);
  },
  methods : {
    submit(){
      // first get the idea:
      let id = this.$route.params.id;
      let job = data.find(job => job.id == id);
      job.titre = this.title;
      job.description = this.description;
      job.salaire = this.salaire.toLocaleString('fr-FR') + " MAD/an";
      // then
      this.$router.push({name: 'home'});
    },
    deleteJob(){
      if(confirm("Are you sure you want to delete this job offer?")){
        let id = this.$route.params.id;
        let job = data.find(job => job.id == id);
        data.splice(data.indexOf(job), 1);
        this.$router.push({name: 'home'});
      }
    }
  }
}
</script>

<style>
input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
}
textarea {
  width: 100%;
  height: 100px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
}
button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>