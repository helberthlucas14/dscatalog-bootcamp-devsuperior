import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import history from 'core/utils/history';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { ProductResponse } from './fixtures';
import Catalog from '..';


const server = setupServer(
    rest.get('http://localhost:8080/products', (req, res, ctx) => {
        return res(ctx.json(ProductResponse))
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('should render Catalog', async () => {

    render(
        <Router history={history}>
            <Catalog />
        </Router>
    );

    expect(screen.getAllByTitle('Loading...')).toHaveLength(3);
    expect(screen.getByText('Catálogo de produtos')).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('The Lord of the Rings')).toBeInTheDocument());
    expect(screen.getByText('PC Gamer Y')).toBeInTheDocument();
    expect(screen.queryAllByTitle('Loading...')).toHaveLength(0);
});