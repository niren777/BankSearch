import React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './App.css';
import Home from './components/Home';
import Favourite from './components/Favourite';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/favourite" component={Favourite} />
      </div>
    </Router>
  );
}

export default App;
