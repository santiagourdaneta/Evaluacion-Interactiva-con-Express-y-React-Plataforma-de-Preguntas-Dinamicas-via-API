const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const PDFDocument = require('pdfkit');

const app = express();
const PORT = 3001;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// Simulador de base de datos en memoria
let preguntas = [
  {
    id: 1,
    tipo: 'opcion_multiple',
    pregunta: '¿Cuál es la capital de Francia?',
    opciones: ['Madrid', 'París', 'Berlín', 'Roma'],
    correcta: 'París'
  },
  {
    id: 2,
    tipo: 'verdadero_falso',
    pregunta: 'El Sol es un planeta.',
    correcta: 'Falso'
  },
  {
    id: 3,
    tipo: 'opcion_multiple',
    pregunta: '¿Qué órgano bombea sangre por todo el cuerpo?',
    opciones: ['Pulmón', 'Riñón', 'Corazón', 'Estómago'],
    correcta: 'Corazón'
  },
  {
    id: 4,
    tipo: 'verdadero_falso',
    pregunta: 'El agua hierve a 100 grados Celsius.',
    correcta: 'Verdadero'
  },
  {
    id: 5,
    tipo: 'opcion_multiple',
    pregunta: '¿Cuál es el animal más rápido del mundo?',
    opciones: ['Guepardo', 'Águila', 'Tigre', 'Caballo'],
    correcta: 'Guepardo'
  },
  {
    id: 6,
    tipo: 'opcion_multiple',
    pregunta: '¿Quién escribió "Don Quijote de la Mancha"?',
    opciones: ['Gabriel García Márquez', 'Miguel de Cervantes', 'Pablo Neruda', 'Mario Vargas Llosa'],
    correcta: 'Miguel de Cervantes'
  },
  {
    id: 7,
    tipo: 'verdadero_falso',
    pregunta: 'La Tierra tiene una sola luna.',
    correcta: 'Verdadero'
  },
  {
    id: 8,
    tipo: 'opcion_multiple',
    pregunta: '¿Cuál es el resultado de 5 x 6?',
    opciones: ['11', '30', '25', '20'],
    correcta: '30'
  },
  {
    id: 9,
    tipo: 'opcion_multiple',
    pregunta: '¿Qué gas respiramos para vivir?',
    opciones: ['Hidrógeno', 'Nitrógeno', 'Oxígeno', 'Dióxido de carbono'],
    correcta: 'Oxígeno'
  },
  {
    id: 10,
    tipo: 'opcion_multiple',
    pregunta: '¿Cuál es el océano más grande del mundo?',
    opciones: ['Atlántico', 'Índico', 'Ártico', 'Pacífico'],
    correcta: 'Pacífico'
  },
  {
    id: 11,
    tipo: 'opcion_multiple',
    pregunta: '¿Qué país tiene forma de bota?',
    opciones: ['España', 'Brasil', 'Italia', 'Grecia'],
    correcta: 'Italia'
  },
  {
    id: 12,
    tipo: 'opcion_multiple',
    pregunta: '¿En qué continente está Egipto?',
    opciones: ['Europa', 'Asia', 'África', 'América'],
    correcta: 'África'
  },
  {
    id: 13,
    tipo: 'verdadero_falso',
    pregunta: 'Los murciélagos son ciegos.',
    correcta: 'Falso'
  },
  {
    id: 14,
    tipo: 'verdadero_falso',
    pregunta: 'Los humanos tienen 4 pulmones.',
    correcta: 'Falso'
  },
  {
    id: 15,
    tipo: 'opcion_multiple',
    pregunta: '¿Cuántos planetas hay en el sistema solar?',
    opciones: ['7', '8', '9', '10'],
    correcta: '8'
  }
];


let respuestasUsuario = [];
let resultados = [];

// 📄 Ruta para obtener una pregunta aleatoria
app.get('/api/evaluar', (req, res) => {
  const pregunta = preguntas[Math.floor(Math.random() * preguntas.length)];
  res.json(pregunta);
});

// ✅ Ruta para recibir respuesta del usuario
app.post('/api/responder', (req, res) => {
  const { preguntaId, respuesta } = req.body;

  const pregunta = preguntas.find(p => p.id === preguntaId);
  if (!pregunta) return res.status(404).json({ mensaje: 'Pregunta no encontrada' });

  const esCorrecta = respuesta === pregunta.correcta;

  respuestasUsuario.push({ preguntaId, respuesta, esCorrecta });

  res.json({ esCorrecta });
});

// 🧾 Ruta para exportar resultados como PDF
app.get('/api/resultados/pdf', (req, res) => {
  const doc = new PDFDocument();
  const filename = `resultados-${Date.now()}.pdf`;

  res.setHeader('Content-disposition', `attachment; filename=${filename}`);
  res.setHeader('Content-type', 'application/pdf');

  doc.pipe(res);

  doc.fontSize(18).text('Resultados de la Evaluación', { align: 'center' });
  doc.moveDown();

  respuestasUsuario.forEach((r, index) => {
    const pregunta = preguntas.find(p => p.id === r.preguntaId);
    doc
      .fontSize(12)
      .text(
        `${index + 1}. ${pregunta.pregunta} \nRespuesta: ${r.respuesta} \nCorrecta: ${pregunta.correcta} \nResultado: ${r.esCorrecta ? '✅ Correcto' : '❌ Incorrecto'}\n`
      );
    doc.moveDown();
  });

  const puntaje = respuestasUsuario.filter(r => r.esCorrecta).length;
  doc.moveDown().fontSize(14).text(`Puntaje final: ${puntaje} / ${respuestasUsuario.length}`);

  doc.end();
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
