<template>
    <h1>Job Details</h1>
    <p>title : {{ title }}</p>
    <p>description : {{ description }}</p>
    <p>salaire : {{ salaire }}</p>
    <p>date de création : {{ date }}</p>
</template>
<script>
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
        fetch(this.$apiURL + '/jobs/' + this.$route.params.id)
        .then(res => res.json())
        .then((job) => this.setJob(job));
    },
    methods : {
        setJob(job){
            this.title = job.titre;
            this.description = job.description;
            this.salaire = job.salaire;
            this.date = job["date de création"];
        }
    }
}
</script>