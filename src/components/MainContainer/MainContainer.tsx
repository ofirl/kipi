import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import TablesListPage from '../TablesListPage/TablesListPage';
import TableView from '../TableView/TableView';

const MainContainer = () => {
    return (
        <Router>
            <Switch>
                <Route path="/:tableId">
                    <TableView />
                </Route>
                <Route exact>
                    <TablesListPage />
                </Route>
            </Switch>
        </Router>
    );
};

export default MainContainer;