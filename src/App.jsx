import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Employees from "./pages/Employees";
import Products from "./pages/Products";
import Manager from "./pages/Manager";
import LogIn from "./pages/LogIn";

function App() {
  return (
    <Router>
      <Routes>
        {/* Página de login */}
        <Route path="/login" element={<LogIn />} />

        {/* Panel del manager */}
        <Route path="/manager/*" element={<Manager />} />

        {/* Páginas de contenido */}
        <Route path="/manager/employees" element={<Employees />} />
        <Route path="/manager/products" element={<Products />} />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
