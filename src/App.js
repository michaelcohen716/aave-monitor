import React from 'react';
import Nav from "./components/Nav";
import LeftPanel from "./components/Left/LeftPanel"
import RightPanel from "./components/Right/RightPanel"
import reducers from "./redux/reducers";
import ReduxThunk from "redux-thunk";
import logger from "redux-logger";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import './App.css';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger));

function App() {
  return (
    <Provider store={store}>
      <div className="App px-3">
        <Nav />
        <div className="container-fluid">
          <div className="row mt-5">
            <LeftPanel />
            <RightPanel />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
