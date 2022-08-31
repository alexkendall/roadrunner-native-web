import App from "./src/Components/App";
import { Provider } from "react-redux";
import store from "./src/Redux/Store";

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);

