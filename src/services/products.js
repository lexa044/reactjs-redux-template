import { handleResponse } from './request-response';

export const productService = {
    getAll
};

function getAll(callback) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch('https://react-shopping-cart-67954.firebaseio.com/products.json', requestOptions)
        .then(handleResponse)
        .then(
            (result) => {
                callback(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                callback(null);
            }
        );
}