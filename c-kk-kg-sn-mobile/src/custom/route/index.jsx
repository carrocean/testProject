import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Login from "../login";

const PREFIX = process.env.__CLIENT__
  ? window._baseUrl || ""
  : process.env.PREFIX || "";
const CLIENT = process.env.__CLIENT__;

let DOMAIN_PREFIX = CLIENT ? window._baseUrl || "" : PREFIX || "";

if (DOMAIN_PREFIX === undefined) {
  DOMAIN_PREFIX = "";
}

window.DOMAIN_PREFIX = DOMAIN_PREFIX;

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={`${DOMAIN_PREFIX}/custom/login`} component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
