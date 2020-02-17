import React from 'react';
import PropTypes from 'prop-types';

import Product from './Product';
import './style.scss';

//https://github.com/airbnb/javascript/tree/master/react#ordering
const propTypes = {
    products: PropTypes.array.isRequired
};

function ProductList({ products }) {
  return products.map(p => {
    return <Product product={p} key={p.id} />;
  });
}

ProductList.propTypes = propTypes;

export default ProductList;