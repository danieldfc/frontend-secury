import React from "react";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings([
  "componentWillReceiveProps is deprecated and will be removed in the",
  "componentWillUpdate is deprecated and will be remove",
  "componentWillMount is deprecated and will be remove"
]);

import Routes from "./routes";

const App = () => <Routes />;

export default App;
