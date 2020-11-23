import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeRequest } from 'core/utils/request';
import Card from '../Card';
import { ProductReponse } from 'core/types/Products';
import CardLoader from '../Loaders/ProductCardLoader';
import Pagination from 'core/components/Pagination';


const List = () => {

    const [productResponse, setProductResponse] = useState<ProductReponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();

    useEffect(() => {
        const params = {
            page: activePage,
            linesPerPage: 4,
            direction: 'DESC',
            orderBy: 'id'
        }
        setIsLoading(true);
        makeRequest({ url: '/products', params })
            .then(response => setProductResponse(response.data))
            .finally(() => setIsLoading(false))
    }, [activePage]);


    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    return (
        <div className="admin-products-list">
            <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                ADICIONAR
            </button>

            <div className="admin-list-container">
                {isLoading ? <CardLoader /> : (
                    productResponse?.content.map(product => (
                        <Card product={product} key={product.id} />
                    ))
                )}
                {productResponse && (
                    <Pagination
                        totalPages={productResponse.totalPages}
                        activePage={activePage}
                        onChange={page => setActivePage(page)}
                    />
                )}
            </div>
        </div>
    );
}

export default List;