import { ref } from 'vue';
import { FilterProd } from '../composables/FilterProd.js';
import values from '@/assets/pieces-autos.json';

const getProducts = () => {
    const post = ref([]);

    const fetchProducts = async (keyword, categories, available, prix_min, prix_max) => {
        try {
            const data = await values;
            // check every product in the array for the filter
            post.value = data.filter(product => {
                const result = FilterProd(product, keyword, categories, available, prix_min, prix_max);
                return result;
            });
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };

    return [post, fetchProducts]; // Return as an array for destructuring
};

export default getProducts;
