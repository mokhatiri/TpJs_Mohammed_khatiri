<template>
    <div class="job-details">
    <h2>title : {{ title }}</h2>
    <p>description : {{ description }}</p>
    <p>salaire : {{ salaire }}</p>
    <p>date de création : {{ date }}</p>
    </div>
</template>
<script>
export default {
    props: ['job'],
    data(){
        return {
            title: this.job.title,
            description: this.job.description,
            salaire: this.job.salaire,
            date: this.job["date de création"]
        }
    }
}
</script>