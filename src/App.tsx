import { AuthProvider } from "./contexts/AuthContents";
import AppRouter from "./routes";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
