import React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './App.css';
import Home from './components/Home';
import Favourite from './components/Favourite';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./modules/store";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

function App() {
  return (
    <ReduxProvider store={reduxStore}>
      <Router basename="/BankSearch" >
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/favourite" component={Favourite} />
        </div>
      </Router>
    </ReduxProvider>
  );
}

export default App;
