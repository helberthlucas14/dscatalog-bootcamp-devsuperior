import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from '../../../../core/assets/images/arrow.svg';
import { ReactComponent as ProductImage } from '../../../../core/assets/images/product.svg';
import ProductPrice from '../../../../core/components/ProductPrice';
import './styles.scss';

type Paramstype = {
    productId: string
}

const ProductDetails = () => {
    const { productId } = useParams<Paramstype>();

    return (
        <div className="product-details-container">
            <div className="card-base border-radius-20 product-details">
                <Link to="/products" className="product-details-goback">
                    <ArrowIcon className="icon-goback" />
                    <h1 className="text-goback">voltar</h1>
                </Link>
                <div className="row">
                    <div className="col-6 pr-5">
                        <div className="product-details-card text-center">
                            <ProductImage className="product-details-image" />
                        </div>
                        <h1 className="product--details-name">
                            Computador Desktop - Intel Core i7
                        </h1>
                        <ProductPrice price="2.779,00" />
                    </div>

                    <div className="col-6 product-details-card">
                        <h1 className="product-description-title">
                            Descrição do Produto
                        </h1>
                        <p className="product-description-text">
                            daghdkagkdgajskdgakgsdhaskdgaskgdaksgdhsdgkjsdghaskdghas
                            asdgadgshagsdhkjagshdkgsat7tagsdhaksdghaksdghakgsdhkagdh
                            ashdagsdjakgsdhakgsdhakgdkaghdkgashdkjgyyuiosdaydasdusod
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetails; 