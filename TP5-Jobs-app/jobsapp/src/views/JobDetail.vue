<template>
    <h1>Job Details</h1>
    <p>title : {{ title }}</p>
    <p>description : {{ description }}</p>
    <p>salaire : {{ salaire }}</p>
    <p>date de création : {{ date }}</p>
</template>
<script>
import data from "@/assets/jobs.json"

export default {
    data(){
        return {
            id: 0,
            title: "",
            description: "",
            salaire: 0,
            date: ""
        }
    },
    mounted(){
        this.id = this.$route.params.id;
        let job = data.find(job => job.id == this.id);
        this.title = job.titre;
        this.description = job.description;
        this.salaire = job.salaire;
        this.date = job["date de création"];
    }
}
</script>