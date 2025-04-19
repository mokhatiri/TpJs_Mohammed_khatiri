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
    fetch(this.$apiURL + '/jobs/' + this.$route.params.id)
    .then(res => res.json())
    .then((job) => this.setJob(job));
  },
  methods : {
    setJob(job){
      this.title = job.titre;
      this.description = job.description;
      this.salaire = parseFloat(job.salaire.replace(/[^0-9.-]+/g, ""));
    },
    submit(){
      fetch(this.$apiURL + '/jobs/' + this.$route.params.id, {
        method: 'PUT',
        body: 
        JSON.stringify({
          titre: this.title,
          description: this.description,
          salaire: this.salaire,
          "date de création": Date.now()
        })
      })
      .then(res => {
        if(res.ok){
          this.$router.push({name: 'home'});
        }
      })
    },
    deleteJob(){
      if(confirm("Are you sure you want to delete this job offer?")){

        fetch(this.$apiURL + '/jobs/' + this.$route.params.id, {
          method: 'DELETE'
        })
        .then(res => {
          if(res.ok){
            this.$router.push({name: 'home'});
          }
        })
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