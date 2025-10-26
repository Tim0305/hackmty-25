import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import "@fontsource/roboto";

function VideoStreamClient() {
  const [imageData, setImageData] = useState(null);
  const [stats, setStats] = useState("Conectando al servidor...");
  const [statusColor, setStatusColor] = useState("text-slate-700");
  const [conteoActual, setConteoActual] = useState({});
  const [recetaObjetivo, setRecetaObjetivo] = useState({});
  const [connected, setConnected] = useState(false);

  const audioRef = useRef(null);

  // Función para comprobar si el conteo está completo
  const isConteoCompleto = () => {
    if (!Object.keys(recetaObjetivo).length) return false;
    return Object.entries(recetaObjetivo).every(
      ([item, cantidad]) => conteoActual[item] >= cantidad
    );
  };

  useEffect(() => {
    audioRef.current = new Audio("/alarm.mp3");
    audioRef.current.loop = true;

    const BACKEND_IP = "10.22.236.23"; // Cambia a tu IP
    const PORT = 5001;
    const socket = io(`http://${BACKEND_IP}:${PORT}`);

    socket.on("connect", () => {
      setStats();
      setConnected(true);
    });

    socket.on("video_stream", (data) => {
      if (data.image_data) setImageData(data.image_data);
      if (data.stats) setStats(data.stats);
      if (data.conteo_actual) setConteoActual(data.conteo_actual);
      if (data.receta_objetivo) setRecetaObjetivo(data.receta_objetivo);

      let newColor = "text-slate-700";
      if (data.status_color === "rojo") newColor = "text-red-600";
      else if (data.status_color === "verde") newColor = "text-green-600";
      else if (data.status_color === "amarillo") newColor = "text-yellow-500";

      if (newColor === "text-red-600") {
        if (audioRef.current.paused) {
          audioRef.current.play().catch((err) =>
            console.log("No se pudo reproducir el sonido:", err)
          );
        }
      } else {
        if (!audioRef.current.paused) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }

      setStatusColor(newColor);
    });

    socket.on("disconnect", () => {
      setStats("❌ Desconectado del servidor.");
      setConnected(false);
      setStatusColor("text-red-600");
      if (!audioRef.current.paused) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    });

    return () => {
      socket.disconnect();
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  // Si conteo completo, mostrar solo pantalla blanca con "SIGUIENTE"
  if (isConteoCompleto()) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white">
        <h1 className="text-black text-6xl font-bold">BANDEJA COMPLETA</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-10 p-4 lg:p-8 bg-white font-roboto transition-all duration-700">

      {/* Contenedor de la cámara */}
      <div className="flex flex-col items-center justify-center bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl w-full lg:w-3/4 p-4 lg:p-8 border border-slate-200">
        <div className="w-full h-[75vh] rounded-3xl overflow-hidden shadow-lg border border-slate-200">
          <img
            src={
              imageData
                ? `data:image/jpeg;base64,${imageData}`
                : "https://placehold.co/800x600?text=Esperando+stream..."
            }
            alt={connected ? "Stream activo" : "Desconectado"}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {!imageData && connected && (
          <p className="text-slate-500 mt-4 italic text-lg animate-pulse">
            ⏳ Recibiendo frames del servidor...
          </p>
        )}
      </div>

      {/* Panel lateral */}
      <div className="w-full lg:w-1/4 bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6 lg:p-8 flex flex-col items-center justify-start border border-slate-200 hover:shadow-2xl transition-all duration-500">
        <h3 className="text-2xl font-semibold text-slate-800 mb-4">
          Estado del sistema
        </h3>

        <div
          className={`font-mono ${statusColor} text-lg text-center transition-all duration-300`}
        >
          {stats}
        </div>

        <div
          className={`mt-6 w-4 h-4 rounded-full ${
            connected ? "bg-green-500 animate-pulse" : "bg-red-500"
          }`}
        ></div>

        <p className="mt-2 text-sm text-slate-500">
          {connected ? "Conectado al servidor" : "Sin conexión"}
        </p>

        {/* Conteo de items */}
        <div className="mt-6 w-full">
          <h4 className="text-lg font-semibold text-slate-700 mb-2">Conteo Actual</h4>
          {Object.keys(conteoActual).length > 0 ? (
            <ul className="font-mono text-slate-800 text-left space-y-1">
              {Object.entries(conteoActual).map(([item, cantidad]) => (
                <li
                  key={item}
                  className={
                    recetaObjetivo[item] && cantidad >= recetaObjetivo[item]
                      ? "text-green-600"
                      : "text-yellow-500"
                  }
                >
                  {item}: {cantidad} / {recetaObjetivo[item] || "-"}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400 italic">No se detectan items aún</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoStreamClient;
