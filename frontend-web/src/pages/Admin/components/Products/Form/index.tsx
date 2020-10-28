import { makeRequest } from 'core/utils/request';
import React, { useState } from 'react';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
    name: string;
    price: string;
    category: string;
    description: string
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

const Form = () => {

    const [formData, setFormData] = useState<FormState>(
        {
            name: '',
            price: '',
            category: "3",
            description: ""
        });

    const handleOnChanged = (event: FormEvent) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(data => ({ ...data, [name]: value }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            ...formData,
            imgUrl: 'https://imagens.canaltech.com.br/ofertas/o14327.1.jpg',
            categories: [{ id: formData.category }]
        }
        makeRequest({ url: '/products', method: 'POST', data: payload });
    }


    return (
        <form onSubmit={handleSubmit}>
            <BaseForm title="cadastrar um produto">
                <div className="row">
                    <div className="col-6">
                        <input
                            value={formData.name}
                            name="name"
                            type="text"
                            className="form-control mb-5"
                            placeholder="Nome do produto"
                            onChange={handleOnChanged}
                        />

                        <select
                            value={formData.category}
                            className="form-control mb-5"
                            onChange={handleOnChanged}
                            name="category"
                        >
                            <option value="1">livros</option>
                            <option value="2">eletronicos</option>
                            <option value="3">computadores</option>
                        </select>

                        <input
                            value={formData.price}
                            name="price"
                            type="text"
                            className="form-control"
                            placeholder="Preço"
                            onChange={handleOnChanged}
                        />
                    </div>
                    <div className="col-6">
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleOnChanged}
                            className="form-control"
                            cols={30}
                            rows={10} />
                    </div>
                </div>
            </BaseForm>
        </form>
    );
}

export default Form;