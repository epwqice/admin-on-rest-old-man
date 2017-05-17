import React, { PropTypes } from 'react';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, Redirect, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects';
import withProps from 'recompose/withProps';

import adminReducer from './reducer';
import localeReducer from './reducer/locale';
import { crudSaga } from './sideEffect/saga';
import CrudRoute from './CrudRoute';
import DefaultLayout from './mui/layout/Layout';
import Menu from './mui/layout/Menu';
import Login from './mui/auth/Login';
import Logout from './mui/auth/Logout';
import TranslationProvider from './i18n/TranslationProvider';
import { AUTH_CHECK } from './auth';

const noShowElement = (resourseGroup) => {
    const div = React.createElement('div', { key: resourseGroup.props.name, name: resourseGroup.props.name, group: true, showMenu: true });

    return (
        <Route path={resourseGroup.props.name} component={div} key={`key${resourseGroup.props.name}`} />
    );
};

const createCrudRoute = (resProps, onEnter) => React.createElement(CrudRoute, {
    key: resProps.name,
    path: resProps.name,
    list: resProps.list,
    create: resProps.create,
    edit: resProps.edit,
    show: resProps.show,
    remove: resProps.remove,
    options: resProps.options,
    onEnter,
});

const Admin = ({
    appLayout,
    authClient,
    children,
    customReducers = {},
    customSagas = [],
    customRoutes,
    dashboard,
    locale,
    messages = {},
    menu,
    restClient,
    theme,
    title = 'Admin on REST',
    loginPage,
    logoutButton,
    appMenus,
    basePath,
}) => {
    const resources = [];
    const childNode = [];

    const onEnter = authClient ?
    params => (nextState, replace, callback) => authClient(AUTH_CHECK, params)
      .then(() => params && params.scrollToTop ? window.scrollTo(0, 0) : null)
      .catch((e) => {
          replace({
              pathname: (e && e.redirectTo) || '/login',
              state: { nextPathname: nextState.location.pathname },
          });
      })
      .then(callback)
    :
    params => () => params && params.scrollToTop ? window.scrollTo(0, 0) : null;

    // const currentPath = basePath ? basePath : '';
  const currentPath = '';

    React.Children.forEach(children, (resourseGroup) => {
        childNode.push(noShowElement(resourseGroup));
        React.Children.forEach(resourseGroup.props.children, (res) => {
            res.props.group = resourseGroup.props.name;
            res.props.groupLocal = resourseGroup.props.options && resourseGroup.props.options.label ? resourseGroup.props.options.label : resourseGroup.props.name;
            console.log(`/${currentPath}/${res.props.name}`);
            childNode.push(createCrudRoute(res.props, onEnter, resourseGroup.props.name, currentPath));
            resources.push(res.props);
        });
    });
    const reducer = combineReducers({
        admin: adminReducer(resources),
        locale: localeReducer(locale),
        form: formReducer,
        routing: routerReducer,
        ...customReducers,
    });
    const saga = function* rootSaga() {
        yield [
            crudSaga(restClient),
            ...customSagas,
        ].map(fork);
    };
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(reducer, undefined, compose(
        applyMiddleware(sagaMiddleware, routerMiddleware(hashHistory)),
        window.devToolsExtension ? window.devToolsExtension() : f => f,
    ));
    sagaMiddleware.run(saga);

    const history = syncHistoryWithStore(hashHistory, store);
    const firstResource = resources[0].name;
    const LoginPage = withProps({ title, theme, authClient })(loginPage || Login);
    const LogoutButton = withProps({ authClient })(logoutButton || Logout);
    const MenuComponent = withProps({ authClient, logout: <LogoutButton />, resources, hasDashboard: !!dashboard, basePath:currentPath })(menu || Menu);
    const Layout = withProps({
        authClient,
        logout: <LogoutButton />,
        menu: <MenuComponent />,
        title,
        theme,
        appMenus,
    })(appLayout || DefaultLayout);


    return (
        <Provider store={store}>
            <TranslationProvider messages={messages}>
                <Router history={history}>
                    {dashboard ? undefined : <Redirect from={`/${currentPath}`} to={`/${firstResource}`} />}
                    <Route path="/login" component={LoginPage} />
                    <Route path={`/${currentPath}`} component={Layout} resources={resources}>
                        {customRoutes && customRoutes()}
                        {dashboard && <IndexRoute component={dashboard} onEnter={onEnter()} />}
                        {childNode}
                    </Route>
                </Router>
            </TranslationProvider>
        </Provider>
    );
};

const componentPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);

Admin.propTypes = {
    appLayout: componentPropType,
    authClient: PropTypes.func,
    children: PropTypes.node,
    customSagas: PropTypes.array,
    customReducers: PropTypes.object,
    customRoutes: PropTypes.func,
    dashboard: componentPropType,
    loginPage: componentPropType,
    logoutButton: componentPropType,
    menu: componentPropType,
    restClient: PropTypes.func,
    theme: PropTypes.object,
    title: PropTypes.string,
    locale: PropTypes.string,
    messages: PropTypes.object,
    basePath: PropTypes.string,
};

export default Admin;
