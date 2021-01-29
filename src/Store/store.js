import { createStore, applyMiddleware, compose } from 'redux'
import Reducer from '../Reducer/reducer'

import reduxImmutableStateVariant from "redux-immutable-state-invariant";
import thunk from 'redux-thunk'

export default function configureStore(initialstate) {
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

    const store = createStore(
        Reducer,
        initialstate,
        composeEnhancers(applyMiddleware(thunk, reduxImmutableStateVariant())))

    return store
}
