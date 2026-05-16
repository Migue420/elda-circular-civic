import React, { useState } from 'react';
import { cuestionariosZero, tiposContenedores } from './data/circularData';
import { Trash2, Radio, BookOpen, ChevronDown, ChevronUp, Ticket, ShoppingBag, Percent, Video, Menu } from 'lucide-react';

// URL de tu servidor local XAMPP para la sincronización futura
const API_URL = "http://localhost/elda-circular-api";

// =================================================================
// COMPONENTE INTERNO: MAPA CIVIC
// =================================================================
function ModuloMapa() {
  const [esquinaActiva, setEsquinaActiva] = useState('ayuntamiento');
  
  const esquinasElda = {
    ayuntamiento: { nombre: "Plaza de la Constitución (Ayuntamiento)", estado: "Activa ahora", horario: "20:00 a 23:00", pureza: "94%", coordenadas: { x: '45%', y: '50%' } },
    castelar: { nombre: "Plaza Castelar (Centro Ciudad)", estado: "Disponible a las 20:00", horario: "20:00 a 23:00", pureza: "88%", coordenadas: { x: '55%', y: '35%' } },
    granAvenida: { nombre: "Gran Avenida / Av. de Ronda", estado: "Activa ahora", horario: "19:30 a 22:30", pureza: "91%", coordenadas: { x: '30%', y: '65%' } }
  };

  const datosEsquina = esquinasElda[esquinaActiva];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '15px' }}>
      {/* MITAD SUPERIOR: LO VISUAL (EL MAPA 16:9) */}
      <div style={{
        flex: 1, minHeight: '220px', backgroundImage: "url('/media/mapa-elda.png')",
        backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '12px',
        border: '1px solid #B2DFDB', position: 'relative', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          position: 'absolute', top: datosEsquina.coordenadas.y, left: datosEsquina.coordenadas.x, transform: 'translate(-50%, -50%)',
          backgroundColor: '#d32f2f', color: 'white', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem',
          fontWeight: 'bold', boxShadow: '0 4px 8px rgba(0,0,0,0.3)', border: '2px solid white', whiteSpace: 'nowrap'
        }}>
          📍 {datosEsquina.nombre.split(' ')[0]}
        </div>
      </div>

      {/* MITAD INFERIOR: CONTROLES Y SELECCIÓN */}
      <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#2E7D32' }}>Seleccionar Punto de Control Municipal:</label>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '5px' }}>
          {Object.keys(esquinasElda).map((key) => (
            <button
              key={key}
              onClick={() => setEsquinaActiva(key)}
              style={{
                padding: '10px 16px', borderRadius: '8px',
                border: esquinaActiva === key ? '2px solid #2E7D32' : '1px solid #ccc',
                backgroundColor: esquinaActiva === key ? '#E8F5E9' : '#fff',
                fontWeight: esquinaActiva === key ? 'bold' : 'normal', cursor: 'pointer', whiteSpace: 'nowrap'
              }}
            >
              📍 {esquinasElda[key].nombre.split(' ')[0]}
            </button>
          ))}
        </div>
        <div style={{ marginTop: '12px', fontSize: '0.9rem', color: '#4a5568', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <p style={{ margin: 0 }}><strong>Estado:</strong> {datosEsquina.estado}</p>
          <p style={{ margin: 0 }}><strong>Horario:</strong> {datosEsquina.horario}</p>
          <p style={{ margin: 0, gridColumn: '1 / span 2' }}><strong>Pureza Acumulada Barrio:</strong> {datosEsquina.pureza}</p>
        </div>
      </div>
    </div>
  );
}

