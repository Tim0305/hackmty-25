function Errores() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-white dark:bg-slate-900">
      {/* Card principal */}
      <div className="flex flex-col max-w-6xl w-full rounded-xl bg-white p-8 lg:p-8 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
        
        {/* Fila superior: Conteo a la izquierda, checkmark a la derecha */}
        <div className="flex items-center justify-between mb-8 lg:mb-12">
          <p className="count-text font-semibold text-lg md:text-xl lg:text-2xl">Conteo: 2/10</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12 text-green-500"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Imagen centrada */}
        <div className="flex justify-center mb-6 lg:mb-8">
          <img
            className="w-full max-w-lg h-auto rounded-lg shadow-md object-contain"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsB8NKORD4j_knDUWeGVucC3wxIgXBlMu0Pw&s"
            alt="Vista cámara"
          />
        </div>

        {/* Texto de error debajo de la imagen */}
        <div className="text-center text-red-600 font-semibold text-lg md:text-xl lg:text-2xl mt-4 lg:mt-6">
          <p>Falta 1 paquete</p>
        </div>
      </div>
    </div>
  )
}

export default Errores;
