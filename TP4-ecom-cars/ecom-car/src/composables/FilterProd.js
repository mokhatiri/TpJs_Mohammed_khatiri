export function FilterProd(product, keyword = "", categories = [], available = 2, pricemin = null, pricemax = null) {
    if (keyword === "" && categories.length === 0 && available === 2 && pricemin === null && pricemax === null) {
        // if no keyword, no categories, and all available
        return true;
    }
    if (keyword !== "" && !product.nom.toLowerCase().includes(keyword.toLowerCase())) {
        return false;
    }
    if (categories.length > 0 && !categories.includes(product.categorie)) {
        return false;
    }
    if (available == 0 && product.Disponible) {
        return false;
    }
    if (available == 1 && !product.Disponible) {
        return false;
    }
    if (pricemin != null && product.prix < pricemin) {

        return false;
    }
    if (pricemax != null && product.prix > pricemax) {
        return false;
    }
    
    return true;
}