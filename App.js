import React from 'react';
import { Provider } from "react-redux";
import Routes from './src/navigations/Routes';
import store from "./src/redux/store";
import SplashScreen from  "react-native-splash-screen";

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <Provider store={store}>
      <Routes />
      </Provider>
  );
};

export default App;
