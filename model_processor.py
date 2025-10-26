# Archivo: model_processor.py
import os
import cv2
import base64
from ultralytics import YOLO
from dotenv import load_dotenv

load_dotenv()
ruta_model = os.getenv("RUTA_MODEL")

MIN_CONFIDENCE = 0.40 
RECETA_OBJETIVO = {
    'Galleta principe': 3,
    'Galleta Canelitas': 2
}
ITEMS_VALIDOS = ['Galleta Canelitas', 'Galleta principe']
ITEMS_INVALIDOS = ['coca', 'electrolit'] 
ITEMS_IGNORADOS = ['mano']
ITEM_BANDEJA = 'bandeja' 

COLOR_MAP = {
    'Galleta Canelitas': (0, 255, 255), 
    'Galleta principe': (255, 191, 0),   
    'mano': (255, 255, 255),             
    'bandeja': (255, 0, 0),                
    'INCORRECTO': (0, 0, 255),           
    'coca': (0, 0, 255),                   
    'electrolit': (0, 0, 255)              
}
DEFAULT_COLOR = (0, 0, 255) 

try:
    model = YOLO(ruta_model)
except Exception as e:
    exit()

def process_frame(frame):
    frame_con_boxes = frame.copy()
    try:
        results = model(frame, conf=0.1, verbose=False) 
    except Exception as e:
        print(f"Error durante la predicción de YOLO: {e}")
        return None 
    conteo_items = {} 

    lista_para_stats = []
    status_color = "verde"  
    bandeja_detectada = False
    item_invalido_detectado = False 
    for box in results[0].boxes:
        conf = float(box.conf[0])
        if conf < MIN_CONFIDENCE:
            continue 
        class_id = int(box.cls[0])
        nombre_original = results[0].names[class_id]
        x1, y1, x2, y2 = [int(coord) for coord in box.xyxy[0]]
        if nombre_original == ITEM_BANDEJA:
            bandeja_detectada = True
            nombre_final = "Bandeja"
            color_caja = COLOR_MAP.get('bandeja')
        elif nombre_original in ITEMS_IGNORADOS:
            nombre_final = "Mano"
            color_caja = COLOR_MAP.get('mano')
        elif nombre_original in ITEMS_VALIDOS:
            nombre_final = nombre_original
            color_caja = COLOR_MAP.get(nombre_final)
            conteo_items[nombre_final] = conteo_items.get(nombre_final, 0) + 1
        elif nombre_original in ITEMS_INVALIDOS:
            nombre_final = "INCORRECTO"
            color_caja = COLOR_MAP.get('INCORRECTO')
            status_color = "rojo"
            item_invalido_detectado = True
        
        else: 
            nombre_final = "INCORRECTO"
            color_caja = COLOR_MAP.get('INCORRECTO')
            status_color = "rojo" 
            item_invalido_detectado = True

        label = f"{nombre_final} {conf:.2f}"
        cv2.rectangle(frame_con_boxes, (x1, y1), (x2, y2), color_caja, 2)
        cv2.putText(frame_con_boxes, label, (x1, y1 - 10), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, color_caja, 2)


    conteo_completo = {**RECETA_OBJETIVO.fromkeys(RECETA_OBJETIVO, 0), **conteo_items}

    if not bandeja_detectada:
        stats_string = ""
    elif item_invalido_detectado:
        status_color = "rojo" 
        stats_string = "¡ITEM INCORRECTO!"
    elif conteo_completo == RECETA_OBJETIVO:
        status_color = "verde" 
        stats_string = "¡COMPLETO!"
    else:
        status_color = "amarillo" 
        lista_para_stats = [f"{n}: {c}" for n, c in conteo_items.items()]
        stats_string = " | ".join(lista_para_stats) if lista_para_stats else "Bandeja vacía"
    
    _, buffer = cv2.imencode('.jpg', frame_con_boxes)
    jpg_as_text = base64.b64encode(buffer).decode('utf-8')

 
    return {
        'image_data': jpg_as_text,
        'stats': stats_string,
        'status_color': status_color, 
        'conteo_actual': conteo_items,       
        'receta_objetivo': RECETA_OBJETIVO 
    }