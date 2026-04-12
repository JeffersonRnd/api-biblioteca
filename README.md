# 📚 API Biblioteca Digital

API REST para gestionar una biblioteca pequeña. Permite administrar libros, usuarios, categorías y préstamos.

## 🚀 Demo

**URL en producción:** https://api-biblioteca-1-16ti.onrender.com

> El servidor puede tardar 30-60 segundos en responder si estuvo inactivo (plan free de Render).

---

## 🛠️ Tecnologías

- **Node.js** + **Express.js**
- **MySQL** (local) / **Railway** (producción)
- **Render** para el despliegue

---

## 📁 Estructura

```
api-biblioteca/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── config/
│   │   └── database.js
│   └── app.js
├── server.js
├── package.json
└── .env
```

---

## ⚙️ Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/JeffersonRnd/api-biblioteca.git
cd api-biblioteca

# Instalar dependencias
npm install

# Crear archivo .env
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=biblioteca
PORT=3000

# Ejecutar
npm run dev
```

---

## 📌 Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /categorias | Listar categorías |
| POST | /categorias | Crear categoría |
| PUT | /categorias/:id | Actualizar categoría |
| DELETE | /categorias/:id | Eliminar categoría |
| GET | /libros | Listar libros |
| POST | /libros | Crear libro |
| PUT | /libros/:id | Actualizar libro |
| DELETE | /libros/:id | Eliminar libro |
| GET | /usuarios | Listar usuarios |
| POST | /usuarios | Crear usuario |
| PUT | /usuarios/:id | Actualizar usuario |
| DELETE | /usuarios/:id | Eliminar usuario |
| GET | /prestamos | Listar préstamos |
| POST | /prestamos | Registrar préstamo |
| PUT | /prestamos/:id/devolver | Registrar devolución |
| DELETE | /prestamos/:id | Eliminar préstamo |

---

## 💡 Ejemplo de uso

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

Al crear un préstamo, el campo `disponibles` del libro se descuenta automáticamente. Al registrar la devolución, se incrementa de vuelta.

---

## 📦 Despliegue

- **API:** [Render](https://render.com) — plan Free
- **Base de datos:** [Railway](https://railway.app) — MySQL en la nube

---

## 👤 Autor

Jefferson — [@JeffersonRnd](https://github.com/JeffersonRnd)
