from flask import Flask, render_template, request, redirect, flash
import sqlite3
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.secret_key = 'Miclave'

def init_db():
    conn = sqlite3.connect('contacto.db')
    c = conn.cursor()
    c.execute('''
              CREATE TABLE IF NOT EXISTS mensajes (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              nombre TEXT,
              email TEXT,
              mensaje TEXT,
              telefono TEXT

              )
    ''')
    conn.commit()
    conn.close()

init_db()

@app.route('/')
def index():
    return render_template('./index.html')

@app.route('/enviar',methods = ['POST'])
def enviar():
    data = request.get_json()
    nombre = data['nombre']
    email = data['email']
    telefono = data['telefono']
    mensaje = data['mensaje']

    print(nombre, email, telefono, mensaje)

    conn = sqlite3.connect('contacto.db')
    c = conn.cursor()
    c.execute("INSERT INTO mensajes (nombre, email, telefono, mensaje) VALUES (?, ?, ?, ?)",
        (nombre, email, telefono, mensaje))
    conn.commit()
    conn.close()
    flash('Mensaje enviado correctamente, Gracias!')
    return 'mensaje recibido', 200

if __name__ == '__main__':
    app.run(debug = True)