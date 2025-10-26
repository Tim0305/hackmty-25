import cv2
import socketio
import sys
from model_processor import process_frame

try:
    sio = socketio.Server(cors_allowed_origins='*')
    app = socketio.WSGIApp(sio)
except Exception as e:
    print(f"Error al inicializar SocketIO: {e}")
    sys.exit()
try:
    cam = cv2.VideoCapture(1) 
    if not cam.isOpened():
        print("No se puede abrir la cámara")
        sys.exit()
except Exception as e:
    print(f"Error al abrir la cámara: {e}")
    sys.exit()

def send_video_feed():
    while True:
        ret, frame = cam.read()
        if not ret:
            print("Error al capturar frame de la cámara")
            sio.sleep(0.1)
            continue
        processed_data = process_frame(frame)
        
        if processed_data:
            sio.emit('video_stream', processed_data)

        sio.sleep(0.01)

@sio.on('connect')
def connect(sid, environ):
    print(f"Cliente conectado: {sid}")
    sio.start_background_task(send_video_feed)

@sio.on('disconnect')
def disconnect(sid):
    print(f"Cliente desconectado: {sid}")