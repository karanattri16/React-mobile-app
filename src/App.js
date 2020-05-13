import React from "react";
import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Productlist from "./components/Productlist";
import Details from "./components/Details";
import Default from "./components/Default";
import Cart from "./components/Cart";
import Modal from "./components/Modal";

class App extends Component {
  render() {
    return (
      <div>
        <React.Fragment>
          <Navbar></Navbar>
          <Switch>
            <Route exact path="/" component={Productlist} />
            <Route exact path="/details" component={Details} />?
            <Route exact path="/cart" component={Cart} />
npm            <Route component={Default} />
          </Switch>
          <Modal />
        </React.Fragment>
      </div>
    );
  }
}
export default App;
