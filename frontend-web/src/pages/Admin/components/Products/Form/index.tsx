import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { makePrivateRequest } from 'core/utils/request';
import BaseForm from '../../BaseForm';
import { useHistory } from 'react-router-dom';
import './styles.scss';

type FormState = {
    name: string;
    price: string;
    description: string
    imageUrl: string
}

const Form = () => {
    const { register, handleSubmit, errors } = useForm<FormState>();
    const history = useHistory();

    const onSubmit = (data: FormState) => {
        console.log(data)
        makePrivateRequest({ url: '/products', method: 'POST', data })
        .then(()  =>{
            toast.info('Produto cadastrado com sucesso!');
            history.push('/admin/products');
        }).catch(() =>{
            toast.error('Erro ao salvar o produto!');
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title="cadastrar um produto">
                <div className="row">
                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input
                                ref={register({
                                    required: "Campo obrigatório",
                                    minLength: {value : 5 , message:'O campo deve ter no mínimo 5 caracteres'},
                                    max:{value : 60 , message:'O campo deve ter no máximo 60 caracteres'}
                                })}
                                name="name"
                                type="text"
                                className="form-control input-base"
                                placeholder="Nome do produto"
                            />
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>

                        <div className="margin-bottom-30">
                            <input
                                ref={register({ required: "Campo obrigatório" })}
                                name="price"
                                type="number"
                                className="form-control input-base"
                                placeholder="Preço"

                            />
                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price.message}
                                </div>
                            )}
                        </div>

                        <div className="margin-bottom-30">
                            <input
                                ref={register({ required: "Campo obrigatório" })}
                                name="imageUrl"
                                type="text"
                                className="form-control input-base"
                                placeholder="Imagem do produto"

                            />
                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price.message}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-6">
                        <textarea
                            name="description"
                            ref={register({ required: "Campo obrigatório" })}
                            className="form-control input-base"
                            placeholder="Descrição"
                            cols={30}
                            rows={10} />

                        {errors.description && (
                            <div className="invalid-feedback d-block">
                                {errors.description.message}
                            </div>
                        )}
                    </div>
                </div>
            </BaseForm>
        </form>
    );
}

export default Form;