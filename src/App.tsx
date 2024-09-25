import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store"; 
import Data from "./features/components/Data";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Data />
      </div>
    </Provider>
  );
};

export default App;
