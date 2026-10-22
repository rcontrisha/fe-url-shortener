import { Route, Routes } from "react-router";
import Index from "./pages/Index";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import CreateLink from "./pages/CreateLink";

function App() {
  return (
    <Routes>
      <Route path="auth">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="/" element={<Index />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/link/create" element={<CreateLink />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
