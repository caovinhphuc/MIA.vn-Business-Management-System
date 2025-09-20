import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { LayoutProvider } from "./components/templates/AppLayout/LayoutContext";
import { router } from "./routes";
import { store } from "./store";
import "./styles/globals.scss";

function App() {
  return (
    <Provider store={store}>
      <LayoutProvider>
        <RouterProvider router={router} />
      </LayoutProvider>
    </Provider>
  );
}

export default App;
