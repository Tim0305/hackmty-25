import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import "@fontsource/roboto";

function VideoStreamClient() {
  const [imageData, setImageData] = useState(null);
  const [stats, setStats] = useState("Conectando al servidor...");
  const [connected, setConnected] = useState(false);
  const [statusColor, setStatusColor] = useState("text-slate-700");

  // Guarda el color anterior para detectar cambios
  const prevStatusColor = useRef("text-slate-700");

  // 🔊 Función para reproducir un sonido de alerta
  const playAlertSound = () => {
    const audio = new Audio("/alarm.mp3"); // Archivo en /public
    audio.play().catch((err) =>
      console.log("No se pudo reproducir el sonido:", err)
    );
  };

  useEffect(() => {
    const BACKEND_IP = "10.22.186.200"; // <-- Tu IP del backend
    const PORT = 5001;
    const socket = io(`http://${BACKEND_IP}:${PORT}`);

    socket.on("connect", () => {
      setStats("✅ Conectado. Esperando datos...");
      setConnected(true);
    });

    socket.on("video_stream", (data) => {
      if (data.image_data) setImageData(data.image_data);
      if (data.stats) setStats(data.stats);

      let newColor = "text-slate-700";

      if (data.status_color === "rojo") newColor = "text-red-600";
      else if (data.status_color === "verde") newColor = "text-green-600";

      // 🚨 Solo reproducir si el color cambia de otro a "rojo"
      if (
        newColor === "text-red-600" &&
        prevStatusColor.current !== "text-red-600"
      ) {
        playAlertSound();
      }

      // Actualiza el color actual y el anterior
      setStatusColor(newColor);
      prevStatusColor.current = newColor;
    });

    socket.on("disconnect", () => {
      setStats("❌ Desconectado del servidor.");
      setConnected(false);
      setStatusColor("text-red-600");
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-10 p-8 bg-white from-slate-50 via-slate-100 to-slate-300 font-roboto transition-all duration-700">
      {/* Contenedor de la cámara */}
      <div className="flex flex-col items-center justify-center bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl w-full lg:w-3/4 p-6 lg:p-10 border border-slate-200">
        <div className="overflow-hidden rounded-3xl w-full max-h-[75vh] shadow-lg border border-slate-200 transition-all duration-500 hover:scale-[1.01] hover:shadow-xl">
          <img
            src={
              imageData
                ? `data:image/jpeg;base64,${imageData}`
                : "https://placehold.co/800x600?text=Esperando+stream..."
            }
            alt={connected ? "Stream activo" : "Desconectado"}
            className="w-full h-auto object-cover"
          />
        </div>

        {!imageData && connected && (
          <p className="text-slate-500 mt-4 italic text-lg animate-pulse">
            ⏳ Recibiendo frames del servidor...
          </p>
        )}
      </div>

      {/* Panel lateral */}
      <div className="w-full lg:w-1/4 bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8 flex flex-col items-center justify-center border border-slate-200 hover:shadow-2xl transition-all duration-500">
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
      </div>
    </div>
  );
}

export default VideoStreamClient;
