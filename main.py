from sockets import cam, app
import eventlet

if __name__ == '__main__':
    try:
        listener = eventlet.listen(('0.0.0.0', 5001))
        eventlet.wsgi.server(listener, app)
    except OSError as e:
        print(f"Error al iniciar el servidor")
    except KeyboardInterrupt:
        print("Servidor detenido")
    finally:
        print("Cerrando cam")
        cam.release()