<template>
    <div class="product">
        <p id="TheId">{{product.id}}</p>
        <img :src="product.Image" @error="imageError"/>
        <p>nom : {{product.nom}}</p>
        <p>prix : {{product.prix}}$</p>
        <p>categorie : {{product.categorie}}</p>
        <p v-if="product.Disponible" style="color:green">Available</p>
        <p style="color:red" v-else>Unavailable</p>
    </div>
</template>

<script>
export default {
    props: ['product']
};
</script>

<style scoped>
.product {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    margin: 10px;
    padding: 10px;
    width: 300px;

    #TheId {
        font-weight: bold;
        border: 1px solid black;
        padding: 5px;
    }

    img {
        border: 4px solid black;
    }
}
</style>
