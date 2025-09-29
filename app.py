from flask import Flask, render_template, url_for, request, redirect, flash, jsonify
from werkzeug.utils import secure_filename
import os
import sqlite3
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.secret_key = 'Miclave'

# Carpeta donde guardarás los archivos
app.config['UPLOAD_FOLDER'] = '.\\static\\uploads'  # crea la carpeta si no existe
# (opcional) Tamaño máximo permitido, por ejemplo 16 MB:
#app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'mp4'}

def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def init_db():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()

    c.execute('''
        CREATE TABLE IF NOT EXISTS mensajes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL CHECK (length(nombre) <= 50),
        email TEXT NOT NULL CHECK (length(email) <= 50),
        mensaje TEXT NOT NULL CHECK (length(mensaje) <= 500),
        telefono TEXT NOT NULL CHECK (length(telefono) <= 10),
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS proyectos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        imagen TEXT NOT NULL,
        linealidades TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        tecnologias TEXT NOT NULL,
        enlace TEXT
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT UNIQUE,
        telefono TEXT,
        password TEXT NOT NULL
        )
    ''')

    conn.commit()
    conn.close()

init_db()

def consultar_db(query,tupla):
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    datos = c.execute(query,tupla).fetchall()
    conn.commit()
    conn.close()
    datos_list = [dict(dato) for dato in datos]
    return datos_list

def formatear_linealidades(linealidades):
    linealidades = linealidades.split(",")
    return linealidades

#Inicio
@app.route('/')
def index():
    query = "select * from proyectos ORDER BY id ASC LIMIT 4"
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    proyectos = c.execute(query).fetchall()
    conn.commit()
    conn.close()

    proyectos_list = [dict(proyecto) for proyecto in proyectos]

    for k in proyectos_list:
        #linealidades = k['linealidades'].split(",")
        k['linealidades'] = formatear_linealidades(k["linealidades"])
    

    #return proyectos_list
    return render_template('./index.html', proyectos=proyectos_list)

@app.route("/proyectos")
def mostrar_proyectos():
    query = "select * from proyectos"
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    proyectos = c.execute(query).fetchall()
    conn.commit()
    conn.close()

    proyectos_list = [dict(proyecto) for proyecto in proyectos]

    for k in proyectos_list:
        #linealidades = k['linealidades'].split(",")
        k['linealidades'] = formatear_linealidades(k["linealidades"])

    return render_template("./proyectos.html", proyectos=proyectos_list)

@app.route("/proyecto")
def mostrar_proyecto():
    id = request.args.get('id')
    query = "SELECT * FROM proyectos WHERE id = ?"
    tupla = (id);
    datos = consultar_db(query,tupla)
    
    datos[0]['linealidades'] = formatear_linealidades(datos[0]["linealidades"])

    return render_template("/proyecto.html",proyecto=datos[0])

#Inicio Admin
@app.route('/admin')
def admin():
    try:
        created = request.args.get('created')
    except:
        created = 0

    try:
        deleted = request.args.get("deleted")
    except:
        deleted = 0

    try:
        upgrade = request.args.get("upgrade")
    except:
        upgrade = 0

    query = "select * from proyectos"
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    proyectos = c.execute(query).fetchall()
    conn.commit()
    conn.close()

    proyectos_list = [dict(proyecto) for proyecto in proyectos]

    return render_template('./admin/proyectos/proyectos.html', proyectos=proyectos_list, created=created, deleted=deleted, upgrade=upgrade)

#Nuevo proyecto
@app.route("/admin/proyectos/nuevo")
def nuevo_proyecto():
    return render_template("./admin/proyectos/crear.html")

@app.route("/admin/proyectos/nuevo", methods = ["POST"])
def guardar_proyecto():

    if 'imagen' not in request.files:
        return 'No se envió ninguna imagen', 400
    
    file = request.files['imagen']
    if not(file) or not(allowed_file(file.filename)):
        return "Tipo de Archivo no permitido", 400
    
    filename = secure_filename(file.filename)

    titulo = request.form["titulo"]
    imagen = filename
    descripcion = request.form["descripcion"]
    linealidades = request.form["linealidades"]
    tecnologias = request.form["tecnologias"]
    enlace = request.form["enlace"]



    path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(path)

    
    conn = sqlite3.connect("database.db")
    c = conn.cursor()
    c.execute("INSERT INTO proyectos (titulo, imagen, descripcion, linealidades, tecnologias, enlace) VALUES (?, ?, ?, ?, ?, ?)",
              (titulo, imagen, descripcion, linealidades, tecnologias, enlace))
    conn.commit()
    conn.close()
    
    return redirect(url_for('admin',created="ok"))

@app.route('/admin/proyectos/delete', methods=['POST'])
def eliminar_proyecto():
    id = request.form['id']
    conn = sqlite3.connect("database.db")
    c = conn.cursor()
    query = "DELETE FROM proyectos WHERE id = ?"
    c.execute(query,(id))
    conn.commit()
    conn.close()
    return redirect(url_for('admin',deleted="ok"))

@app.route("/admin/proyectos/actualizar", methods = ['POST'])
def actualizar_proyecto():
    id = request.form['id']
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    query = "SELECT * FROM proyectos WHERE id = ?"
    proyecto  = c.execute(query,(id)).fetchone()
    conn.commit()
    conn.close()
    #return dict(proyecto)
    return render_template("/admin/proyectos/actualizar.html", proyecto=proyecto)

@app.route("/admin/proyectos/put", methods = ["POST"])
def guardar_cambios():

    if 'imagen' not in request.files:
        return 'No se envió ninguna imagen', 400
    
    file = request.files['imagen']
    if not(file) or not(allowed_file(file.filename)):
        return "Tipo de Archivo no permitido", 400
    
    filename = secure_filename(file.filename)

    titulo = request.form["titulo"]
    imagen = filename
    descripcion = request.form["descripcion"]
    linealidades = request.form["linealidades"]
    tecnologias = request.form["tecnologias"]
    enlace = request.form["enlace"]



    #path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    #file.save(path)

    
    #conn = sqlite3.connect("database.db")
    #c = conn.cursor()
    #c.execute("INSERT INTO proyectos (titulo, imagen, descripcion, linealidades, tecnologias, enlace) VALUES (?, ?, ?, ?, ?, ?)",
    #          (titulo, imagen, descripcion, linealidades, tecnologias, enlace))
    #conn.commit()
    #conn.close()
    
    return redirect(url_for('admin',upgrade="ok"))

#Guardar mensaje
@app.route('/enviar',methods = ['POST'])
def enviar():
    data = request.get_json()
    nombre = data['nombre']
    email = data['email']
    telefono = data['telefono']
    mensaje = data['mensaje']

    print(nombre, email, telefono, mensaje)

    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("INSERT INTO mensajes (nombre, email, telefono, mensaje) VALUES (?, ?, ?, ?)",
        (nombre, email, telefono, mensaje))
    conn.commit()
    conn.close()
    flash('Mensaje enviado correctamente, Gracias!')
    return 'mensaje recibido', 200

@app.context_processor
def inject_path():
    return dict(current_path=request.path, current_endpoint=request.endpoint)

if __name__ == '__main__':
    app.run(debug = True)