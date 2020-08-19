import React from 'react';
import { Redirect, BrowserRouter as Router, Route, Switch } from "react-router-dom"
import {v4 as uuid} from "uuid"
import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';
import NotFoundPage from './Components/NotFoundPage';
import Results from './Components/Results';
import CarSelection from './Components/CarSelection';
import TermsAndConditions from './Components/TermsAndConditions';
import Checkout from './Components/Checkout';
import Reservation from './Components/Reservation';

function App() {
  return (
    <div className="app">
      <Router>
        
        <Header />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/myaccount" component={NotFoundPage} />
          <Route path="/results" exact render={(props) => {return <Results {...props} key={uuid()} />}} />
          <Route path="/results/:name" exact component={CarSelection} />
          <Route path="/results/:name/terms&conditions" exact component={TermsAndConditions} />
          <Route path="/results/:name/checkout" exact component={Checkout} />
          <Route path="/results/:name/reservation" exact component={Reservation} />
          <Redirect to="/" path="/logout" />
        </Switch>

        <Footer />
        
      </Router>
    </div>
  );
}

export default App;

