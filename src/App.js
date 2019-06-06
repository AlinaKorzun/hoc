import React, {useEffect, Suspense} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
// import Auth from "./containers/Auth/Auth";
// import Checkout from "./containers/Checkout/Checkout";
// import Orders from "./containers/Orders/Orders";
// import asyncComponent from './hoc/asyncComponent/asyncComponent';

const Checkout = React.lazy(() => {
    return import('./containers/Checkout/Checkout')
});

const Orders = React.lazy(() => {
    return import('./containers/Orders/Orders')
});

const Auth = React.lazy(() => {
    return import('./containers/Auth/Auth')
});


const app = props => {
    useEffect(() => {
        props.onTryAutoSignup();
    }, []);

    let routes = (
        <Switch>
            <Route path="/auth" render={(props) => <Auth {...props}/>}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to='/'/>
        </Switch>
    );

    if (props.isAuthrnticated) {
        routes = (
            <Switch>
                <Route path="/checkout" render={(props) => <Checkout {...props}/>}/>
                <Route path="/orders" render={(props) => <Orders {...props}/>}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/auth" render={(props) => <Auth {...props}/>}/>
                <Route path="/" exact component={BurgerBuilder}/>
                <Redirect to='/'/>
            </Switch>
        )
    }

    return (
        <div>
            <Layout>
                <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
            </Layout>
        </div>
    );

};

const mapStateToProps = state => {
    return {
        isAuthrnticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
