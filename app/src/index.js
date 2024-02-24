import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

import reportWebVitals from "./reportWebVitals";
import moment from "moment-timezone";

import awsconfig from "./aws-exports";
import { Amplify } from "aws-amplify";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

import { AuthProvider } from "./context";
// import { getUser, listUsers } from "../graphql/queries";
// import { createUser, deleteUser } from "../graphql/mutations";

awsconfig["aws_cloud_logic_custom"] = [
  {
    name: "ic-services",
    endpoint:
      "https://5ngs62w6c5.execute-api.us-east-1.amazonaws.com/ic-api-staging",
    region: "us-east-1",
  },
];

// Set the default timezone
moment.tz.setDefault("America/New_York");

Amplify.configure(awsconfig);

const client = new ApolloClient({
  uri: awsconfig.aws_appsync_graphqlEndpoint,
  cache: new InMemoryCache(),
  headers: {
    "x-api-key": awsconfig.aws_appsync_apiKey,
  },
});

// import { Provider } from "react-redux";
// import store from "./store";

ReactDOM.render(
  // <Router>
  <ApolloProvider client={client}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ApolloProvider>,
  // </Router>
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

reportWebVitals();
// serviceWorker.unregister();
