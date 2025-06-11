import { useState } from 'react';

const preguntas = [
  {
    id: 1,
    tipo: 'multiple',
    pregunta: '¿Cuál es la capital de Francia?',
    opciones: ['Madrid', 'París', 'Roma', 'Londres'],
    correcta: 'París'
  },
  {
    id: 2,
    tipo: 'vf',
    pregunta: 'El sol es un planeta.',
    opciones: ['Verdadero', 'Falso'],
    correcta: 'Falso'
  }
];

export default function Evaluar() {
  const [indice, setIndice] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [terminado, setTerminado] = useState(false);

  const preguntaActual = preguntas[indice];

  const responder = (opcion) => {
    const esCorrecta = opcion === preguntaActual.correcta;
    setRespuestas([...respuestas, { ...preguntaActual, seleccionada: opcion, esCorrecta }]);

    if (indice + 1 < preguntas.length) {
      setIndice(indice + 1);
    } else {
      setTerminado(true);
    }
  };

  if (terminado) {
    return (
      <div>
        <h2>Evaluación finalizada</h2>
        <a href="/resultados">Ver resultados</a>
      </div>
    );
  }

  return (
    <div>
      <h2>{preguntaActual.pregunta}</h2>
      {preguntaActual.opciones.map((opcion, i) => (
        <button key={i} onClick={() => responder(opcion)}>{opcion}</button>
      ))}
    </div>
  );
}
