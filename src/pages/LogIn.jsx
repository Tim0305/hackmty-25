import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Importante

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // 👈 Hook para redirección

  // Credenciales predefinidas
  const credentials = {
    manager: { user: "Victor", pass: "Victor" },
    user: { user: "Lucero", pass: "Lucero" },
  };

  // Función de validación
  const handleLogin = (e) => {
    e.preventDefault();

    if (
      username === credentials.manager.user &&
      password === credentials.manager.pass
    ) {
      navigate("/manager"); // 👈 Redirige al dashboard de manager
    } else if (
      username === credentials.user.user &&
      password === credentials.user.pass
    ) {
      navigate("/user"); // 👈 Redirige al dashboard de usuario
    } else {
      setMessage("Credenciales incorrectas ❌");
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-white dark:bg-slate-900">
      <div className="flex flex-col w-full max-w-md p-8 rounded-2xl bg-white shadow-lg dark:bg-slate-800">
        {/* Título */}
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white leading-tight">
          <span className="block">Welcome to</span>
          <span className="block text-2xl font-bold text-gray-800">
            Gate Group
          </span>
        </h2>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5 mt-5">
          <div>
            <label className="block text-sm font-medium text-slate-950 dark:text-gray-300 mb-1">
              Usuario
            </label>
            <input
              type="text"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-slate-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-950 dark:text-gray-300 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-slate-950 dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full py-2 bg-slate-950 text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all cursor-pointer"
          >
            Entrar
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm font-medium text-gray-700 dark:text-gray-300">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default LogIn;
