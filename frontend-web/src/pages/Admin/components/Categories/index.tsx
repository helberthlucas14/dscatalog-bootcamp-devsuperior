import React from 'react'
import { Route, Switch } from 'react-router-dom';
import './styles.scss'

const Categories = () => {
    return (
        <Switch>

            <Route path="/admin/categories" exact>
                categories
            </Route>

            <Route path="/admin/categories/create">
                create
            </Route>

            <Route path="/admin/categories/:categoryId">
                update
            </Route>

        </Switch>
    );
}

export default Categories;