<template>
    <div id="pieces_live">
        <single_piece 
            v-for="product in products.value" 
            :key="product.id" 
            :product="product"/>
    </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import single_piece from './single_piece.vue';
import getProducts from '../composables/getProducts.js';

export default {
    props: ['keyword', 'categories', 'available', 'prix_min', 'prix_max'], // Declare parent props
    components: {
        single_piece
    },
    setup(props) {
        const products = ref([]);
        const output = getProducts();

        products.value = output[0];
        const fetchProducts = output[1];

        onMounted(() => {
            fetchProducts(props.keyword, props.categories, props.available, props.prix_min, props.prix_max);
        });

        // Watch for changes in props and refetch products
        watch(
            () => [props.keyword, props.categories, props.available, props.prix_min, props.prix_max],
            () => {
                fetchProducts(props.keyword, props.categories, props.available, props.prix_min, props.prix_max);
            }
        );

        return {
            products
        };
    }
};
</script>

<style>
</style>