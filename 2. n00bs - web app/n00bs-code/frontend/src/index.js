import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./components/HomePage";
import GamePage from "./components/GamePage";
import WishlistPage from "./components/WishlistPage";

import "./styles/styles.scss";
import "./styles/fonts/coolvetica-rg.ttf";
import { firebase } from "./firebase/firebase";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserPage from "./components/UserPage";

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={HomePage} />
      <Route path="/game-page" component={GamePage} />
      <Route path="/wishlist" component={WishlistPage} />
      <Route path="/user-page" component={UserPage} />
    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));

serviceWorker.unregister();
