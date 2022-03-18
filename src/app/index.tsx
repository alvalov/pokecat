import React from "react";
import ReactDOM from "react-dom";
import store from './store';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import App from "./App";
import firebaseConfig from './firebaseConfig';


firebase.initializeApp(firebaseConfig);

const rrfProps = {
    firebase,
    config: { userProfile: 'users' },
    dispatch: store.dispatch,
}

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App />
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.querySelector("#app")
);