// =================================================================
// COMPONENTE INTERNO: CENTRO DE MULTIMEDIA E INFO (Hub de Recursos)
// =================================================================
function ModuloMultimedia() {
  const [acordeonAbierto, setAcordeonAbierto] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* MITAD SUPERIOR: LO VISUAL (EL REPRODUCTOR DE VÍDEO 16:9) */}
      <div style={{ backgroundColor: '#000', borderRadius: '12px', overflow: 'hidden', aspectRatio: '16/9', maxHeight: '300px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <video controls style={{ width: '100%', height: '100%', objectFit: 'contain' }}>
          <source src="/media/vibe-boogie-pop.mp4" type="video/mp4" />
        </video>
      </div>

      {/* MITAD INFERIOR: CONTROLES AUDIO E INFORMES */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ backgroundColor: '#F1F8E9', padding: '15px', borderRadius: '12px', border: '1px solid #C5E1A5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Radio size={20} color="#2E7D32" />
            <strong style={{ color: '#1B5E20' }}>Podcast: Ley 7/2022 Local</strong>
          </div>
          <audio controls style={{ width: '100%' }}>
            <source src="/media/podcast-elda.m4a" type="audio/mp4" />
          </audio>
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
          <button onClick={() => setAcordeonAbierto(acordeonAbierto === 'inf' ? null : 'inf')} style={{ width: '100%', padding: '12px 15px', backgroundColor: '#fff', border: 'none', textAlign: 'left', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
            📉 Balance de Tasa por Vertido (Villena Tercios)
            <span>{acordeonAbierto === 'inf' ? '▲' : '▼'}</span>
          </button>
          {acordeonAbierto === 'inf' && (
            <div style={{ padding: '12px', backgroundColor: '#fafafa', borderTop: '1px solid #ddd', fontSize: '0.85rem' }}>
              Orgánica: ~38,62€/Tratamiento (Ahorro directo de +51,38€/Tn frente a la tasa de rechazo gris de 125€/Tn).
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =================================================================
// COMPONENTE PRINCIPAL (APPLICATION MASTER)
// =================================================================
export default function App() {
  const [pestanaActiva, setPestanaActiva] = useState('mapa');
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [slideIndice, setSlideIndice] = useState(0);
  const [eldaCoins, setEldaCoins] = useState(() => {
    const guardadas = localStorage.getItem('eldaCoins');
    return guardadas ? parseInt(guardadas, 10) : 120;
  });

  const titulosSlides = [
    "Slide 01: Marco Estratégico Municipal", "Slide 02: Logística de Quita y Pon",
    "Slide 03: Optimización Logística Fobesa", "Slide 04: Control Catastral de Residuos",
    "Slide 05: Cumplimiento de la Ley 7/2022", "Slide 06: Algoritmo de Emisión Elda-Coins",
    "Slide 07: Red de Alta Pureza de Biorresiduos", "Slide 08: Sincronización SDR con XAMPP",
    "Slide 09: Concienciación Escolar Activa", "Slide 10: Auditoría Final de Superávit"
  ];

  const catalogoPremios = [
    { id: 'teatro', nombre: 'Entrada Teatro Castelar', coste: 100, icono: Ticket },
    { id: 'comercio', nombre: 'Vale Comercio Local 5€', coste: 75, icono: ShoppingBag },
    { id: 'tasa', nombre: 'Descuento 20€ Tasa Basura', coste: 150, icono: Percent }
  ];

  const formatearSlide = (idx) => {
    const n = idx + 1;
    return n < 10 ? `0${n}` : `${n}`;
  };

  // Función preparada para enviar datos a la base de datos local de XAMPP
  const enviarDatosAXampp = async (accion, datos) => {
    try {
      await fetch(`${API_URL}/guardar_registro.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accion, datos, fecha: new Date().toISOString() })
      });
    } catch (err) {
      console.log("Modo offline: Datos respaldados temporalmente en LocalStorage.");
    }
  };

  const ejecutarCanje = (premio) => {
    if (eldaCoins >= premio.coste) {
      const nuevoSaldo = eldaCoins - premio.coste;
      setEldaCoins(nuevoSaldo);
      localStorage.setItem('eldaCoins', nuevoSaldo);
      enviarDatosAXampp('canje_premio', premio);
      alert(`🎉 Canje correcto: "${premio.nombre}"`);
    } else {
      alert("⚠️ Saldo insuficiente.");
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh', paddingBottom: '40px' }}>
      
      {/* MENÚ SUPERIOR DESPLEGABLE */}
      <header style={{
        backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', padding: '14px 20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 1100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            onClick={() => setMenuAbierto(!menuAbierto)} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
          >
            <Menu size={24} color="#2E7D32" />
          </button>
          <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#2E7D32' }}>Elda Circular Civic OS</span>
        </div>
        
        <div style={{ backgroundColor: '#FFF9C4', border: '1px solid #FBC02D', padding: '5px 12px', borderRadius: '15px', fontWeight: 'bold', fontSize: '0.85rem' }}>
          🪙 {eldaCoins} Coins
        </div>

        {/* Listado Desplegable del Menú */}
        {menuAbierto && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#fff',
            borderBottom: '2px solid #2E7D32', boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            display: 'flex', flexDirection: 'column', zIndex: 1200
          }}>
            <button onClick={() => { setPestanaActiva('mapa'); setMenuAbierto(false); }} style={{ padding: '15px 20px', textAlignment: 'left', background: 'none', border: 'none', borderBottom: '1px solid #eee', cursor: 'pointer', fontWeight: pestanaActiva === 'mapa' ? 'bold' : 'normal', color: '#333' }}>📍 Presentación y Callejero Adaptive</button>
            <button onClick={() => { setPestanaActiva('depositos'); setMenuAbierto(false); }} style={{ padding: '15px 20px', textAlignment: 'left', background: 'none', border: 'none', borderBottom: '1px solid #eee', cursor: 'pointer', fontWeight: pestanaActiva === 'depositos' ? 'bold' : 'normal', color: '#333' }}>♻️ Validación QR e Incidencias</button>
            <button onClick={() => { setPestanaActiva('educacion'); setMenuAbierto(false); }} style={{ padding: '15px 20px', textAlignment: 'left', background: 'none', border: 'none', borderBottom: '1px solid #eee', cursor: 'pointer', fontWeight: pestanaActiva === 'educacion' ? 'bold' : 'normal', color: '#333' }}>🎓 Aula e Ingeniería Social</button>
            <button onClick={() => { setPestanaActiva('multimedia'); setMenuAbierto(false); }} style={{ padding: '15px 20px', textAlignment: 'left', background: 'none', border: 'none', cursor: 'pointer', fontWeight: pestanaActiva === 'multimedia' ? 'bold' : 'normal', color: '#333' }}>📻 Hub de Medios e Informes</button>
          </div>
        )}
      </header>

      {/* CONTENIDO PRINCIPAL CON ESTRUCTURA HORIZONTAL SPLIT */}
      <main style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 15px' }}>
        
        {pestanaActiva === 'mapa' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            
            {/* BLOQUE SUPERIOR: EL GRAN SLIDESHOW 16:9 */}
            <section style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              {/* Contenedor Visual con Aspect Ratio Fijo 16:9 */}
              <div style={{
                width: '100%', aspectRatio: '16/9', borderRadius: '10px', overflow: 'hidden',
                backgroundColor: '#eaeaea', position: 'relative', border: '1px solid #edf2f7'
              }}>
                <img 
                  src={`/media/slide${formatearSlide(slideIndice)}.jpg`}
                  alt={`Slide ${slideIndice + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                  onError={(e) => { e.target.style.opacity = '0.4'; }}
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(26, 32, 44, 0.85)', color: '#fff', padding: '12px', textAlign: 'center', fontSize: '0.85rem' }}>
                  <strong>{titulosSlides[slideIndice]}</strong> | Plan Maestro 2026 Elda Circular
                </div>
              </div>

              {/* Botones de control del Slideshow */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                <button onClick={() => setSlideIndice((prev) => (prev - 1 + 10) % 10)} style={{ backgroundColor: '#edf2f7', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>◀ Anterior</button>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#4a5568' }}>{slideIndice + 1} / 10</span>
                <button onClick={() => setSlideIndice((prev) => (prev + 1) % 10)} style={{ backgroundColor: '#2E7D32', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Siguiente ▶</button>
              </div>
            </section>

            {/* BLOQUE INFERIOR: CALLEJERO Y PREMIOS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', flexWrap: 'wrap' }}>
              <section style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.05rem' }}>📍 Distribución de Esquinas de Quita y Pon</h3>
                <ModuloMapa />
              </section>

              <section style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '1.05rem' }}>🛍️ Canje de Incentivos Locales (XAMPP Sincronizado)</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {catalogoPremios.map((p) => (
                    <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#f7fafc', borderRadius: '8px', border: '1px solid #edf2f7' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{p.nombre}</span>
                      <button onClick={() => ejecutarCanje(p)} style={{ backgroundColor: eldaCoins >= p.coste ? '#2E7D32' : '#cbd5e0', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer' }}>
                        {p.coste} 🪙
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>

          </div>
        )}

        {/* MODULO QR: HORIZONTAL SPLIT */}
        {pestanaActiva === 'depositos' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* ARRIBA: LO VISUAL */}
            <div style={{ backgroundColor: '#E8F5E9', padding: '30px', borderRadius: '12px', textAlign: 'center', border: '1px dashed #2E7D32' }}>
              <h3 style={{ color: '#1B5E20', margin: '0 0 8px 0' }}>📷 Sensor de Escaneo y Validación Activo</h3>
              <p style={{ margin: 0, color: '#555', fontSize: '0.9rem' }}>Apunta con el lector de la PWA al código QR oficial impreso en tu bolsa de orgánica o envases.</p>
            </div>
            {/* ABAJO: EL FORMULARIO */}
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>1. Tipo de Fracción Ofertada:</label>
              <select id="selectContenedor" style={{ width: '100%', padding: '10px', borderRadius: '6px', marginBottom: '15px', border: '1px solid #ccc' }}>
                {tiposContenedores.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>2. Estado de Separación LER:</label>
              <select id="selectResiduo" style={{ width: '100%', padding: '10px', borderRadius: '6px', marginBottom: '15px', border: '1px solid #ccc' }}>
                <option value="correcto">Depósito limpio (Sin impropios)</option>
                <option value="impropio">Contaminado (Activa Pegatina Roja)</option>
              </select>
              <button onClick={() => {
                const res = document.getElementById('selectResiduo').value;
                if (res === 'correcto') {
                  setEldaCoins(p => p + 15);
                  enviarDatosAXampp('deposito_qr', { estado: 'valido' });
                  alert("Validación correcta. +15 Coins");
                } else {
                  alert("⚠️ INCIDENCIA RECOLECTADA: Pegatina Roja fijada.");
                }
              }} style={{ width: '100%', backgroundColor: '#2E7D32', color: '#fff', padding: '12px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                Simular Trazabilidad en Origen
              </button>
            </div>
          </div>
        )}

        {/* MODULO AULA: HORIZONTAL SPLIT */}
        {pestanaActiva === 'educacion' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* ARRIBA: LO VISUAL */}
            <div style={{ backgroundColor: '#E3F2FD', padding: '25px', borderRadius: '12px', textAlign: 'center', border: '1px solid #90CAF9' }}>
              <h3 style={{ margin: '0 0 6px 0', color: '#0D47A1' }}>🎓 Aula de Formación Gen Z-ero</h3>
              <p style={{ margin: 0, color: '#444', fontSize: '0.9rem' }}>Completa los retos semanales para incrementar el balance de tu carnet digital familiar.</p>
            </div>
            {/* ABAJO: EL FORMULARIO */}
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
              {cuestionariosZero.primaria.map((quiz) => (
                <div key={quiz.id} style={{ marginBottom: '15px' }}>
                  <strong style={{ display: 'block', marginBottom: '8px' }}>{quiz.pregunta}</strong>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {quiz.opciones.map((op, i) => (
                      <button key={i} onClick={() => {
                        if (i === quiz.correcta) { alert("¡Correcto!"); enviarDatosAXampp('quiz_acierto', { quizId: quiz.id }); }
                        else { alert("Incorrecto."); }
                      }} style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px', backgroundColor: '#fff', cursor: 'pointer', fontSize: '0.85rem' }}>{op}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULO MULTIMEDIA */}
        {pestanaActiva === 'multimedia' && (
          <section style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
            <ModuloMultimedia />
          </section>
        )}

      </main>

    </div>
  );
}