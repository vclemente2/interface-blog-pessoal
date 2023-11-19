import { AuthProvider } from "./contexts/AuthContext";
import AppRouter from "./routes";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
