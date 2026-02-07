import { Provider } from "react-redux";
import { Routing } from "./routing/Routing";
import { store } from "./store";

export function App() {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  );
}
