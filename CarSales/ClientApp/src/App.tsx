import * as React from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import VehicleForm from './components/VehicleForm';

import './css/custom.css'
import Cars from './components/Car';
import NotFound from './components/NotFound';

export default () => (
    <Layout>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/cars' component={Cars} />
            <Route path='/addVehicle' component={VehicleForm} />
            <Route path='*' component={NotFound} />
        </Switch>
    </Layout>
);
