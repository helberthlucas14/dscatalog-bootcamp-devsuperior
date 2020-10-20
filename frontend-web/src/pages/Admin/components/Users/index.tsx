import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles.scss';

const Users = () => {
    return (
        <Switch>
            <Route path="/admin/users" exact>
                users
            </Route>
        </Switch>
    );
}
export default Users;