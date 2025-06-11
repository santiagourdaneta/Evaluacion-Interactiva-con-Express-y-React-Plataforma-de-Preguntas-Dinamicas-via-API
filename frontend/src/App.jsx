import React, { useState, useEffect } from 'react';

function App() {
  const [pregunta, setPregunta] = useState(null);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState('');
  const [resultadoActual, setResultadoActual] = useState(null);
  const [preguntasRespondidas, setPreguntasRespondidas] = useState(0);
  const [mostrarFinal, setMostrarFinal] = useState(false);

  useEffect(() => {
    obtenerPregunta();
  }, []);

  const obtenerPregunta = async () => {
    const res = await fetch('http://localhost:3001/api/evaluar');
    const data = await res.json();
    setPregunta(data);
    setRespuestaSeleccionada('');
    setResultadoActual(null);
  };

  const enviarRespuesta = async () => {
    if (!respuestaSeleccionada) return alert('Selecciona una respuesta');

    const res = await fetch('http://localhost:3001/api/responder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        preguntaId: pregunta.id,
        respuesta: respuestaSeleccionada,
      }),
    });

    const data = await res.json();
    setResultadoActual(data.esCorrecta ? '✅ Correcto' : '❌ Incorrecto');

    setTimeout(() => {
      const nuevasRespondidas = preguntasRespondidas + 1;
      setPreguntasRespondidas(nuevasRespondidas);

      if (nuevasRespondidas >= 5) {
        setMostrarFinal(true);
      } else {
        obtenerPregunta();
      }
    }, 1500);
  };

  const descargarPDF = () => {
    window.open('http://localhost:3001/api/resultados/pdf', '_blank');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Evaluación</h1>

      {!mostrarFinal && pregunta && (
        <div>
          <h2>{pregunta.pregunta}</h2>

          {pregunta.tipo === 'opcion_multiple' &&
            pregunta.opciones.map((op, i) => (
              <div key={i}>
                <label>
                  <input
                    type="radio"
                    name="respuesta"
                    value={op}
                    checked={respuestaSeleccionada === op}
                    onChange={() => setRespuestaSeleccionada(op)}
                  />
                  {op}
                </label>
              </div>
            ))}

          {pregunta.tipo === 'verdadero_falso' && (
            <>
              <label>
                <input
                  type="radio"
                  name="respuesta"
                  value="Verdadero"
                  checked={respuestaSeleccionada === 'Verdadero'}
                  onChange={() => setRespuestaSeleccionada('Verdadero')}
                />
                Verdadero
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="respuesta"
                  value="Falso"
                  checked={respuestaSeleccionada === 'Falso'}
                  onChange={() => setRespuestaSeleccionada('Falso')}
                />
                Falso
              </label>
            </>
          )}

          <br />
          <button onClick={enviarRespuesta}>Enviar</button>
          {resultadoActual && <p style={{ fontWeight: 'bold' }}>{resultadoActual}</p>}
        </div>
      )}

      {mostrarFinal && (
        <div>
          <h2>¡Evaluación terminada!</h2>
          <button onClick={descargarPDF}>Descargar PDF de resultados</button>
        </div>
      )}
    </div>
  );
}

export default App;
