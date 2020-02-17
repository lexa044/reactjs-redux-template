import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../../services/util';

const propTypes = {
    product: PropTypes.object.isRequired
};

function Product({ product }) {
    product.quantity = (product.quantity || 1);
    let formattedPrice = formatPrice(product.price, product.currencyId);

    let productInstallment;
    let classes = ['shelf-item'];

    if (!!product.installments) {
        const installmentPrice = product.price / product.installments;

        productInstallment = (
            <div className="installment">
                <span>or {product.installments} x</span>
                <b>
                    {product.currencyFormat}
                    {formatPrice(installmentPrice, product.currencyId)}
                </b>
            </div>
        );
    }

    if (product.isSelected) {
        classes.push('added');
    }

    return (
        <div
            className={classes.join(' ')}
            data-sku={product.sku}
        >
            {product.isFreeShipping && (
                <div className="shelf-stopper">Free shipping</div>
            )}
            <p className="shelf-item__title">{product.title}</p>
            <div className="shelf-item__price">
                <div className="val">
                    <small>{product.currencyFormat}</small>
                    <b>{formattedPrice.substr(0, formattedPrice.length - 3)}</b>
                    <span>{formattedPrice.substr(formattedPrice.length - 3, 3)}</span>
                </div>
                {productInstallment}
            </div>
            <div className="shelf-item__buy-btn">Add to cart</div>
        </div>
    );
}

Product.propTypes = propTypes;

export default Product;
