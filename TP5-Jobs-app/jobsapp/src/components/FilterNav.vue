<template>
    <div class="filter-nav">
        <h2> search : </h2><hr>
        <label>title: </label><br>
        <input type="text" v-model="title" @input="searchJob" placeholder="title"><br>
        <label>content: </label><br>
        <input type="text" v-model="content" @input="searchJob" placeholder="content"><br><hr>
        <label>min salary: </label><br>
        <input type="number" v-model="min_salary" @input="searchJob" placeholder="min salary"><br>
        <label>max salary: </label><br>
        <input type="number" v-model="max_salary" @input="searchJob" placeholder="max salary">
    </div>
</template>
<script>
export default{
    data(){
        return {
            title : "",
            content : "",
            min_salary : 0,
            max_salary : 0
        }
    },
    methods : {
        searchJob(){
            let search = {
                title : this.title,
                content : this.content,
                min_salary : this.min_salary,
                max_salary : this.max_salary
            };
            this.$emit('search', search);
        }
    }
}
</script>
<style>
    .filter-nav{
        margin: 20px auto;
        background: #f4f4f4;
        padding: 20px;
        border-radius: 10px;
        height: fit-content;
        input {
            margin: 0 10px;
            padding: 5px;
            border: none;
            border-radius: 5px;
            height: max-content;
            border: 1px solid #ccc;
        }
    }
</style>