# 📚 API Biblioteca Digital

API REST para gestionar una biblioteca pequeña. Permite administrar libros, usuarios, categorías y préstamos mediante endpoints REST.

## 🚀 Demo en producción

**URL:** https://api-biblioteca-1-16ti.onrender.com

> El servidor puede tardar 30-60 segundos en responder si estuvo inactivo (plan free de Render).

---

## 🛠️ Tecnologías

- **Node.js** + **Express.js**
- **MySQL** — local con XAMPP / producción con Railway
- **Render** para el despliegue en la nube

---

## 📦 Dependencias

```bash
npm install express mysql2 dotenv cors
npm install nodemon --save-dev
```

| Paquete | Uso |
|---------|-----|
| express | Framework principal de la API |
| mysql2 | Conector con MySQL |
| dotenv | Variables de entorno (.env) |
| cors | Permitir solicitudes entre dominios |
| nodemon | Reinicio automático en desarrollo |

---
## ⚙️ Instalación y ejecución local

### 1. Requisitos previos

- Tener instalado [Node.js](https://nodejs.org)
- Tener instalado [XAMPP](https://www.apachefriends.org) para correr MySQL en local

### 2. Iniciar XAMPP

- Abrir XAMPP Control Panel
- Iniciar los módulos **Apache** y **MySQL**
- Abrir **phpMyAdmin**: `http://localhost/phpmyadmin`
- Crear una base de datos llamada `biblioteca`

### 3. Crear las tablas

En phpMyAdmin, seleccionar la base de datos `biblioteca`, ir a la pestaña **SQL** y ejecutar:

```sql
CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

CREATE TABLE libros (
    id_libro INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255),
    isbn VARCHAR(50),
    categoria_id INT,
    anio_publicacion INT,
    cantidad INT DEFAULT 1,
    disponibles INT DEFAULT 1,
    descripcion TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id_categoria)
);

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    dni VARCHAR(20),
    correo VARCHAR(100),
    telefono VARCHAR(20),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'activo'
);

CREATE TABLE prestamos (
    id_prestamo INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_libro INT,
    fecha_prestamo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_devolucion DATE,
    fecha_devolucion_real DATE,
    estado VARCHAR(20) DEFAULT 'prestado',
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_libro) REFERENCES libros(id_libro)
);
```

### 4. Clonar e instalar

```bash
git clone https://github.com/JeffersonRnd/api-biblioteca.git
cd api-biblioteca
npm install
```

### 5. Crear el archivo .env

Crear un archivo `.env` en la raíz del proyecto:

```
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=biblioteca
PORT=3000
```

### 6. Ejecutar

```bash
npm run dev
```

El servidor correrá en: `http://localhost:3000`

---

## 🧪 Pruebas con Thunder Client

Thunder Client es una extensión de VS Code para probar endpoints REST sin salir del editor.

**Instalación:** VS Code → Extensions (`Ctrl+Shift+X`) → buscar `Thunder Client` → instalar.

### En local

Con XAMPP corriendo y el servidor levantado (`npm run dev`), usar:

```
http://localhost:3000
```

### En producción

Sin levantar nada, usar directamente la URL pública:

```
https://api-biblioteca-1-16ti.onrender.com
```

> **Importante:** en peticiones POST y PUT agregar el header:
> `Content-Type: application/json`

---

## 📌 Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /categorias | Listar todas las categorías |
| GET | /categorias/:id | Obtener categoría por ID |
| POST | /categorias | Crear categoría |
| PUT | /categorias/:id | Actualizar categoría |
| DELETE | /categorias/:id | Eliminar categoría |
| GET | /libros | Listar todos los libros |
| GET | /libros/:id | Obtener libro por ID |
| POST | /libros | Crear libro |
| PUT | /libros/:id | Actualizar libro |
| DELETE | /libros/:id | Eliminar libro |
| GET | /usuarios | Listar todos los usuarios |
| GET | /usuarios/:id | Obtener usuario por ID |
| POST | /usuarios | Crear usuario |
| PUT | /usuarios/:id | Actualizar usuario |
| DELETE | /usuarios/:id | Eliminar usuario |
| GET | /prestamos | Listar todos los préstamos |
| GET | /prestamos/:id | Obtener préstamo por ID |
| POST | /prestamos | Registrar préstamo |
| PUT | /prestamos/:id/devolver | Registrar devolución |
| DELETE | /prestamos/:id | Eliminar préstamo |

> **Orden recomendado:** Categorías → Usuarios → Libros → Préstamos

---

## 💡 Ejemplos de uso

**Crear una categoría:**
```json
POST /categorias
{
  "nombre": "Ciencia Ficción",
  "descripcion": "Libros de ciencia ficción"
}
```

**Crear un libro:**
```json
POST /libros
{
  "titulo": "Dune",
  "autor": "Frank Herbert",
  "categoria_id": 1,
  "cantidad": 5,
  "disponibles": 5
}
```

**Registrar un préstamo:**
```json
POST /prestamos
{
  "id_usuario": 1,
  "id_libro": 1,
  "fecha_devolucion": "2026-05-01"
}
```

Al crear un préstamo, `disponibles` se descuenta automáticamente. Al registrar la devolución con `PUT /prestamos/:id/devolver`, se incrementa de vuelta.

---

## ☁️ Despliegue

- **API:** [Render](https://render.com) — plan Free
- **Base de datos en la nube:** [Railway](https://railway.app) — MySQL
