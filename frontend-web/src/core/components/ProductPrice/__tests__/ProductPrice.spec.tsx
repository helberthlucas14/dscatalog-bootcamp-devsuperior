import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductPrice from '..';

test('should render Product Price', () => {
    render(
        <ProductPrice price={1200} />
    );
  
    const currencyElement = screen.getByText('R$');
    const priceElement = screen.getByText('1,200.00');

    expect(currencyElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
});


test('should render Product Price with equals zero', () => {
   
    //Act
    render(
        <ProductPrice price={0} />
    );
  
    //Assert
    const currencyElement = screen.getByText('R$');
    const priceElement = screen.getByText('0.00');

    expect(currencyElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
});

test('should render Product Price without thousand separator', () => {
   
    //Act
    render(
        <ProductPrice price={100} />
    );
  
    //Assert
    const currencyElement = screen.getByText('R$');
    const priceElement = screen.getByText('100.00');

    expect(currencyElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
});