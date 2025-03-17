<template>
  <h1>Ad a new job:</h1>
  <input type="text" placeholder="job title" v-model="title"><br>
  <textarea placeholder="job description" v-model="description"></textarea><br>
  <input type="number" placeholder="job salary" v-model="salaire">
  <span style="font-size: smaller; color: grey">(in MAD/an)</span><br>
  <button @click="submit">submit</button>
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
        // date de création
      }
    },
    methods : {
      submit(){
        // check if the salary is a valid
        if(this.salaire < 0){
          alert("Invalid salary");
          return;
        }
        // check if the title is empty
        if(this.title == ""){
          alert("Invalid title");
          return;
        }
        // check if the description is empty
        if(this.description == ""){
          alert("Invalid description");
          return;
        }


        // first get the idea:
        let id = data.length + 1;
        let job = {
          id : id,
          titre : this.title,
          description : this.description,
          salaire : this.salaire.toLocaleString('fr-FR') + " MAD/an",
          date : new Date().toLocaleDateString()
        }
        // now push
        data.push(job);
        // then
        this.$router.push({name: 'home'});
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