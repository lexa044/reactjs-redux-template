import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from "../containers/ProtectedRoute";
import { AppContext } from '../context/Context';

import loadable from '@loadable/component';
const Home = loadable(() => import('../containers/Home'));
const Login = loadable(() => import('../containers/Login'));

const Layout = () => {

    const { identity } = useContext(AppContext);

    useEffect(() => {
        Home.preload();
        Login.preload();
    }, []);

    return (
        <Router fallback={<span />}>
            <Switch>
                <ProtectedRoute
                    exact
                    path="/"
                    component={Home}
                    isAuthenticated={identity.isAuthenticated}
                    isVerifying={identity.isVerifying}
                />
                <Route path="/login" component={Login} />
            </Switch>
        </Router>
    );
};

export default Layout;
