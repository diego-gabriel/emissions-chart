import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import ChartApp from "./components/ChartApp";
import {store} from "./store/Store";

ReactDOM.render(
    <Provider store={store}>
        <ChartApp/>
    </Provider>, document.getElementById("root")
);