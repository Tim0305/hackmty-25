import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "@fontsource/roboto";

function VideoStreamClient() {
  const [imageData, setImageData] = useState(null);
  const [stats, setStats] = useState("Conectando al servidor...");
  const [connected, setConnected] = useState(false);
  const [statusColor, setStatusColor] = useState("text-slate-800"); // Tailwind class

  useEffect(() => {
    const BACKEND_IP = "10.22.186.200";
    const PORT = 5001;
    const socket = io(`http://${BACKEND_IP}:${PORT}`);

    socket.on("connect", () => {
      setStats("Conectado. Esperando datos...");
      setConnected(true);
    });

    socket.on("video_stream", (data) => {
      if (data.image_data) setImageData(data.image_data);
      if (data.stats) setStats(data.stats);

      // Cambia el color según status_color
      if (data.status_color === "rojo") setStatusColor("text-red-600");
      else setStatusColor("text-black");
    });

    socket.on("disconnect", () => {
      setStats("Error: Desconectado del servidor.");
      setConnected(false);
      setStatusColor("text-red-600");
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="flex min-h-screen p-6 gap-6 bg-white font-roboto">
      {/* Columna izquierda: Cámara */}
      <div className="w-3/4 flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg p-4">
        <h2 className="text-gray-900 text-3xl font-bold mb-4">
          Proyección de la cámara
        </h2>
        <div className="overflow-hidden rounded-xl w-full max-h-[80vh]">
          <img
            src={imageData ? `data:image/jpeg;base64,${imageData}` : ""}
            alt={connected ? "Esperando stream..." : "Desconectado"}
            className="w-full h-auto object-cover transition-transform duration-500 ease-in-out hover:scale-105"
          />
        </div>
        {!imageData && connected && (
          <p className="text-gray-500 mt-3 italic">
            Esperando frames del servidor...
          </p>
        )}
      </div>

      {/* Columna derecha: Mensaje de error */}
      <div className="w-1/4 flex flex-col items-center justify-center bg-white rounded-2xl shadow-md p-6 text-center">
        <h2 className="text-slate-950 text-4xl font-bold mb-4 animate-pulse">
          ¡Error!
        </h2>
        <p className="text-black text-2xl mb-6 font-semibold">
          Faltan 2 canelitas
        </p>
        <p className={`font-mono ${statusColor} text-lg`}>{stats}</p>
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
  );
}

export default VideoStreamClient;
