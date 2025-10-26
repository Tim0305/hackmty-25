function LogIn() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-white dark:bg-slate-900">
      <div className="flex flex-col w-full max-w-md p-8 rounded-2xl bg-white shadow-lg dark:bg-slate-800">
        {/* Título */}
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white leading-tight">
            <span className="block">Welcome to</span>
            <span className="block text-2xl font-bold text-gray-800">Gate Group</span>
        </h2>

        {/* Formulario */}
        <form className="flex flex-col gap-5">
          {/* Campo: correo */}
          <div>
            <label className="block text-sm font-medium text-slate-950 dark:text-gray-300 mb-1">
              Usuario
            </label>
            <input
              type="text"
              placeholder="Ingresa tu usuario"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:gray dark:bg-slate-700 dark:text-white"
              required
            />
          </div>

          {/* Campo: contraseña */}
          <div>
            <label className="block text-sm font-medium text-slate-950 dark:text-gray-300 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:gray dark:bg-slate-950 dark:text-white"
              required
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="mt-4 w-full py-2 bg-slate-950 text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all cursor-pointer"
          >
            Entrar
          </button>
        </form>

      </div>
    </div>
  );
}

export default LogIn;
