
Sistema de evaluación web con preguntas de opción múltiple y verdadero/falso, desarrollado con Express y React. Genera resultados en PDF y permite escalabilidad mediante base de datos.

# 🧠 Evaluación Interactiva Web con Node.js, React y PDF Export

Este proyecto es una plataforma web de evaluaciones interactivas. Los usuarios responden preguntas de opción múltiple o verdadero/falso, y al finalizar, obtienen un reporte de resultados descargable en PDF.

## 🚀 Tecnologías utilizadas

- **Frontend**: React.js (con Hooks y manejo de estados)
- **Backend**: Node.js + Express
- **PDF**: pdfkit para exportar resultados
- **API REST**: para enviar y recibir respuestas
- **(Próximamente)**: Conexión a base de datos (PostgreSQL). Panel administrativo para gestion(CRUD) de usuarios, preguntas, tests, resultados de los tests. Relaciones entre las distintas tablas de la base de datos. Autenticacion del usuario para poder hacer el test. Logs de cada nuevo registro, inicio de sesion y cierre de sesion de cada usuario. Se almacenaran los resultados de cada test para llevar un historial.  

## 🧩 Características

- ✔️ Evaluaciones dinámicas por API
- ✔️ Formato pregunta por pregunta
- ✔️ Soporte para opción múltiple y verdadero/falso
- ✔️ Generación de resultados en PDF
- ✔️ Código modular y extensible
- ❗ Sin login: enfoque rápido, sencillo y anónimo

## 🔧 Instalación y uso local

### 1. Clona el repositorio

En un terminal:

git clone https://github.com/santiagourdaneta/Evaluacion-Interactiva-con-Express-y-React-Plataforma-de-Preguntas-Dinamicas-via-API/
cd Evaluacion-Interactiva-con-Express-y-React-Plataforma-de-Preguntas-Dinamicas-via-API
cd backend
npm install
node app.js

En otro terminal:

cd frontend
npm install
npm run dev

💡 Futuras mejoras

Conexión con base de datos (MongoDB o PostgreSQL)
Panel de administración de preguntas
Almacenamiento de historial por usuario
Soporte para imágenes, videos y preguntas multimedia

⭐ SEO Tags
Evaluación web | Node.js quiz | React examen | pdfkit | preguntas tipo test | exportar PDF examen | evaluación online 
