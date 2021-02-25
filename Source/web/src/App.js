import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router } from 'react-router-dom';

import './css/font.css';
import './css/style.css';
import './css/custom.css';
import './css/hover.css';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import allReducers from './reducers';
import rootSaga from './sagas/rootSaga';

import RouteContent from './RouteContent';
import Utils from './common/Utils';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(allReducers, applyMiddleware(sagaMiddleware));

console.log(`%cVersion Web: ${Utils.getVersion()}`, 'color: green; font-weight: bold');

function App() {
    return (
        <Provider store={store}>
            <Router basename="/">
                <Helmet
                    titleTemplate="%s | We Make Footballers"
                    defaultTitle="Professional Football Coaching-Ages 4-12 | We Make Footballers"
                >
                    <meta
                        name="description"
                        content="We Make Footballers is a UK wide football coaching company for kids aged 4 to 12 of all abilties.
                        We offer professional and fun training to help children develop their football skills."
                    />
                </Helmet>
                <RouteContent />
            </Router>
        </Provider>
    );
}

sagaMiddleware.run(rootSaga);

export default App;
