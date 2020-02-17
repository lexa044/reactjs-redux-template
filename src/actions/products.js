import { productService } from "../services/products";

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export const fetchProducts = (filters, callback) => dispatch => {
    productService.getAll(data => {
        if (data) {
            let { products } = data;
            if (!!filters && filters.length > 0) {
                products = products.filter(p =>
                    filters.find(f => p.availableSizes.find(size => size === f))
                );
            }

            if (!!callback) {
                callback();
            }

            dispatch({
                type: FETCH_PRODUCTS,
                payload: products
            });
        } else {
            console.log('Could not fetch products. Try again later.');
        }
    });
};

export const updateProducts = (products, selections, callback) => dispatch => {
    products = products.map(p => {
        const product = selections.find(s => s.id === p.id);
        if (product) {
            return { ...p, isSelected: true }
        } else {
            return { ...p, isSelected: false }
        }
    });

    if (!!callback) {
        callback();
    }

    dispatch({
        type: FETCH_PRODUCTS,
        payload: products
    });
};
