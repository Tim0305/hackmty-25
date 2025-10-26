/*import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

function LiveCamWS() {
  const videoRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // 1️⃣ Activar la cámara
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    });

    // 2️⃣ Conectar a Socket.IO
    socketRef.current = io("http://localhost:8080");

    // 3️⃣ Enviar frames cada 100 ms
    const sendFrame = () => {
      if (!videoRef.current) return;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 320;
      canvas.height = 240;
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const frame = canvas.toDataURL("image/jpeg", 0.5);
      socketRef.current.emit("frame", frame);
    };

    const interval = setInterval(sendFrame, 100);

    // 🧩 Escuchar frames desde otros clientes (si deseas verlos)
    socketRef.current.on("videoFrame", (frame) => {
      console.log("Frame recibido:", frame);
      // podrías mostrarlo en otro <img> para monitoreo remoto
    });

    return () => {
      clearInterval(interval);
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <video ref={videoRef} autoPlay muted className="rounded-lg shadow-md w-80" />
    </div>
  );
}

export default LiveCamWS;
*/