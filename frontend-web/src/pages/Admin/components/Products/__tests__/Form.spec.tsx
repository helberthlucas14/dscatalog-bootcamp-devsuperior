import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import selectEvent from 'react-select-event';
import userEvent from '@testing-library/user-event';
import { ToastContainer } from 'react-toastify';
import { Router } from 'react-router-dom';
import history from 'core/utils/history';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { categoriesResponse } from './fixtures'
import Form from '../Form';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ productId: 'create' })
}));

const server = setupServer(
    rest.get('http://localhost:8080/products/categories', (req, res, ctx) => {
        return res(ctx.json(categoriesResponse))
    }),
    rest.post('http://localhost:8080/products/categories', (req, res, ctx) => {
        return res(ctx.status(201))
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


test('should render Form', async () => {
    render(
        <Router history={history}>
            <ToastContainer />
            <Form />
        </Router>
    );

    const submitButton = screen.getByRole('button', { name: /salvar/i });
    const nameInput = screen.getByTestId('name');
    const priceInput = screen.getByTestId('price');
    const imgUrlInput = screen.getByTestId('imgUrl');
    const descriptionInput = screen.getByTestId('description');
    const categoriesInput = screen.getByLabelText('Categories');

    userEvent.type(nameInput, 'Computador');
    await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos']);
    userEvent.type(priceInput, '5000');
    userEvent.type(imgUrlInput, 'img.jpg');
    userEvent.type(descriptionInput, 'pc do bom');

    userEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText('Produto salvo com sucesso!')).toBeInTheDocument());

});