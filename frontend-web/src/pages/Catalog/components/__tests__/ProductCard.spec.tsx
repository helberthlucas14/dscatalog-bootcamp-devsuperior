import React from 'react';
import { render, screen } from '@testing-library/react';
import ProudctCard from '../ProductCard';
import { Product } from 'core/types/Products';

test('should render ProductCard', () => {

    const product = {
        name: "computador",
        imgUrl: "image.jpg",
        price: 40
    } as Product

    render(
        <ProudctCard product={product} />
    );

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByAltText(product.name)).toBeInTheDocument();
    expect(screen.getByText("R$")).toBeInTheDocument();
    expect(screen.getByText("40.00")).toBeInTheDocument();
    
});