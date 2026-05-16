import React, { useState } from 'react';
import { cuestionariosZero, tiposContenedores } from './data/circularData';
import { Egg, Package, GlassWater, FileText, Trash2, Radio, BookOpen, ChevronDown, ChevronUp, Ticket, ShoppingBag, Percent, Video, FileDown } from 'lucide-react';

// =================================================================
// COMPONENTE INTERNO: MAPA CIVIC
// =================================================================
function ModuloMapa() {
  const [esquinaActiva, setEsquinaActiva] = useState('ayuntamiento');
  
  const esquinasElda = {
    ayuntamiento: {
      nombre: "Plaza de la Constitución (Ayuntamiento)",
      estado: "Activa ahora",
      horario: "20:00 a 23:00",
      pureza: "94% (Excelente)",
      coordenadas: { x: '45%', y: '50%' }
    },
    castelar: {
      nombre: "Plaza Castelar (Centro Ciudad)",
      estado: "Disponible a las 20:00",
      horario: "20:00 a 23:00",
      pureza: "88% (Media)",
      coordenadas: { x: '55%', y: '35%' }
    },
    granAvenida: {
      nombre: "Gran Avenida / Av. de Ronda",
      estado: "Activa ahora",
      horario: "19:30 a 22:30",
      pureza: "91% (Alta)",
      coordenadas: { x: '30%', y: '65%' }
    }
  };

  const datosEsquina = esquinasElda[esquinaActiva];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', flexWrap: 'wrap', marginTop: '15px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {Object.keys(esquinasElda).map((key) => (
          <button
            key={key}
            onClick={() => setEsquinaActiva(key)}
            style={{
              padding: '12px',
              textAlign: 'left',
              borderRadius: '6px',
              border: esquinaActiva === key ? '2px solid #2E7D32' : '1px solid #ccc',
              backgroundColor: esquinaActiva === key ? '#E8F5E9' : '#fff',
              fontWeight: esquinaActiva === key ? 'bold' : 'normal',
              cursor: 'pointer'
            }}
          >
            📍 {esquinasElda[key].nombre}
          </button>
        ))}
        
        <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '6px', border: '1px solid #eee', marginTop: '10px' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#2E7D32' }}>{datosEsquina.nombre}</h4>
          <p style={{ margin: '4px 0' }}><strong>Estado:</strong> {datosEsquina.estado}</p>
          <p style={{ margin: '4px 0' }}><strong>Horario Recogida:</strong> {datosEsquina.horario}</p>
          <p style={{ margin: '4px 0' }}><strong>Pureza Acumulada:</strong> {datosEsquina.pureza}</p>
        </div>
      </div>

      <div style={{
        backgroundImage: "url('/media/mapa-elda.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '8px',
        border: '1px solid #B2DFDB',
        position: 'relative',
        minHeight: '260px',
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.15)'
      }}>
        <div style={{ 
          position: 'absolute', bottom: '10px', left: '10px', fontSize: '0.8rem', color: '#fff', fontWeight: 'bold',
          backgroundColor: 'rgba(46, 125, 50, 0.85)', padding: '4px 8px', borderRadius: '4px'
        }}>
          🗺️ Plano de Esquinas Activas - Elda
        </div>
        <div style={{
          position: 'absolute', top: datosEsquina.coordenadas.y, left: datosEsquina.coordenadas.x, transform: 'translate(-50%, -50%)',
          backgroundColor: '#d32f2f', color: 'white', padding: '6px 10px', borderRadius: '20px', fontSize: '0.8rem',
          fontWeight: 'bold', boxShadow: '0 4px 8px rgba(0,0,0,0.4)', whiteSpace: 'nowrap', transition: 'top 0.3s, left 0.3s', border: '2px solid white'
        }}>
          📍 Esquina Seleccionada
        </div>
      </div>
    </div>
  );
}

// =================================================================
// COMPONENTE INTERNO: CALENDARIO MONO-PRODUCTO
// =================================================================
function ModuloCalendario() {
  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const diaActualNombre = diasSemana[new Date().getDay()];
  let fraccionHoy = "Resto (Gris)";
  let infoAhorro = "Mantén la separación en origen para los días de alta pureza.";
  
  if (diaActualNombre === 'Lunes' || diaActualNombre === 'Miércoles' || diaActualNombre === 'Viernes') {
    fraccionHoy = "Materia Orgánica (Marrón)";
    infoAhorro = "🌱 ¡Día Clave! Separar esta fracción reduce el canon estatal y ahorra ~90€ por tonelada al municipio.";
  } else if (diaActualNombre === 'Martes') {
    fraccionHoy = "Envases Ligeros (Amarillo)";
    infoAhorro = "🍾 Maximiza la recuperación. Evita introducir impropios.";
  } else if (diaActualNombre === 'Jueves') {
    fraccionHoy = "Papel y Cartón (Azul)";
    infoAhorro = "📦 Recuerda plegar las cajas para optimizar el volumen del contenedor.";
  } else if (diaActualNombre === 'Sábado') {
    fraccionHoy = "Vidrio (Verde) / Descanso de Orgánica";
    infoAhorro = "♻️ España roza el 72% de reciclaje en vidrio. ¡Mantengamos el nivel en Elda!";
  }

  return (
    <div style={{ backgroundColor: '#E8F5E9', borderLeft: '5px solid #2E7D32', padding: '15px', borderRadius: '4px', marginTop: '15px' }}>
      <p style={{ margin: 0, fontSize: '1.1rem' }}>
        Hoy es <strong>{diaActualNombre}</strong>. Fracción prioritaria para depósito: <span style={{ color: '#2E7D32', fontWeight: 'bold' }}>{fraccionHoy}</span>.
      </p>
      <p style={{ margin: '8px 0 0 0', fontSize: '0.95rem', color: '#555', fontStyle: 'italic' }}>{infoAhorro}</p>
    </div>
  );
}

// =================================================================
// COMPONENTE INTERNO: CENTRO DE MULTIMEDIA E INFO (Hub de Recursos)
// =================================================================
function ModuloMultimedia() {
  const [acordeonAbierto, setAcordeonAbierto] = useState(null);

  const toggleAcordeon = (id) => {
    setAcordeonAbierto(acordeonAbierto === id ? null : id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* SECCIÓN AUDIO: PODCAST FORMATIVO */}
      <div style={{ backgroundColor: '#F1F8E9', padding: '20px', borderRadius: '10px', border: '1px solid #C5E1A5', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Radio size={24} color="#2E7D32" />
          <h3 style={{ margin: 0, color: '#1B5E20', fontSize: '1.15rem' }}>Audio: La Revolución del Ahorro Local</h3>
        </div>
        <p style={{ margin: 0, color: '#555', fontSize: '0.9rem' }}>
          Análisis profundo sobre el impacto del canon de la Ley 7/2022 y el balance de costes en el eje logístico Elda-Villena.
        </p>
        <audio controls style={{ width: '100%', marginTop: '5px' }}>
          <source src="/media/podcast-elda.m4a" type="audio/mp4" />
          Tu navegador no soporta la reproducción de audio nativa.
        </audio>
      </div>

      {/* SECCIÓN VIDEO: EXPLICATIVO ANIMADO */}
      <div style={{ backgroundColor: '#E3F2FD', padding: '20px', borderRadius: '10px', border: '1px solid #90CAF9', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Video size={24} color="#0D47A1" />
          <h3 style={{ margin: 0, color: '#0D47A1', fontSize: '1.15rem' }}>Vídeo: Concepto Vibe Boogie Pop</h3>
        </div>
        <p style={{ margin: 0, color: '#555', fontSize: '0.9rem' }}>
          Pieza audiovisual animada explicativa orientada a la ingeniería de residuo cero y la validación cívica.
        </p>
        <video controls style={{ width: '100%', borderRadius: '6px', backgroundColor: '#000', maxHeight: '220px' }}>
          <source src="/media/vibe-boogie-pop.mp4" type="video/mp4" />
          Tu navegador no soporta la reproducción de vídeo nativa.
        </video>
      </div>

      {/* SECCIÓN DOCUMENTOS Y CONTENEDORES DE EDIFICIO */}
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h3 style={{ margin: 0, color: '#333', fontSize: '1.15rem', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          📂 Presentaciones y Modelos Técnicos
        </h3>

        {/* Descarga del PDF de Estrategia */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '6px', border: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileDown size={22} color="#2E7D32" />
            <div>
              <strong style={{ display: 'block', color: '#333', fontSize: '0.95rem' }}>Elda_Circular_Strategy.pdf</strong>
              <span style={{ fontSize: '0.8rem', color: '#666' }}>Diapositivas y ruta del plan de gestión municipal.</span>
            </div>
          </div>
          <a 
            href="/media/Elda_Circular_Strategy.pdf" 
            download
            style={{ backgroundColor: '#2E7D32', color: '#fff', textDecoration: 'none', padding: '8px 12px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.8rem' }}
          >
            Descargar
          </a>
        </div>

        {/* Visualización del Contenedor de Edificio */}
        <div style={{ marginTop: '5px' }}>
          <strong style={{ display: 'block', marginBottom: '8px', color: '#333', fontSize: '0.95rem' }}>📦 Diseño de Contenedores Plegables para Edificios:</strong>
          <div style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid #ddd', backgroundColor: '#fafafa' }}>
            <img 
              src="/media/imagen-containers.jpeg" 
              alt="Diseño contenedores plegables edificios" 
              style={{ width: '100%', display: 'block', height: 'auto', maxHeight: '180px', objectFit: 'cover' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <p style={{ margin: '6px 0 0 0', fontSize: '0.8rem', color: '#666', fontStyle: 'italic' }}>
            Mobiliario adaptativo propuesto para rellanos y comunidades de vecinos privadas.
          </p>
        </div>
      </div>

      {/* SECCIÓN ACORDEONES INFORMATIVOS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h3 style={{ margin: '10px 0 5px 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
          <BookOpen size={20} /> Documentación de Consulta Rápida
        </h3>

        <div style={{ border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden' }}>
          <button 
            onClick={() => toggleAcordeon('pegatina')}
            style={{ width: '100%', padding: '15px', backgroundColor: '#fff', border: 'none', textAlign: 'left', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            🚨 El Sistema de la Pegatina Roja (Feedback Visual)
            {acordeonAbierto === 'pegatina' ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
          </button>
          {acordeonAbierto === 'pegatina' && (
            <div style={{ padding: '15px', backgroundColor: '#fafafa', borderTop: '1px solid #ddd', fontSize: '0.95rem', lineHeight: '1.5' }}>
              <p style={{ margin: '0 0 10px 0' }}>Para educar rápido sin aplicar sanciones directas, los operarios de Fobesa usan el etiquetado físico de error en bolsa:</p>
              <ul>
                <li><strong>Bolsa No Retirada:</strong> Si se saca una bolsa mezclada o el día incorrecto, el operario la deja en el gancho de fachada para evitar contaminar la carga del camión.</li>
                <li><strong>Efecto Social:</strong> La marca roja visible genera corresponsabilidad vecinal. El propietario debe reintroducir la bolsa y corregir su separación para el día siguiente.</li>
              </ul>
            </div>
          )}
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden' }}>
          <button 
            onClick={() => toggleAcordeon('rentabilidad')}
            style={{ width: '100%', padding: '15px', backgroundColor: '#fff', border: 'none', textAlign: 'left', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            📉 Balance Económico: Vertido vs Reciclaje
            {acordeonAbierto === 'rentabilidad' ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
          </button>
          {acordeonAbierto === 'rentabilidad' && (
            <div style={{ padding: '15px', backgroundColor: '#fafafa', borderTop: '1px solid #ddd', fontSize: '0.95rem' }}>
              <p style={{ margin: '0 0 10px 0' }}>Costes operativos reales comparados en el vertedero de los Tercios (Villena):</p>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '5px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#eee', textAlign: 'left' }}>
                    <th style={{ padding: '6px' }}>Fracción</th>
                    <th style={{ padding: '6px' }}>Coste de Vertido</th>
                    <th style={{ padding: '6px' }}>Impacto Neto</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '6px', borderBottom: '1px solid #eee' }}>🔘 Resto (Gris)</td>
                    <td style={{ padding: '6px', borderBottom: '1px solid #eee' }}>~125€ / tonelada</td>
                    <td style={{ padding: '6px', borderBottom: '1px solid #eee', color: '#c62828', fontWeight: 'bold' }}>Pérdida Total</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px', borderBottom: '1px solid #eee' }}>🟤 Orgánica (Marrón)</td>
                    <td style={{ padding: '6px', borderBottom: '1px solid #eee' }}>~38,62€ / tratamiento</td>
                    <td style={{ padding: '6px', borderBottom: '1px solid #eee', color: '#2e7d32', fontWeight: 'bold' }}>+51,38€ Ahorro</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px', borderBottom: '1px solid #eee' }}>🟡 Envases / Papel</td>
                    <td style={{ padding: '6px', borderBottom: '1px solid #eee' }}>0€ Tasa Reducida</td>
                    <td style={{ padding: '6px', borderBottom: '1px solid #eee', color: '#2e7d32', fontWeight: 'bold' }}>+130€ Retorno Neto</td>
                  </tr>
                </tbody>
              </table>
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
  const [eldaCoins, setEldaCoins] = useState(() => {
    const guardadas = localStorage.getItem('eldaCoins');
    return guardadas ? parseInt(guardadas, 10) : 0;
  });

  const catalogoPremios = [
    { id: 'tasa', nombre: 'Descuento en Tasa de Basuras', coste: 150, icono: Percent, detalle: 'Rebaja directa de 10€ en el próximo recibo de gestión municipal.' },
    { id: 'teatro', nombre: 'Entrada Teatro Castelar', coste: 100, icono: Ticket, detalle: 'Un acceso gratuito para cualquier obra del primer semestre de la agenda cultural.' },
    { id: 'comercio', nombre: 'Vale 5€ Comercio Local', coste: 75, icono: ShoppingBag, detalle: 'Canjeable en establecimientos adheridos (Sibuya, Delito Burger, etc.).' }
  ];

  const procesarCanje = (premio) => {
    if (eldaCoins >= premio.coste) {
      const nuevoBalance = eldaCoins - premio.coste;
      setEldaCoins(nuevoBalance);
      localStorage.setItem('eldaCoins', nuevoBalance);
      alert(`🎉 ¡Canje realizado con éxito!\nHas adquirido: "${premio.nombre}".\nSe te ha enviado el código digital a tu carnet ciudadano.`);
    } else {
      alert(`⚠️ Saldo insuficiente.\nNecesitas ${premio.coste} Elda-Coins (tienes ${eldaCoins}).\nSigue separando bien tus bolsas marrones y amarillas para sumar puntos.`);
    }
  };

  return (
    <div style={{
      fontFamily: 'system-ui, sans-serif',
      padding: '20px',
      backgroundColor: '#f4f6f8',
      minHeight: '100vh',
      color: '#333',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      {/* Cabecera del Civic OS */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '2px solid #ddd',
        paddingBottom: '15px',
        marginBottom: '20px'
      }}>
        <div>
          <h1 style={{ margin: 0, color: '#2E7D32' }}>Elda Circular Civic OS</h1>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>Gestión de Residuos y Sostenibilidad Municipal</p>
        </div>
        <div style={{
          backgroundColor: '#FFF9C4',
          border: '1px solid #FBC02D',
          padding: '10px 15px',
          borderRadius: '8px',
          fontWeight: 'bold'
        }}>
          🪙 {eldaCoins} Elda-Coins
        </div>
      </header>

      {/* Contenido Dinámico según la pestaña activa */}
      <main style={{ marginBottom: '80px' }}>
        
        {pestanaActiva === 'mapa' && (
          <>
            <section style={{ marginBottom: '30px' }}>
              <h2>Esquinas de Quita y Pon (Contenedores)</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '15px' }}>
                {tiposContenedores.map((cont) => {
                  let IconoComponente = Trash2;
                  if (cont.icono === 'Egg') IconoComponente = Egg;
                  if (cont.icono === 'Package') IconoComponente = Package;
                  if (cont.icono === 'GlassWater') IconoComponente = GlassWater;
                  if (cont.icono === 'FileText') IconoComponente = FileText;

                  return (
                    <div key={cont.id} style={{
                      backgroundColor: cont.color,
                      color: '#fff',
                      padding: '25px 20px',
                      borderRadius: '12px',
                      textAlign: 'center',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      fontWeight: 'bold',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <IconoComponente size={36} strokeWidth={2.5} />
                      <span>{cont.nombre}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginTop: '25px' }}>
              <h2>Mapa Civic: Esquinas de Quita y Pon</h2>
              <p style={{ color: '#666' }}>Selecciona una zona de Elda para verificar los horarios de recogida y la ubicación exacta del punto limpio móvil.</p>
              <ModuloMapa />
            </section>

            <section style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginTop: '25px' }}>
              <h2>Calendario de Recogida Mono-producto</h2>
              <p style={{ color: '#666' }}>Consulta qué residuo se recoge hoy en Elda para planificar tu reciclaje de forma eficiente.</p>
              <ModuloCalendario />
            </section>
          </>
        )}

        {pestanaActiva === 'depositos' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <section style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <h2>Módulo de Trazabilidad y Validation (Simulador QR)</h2>
              <p style={{ color: '#666' }}>Selecciona un contenedor e indica qué residuo vas a depositar para comprobar su pureza.</p>
              <div style={{ display: 'flex', gap: '15px', flexDirection: 'column', maxWidth: '500px', marginTop: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>1. Escanear Contenedor Destino:</label>
                  <select id="selectContenedor" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                    {tiposContenedores.map(c => (
                      <option key={c.id} value={c.id}>{c.nombre}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>2. Residuo a depositar:</label>
                  <select id="selectResiduo" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                    <option value="correcto">Residuo correcto y bien separado</option>
                    <option value="impropio">Impropio (Mezclar plástico/botes en orgánica o resto)</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    const contenedor = document.getElementById('selectContenedor').value;
                    const residuo = document.getElementById('selectResiduo').value;

                    if (residuo === 'correcto') {
                      const puntosPremio = 15;
                      const nuevasMonedas = eldaCoins + puntosPremio;
                      setEldaCoins(nuevasMonedas);
                      localStorage.setItem('eldaCoins', nuevasMonedas);
                      alert(`¡Depósito validado! Pureza excelente en contenedor de ${contenedor}. Has ganado ${puntosPremio} Elda-Coins 🪙.`);
                    } else {
                      alert(`⚠️ ¡PEGATINA ROJA! Incidencia registrada. Has intentado depositar un impropio en el contenedor de ${contenedor}. Revisa el manual para evitar penalizaciones en el canon municipal.`);
                    }
                  }}
                  style={{ backgroundColor: '#2E7D32', color: 'white', padding: '12px', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
                >
                  Simular Validación de Depósito (QR)
                </button>
              </div>
            </section>

            <section style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <h2>Centro de Canje Ciudadano 🛍️</h2>
              <p style={{ color: '#666', marginBottom: '20px' }}>Intercambia tus Elda-Coins por incentivos fiscales, cultura o ventajas en el comercio local de la ciudad.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
                {catalogoPremios.map((premio) => {
                  const IconoPremio = premio.icono;
                  return (
                    <div key={premio.id} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '8px', backgroundColor: '#fdfdfd', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2E7D32', fontWeight: 'bold', marginBottom: '5px' }}>
                          <IconoPremio size={20} />
                          <span>{premio.nombre}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', lineHeight: '1.4' }}>{premio.detalle}</p>
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', borderTop: '1px solid #f5f5f5', paddingTop: '10px' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#E65100' }}>🪙 {premio.coste} Coins</span>
                        <button 
                          onClick={() => procesarCanje(premio)}
                          style={{ backgroundColor: eldaCoins >= premio.coste ? '#2E7D32' : '#ccc', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.85rem', cursor: eldaCoins >= premio.coste ? 'pointer' : 'not-allowed' }}
                        >
                          Canjear
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {pestanaActiva === 'educacion' && (
          <section style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h2>Educación Z-ero: Nivel Primaria</h2>
            <p style={{ color: '#666', marginBottom: '15px' }}>Responde correctamente para sumar méritos a tu cuenta cívica.</p>
            {cuestionariosZero.primaria.map((quiz) => (
              <div key={quiz.id} style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
                <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>{quiz.pregunta}</p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
                  {quiz.opciones.map((opcion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (index === quiz.correcta) {
                          const nuevasMonedas = eldaCoins + quiz.puntos;
                          setEldaCoins(nuevasMonedas);
                          localStorage.setItem('eldaCoins', nuevasMonedas);
                          alert(`¡Correcto! Has ganado ${quiz.puntos} Elda-Coins 🪙`);
                        } else {
                          alert('Respuesta incorrecta. ¡Sigue aprendiendo con el Plan Maestro!');
                        }
                      }}
                      style={{ padding: '10px 15px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff', cursor: 'pointer' }}
                    >
                      {opcion}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {pestanaActiva === 'multimedia' && (
          <section style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h2>Centro de Divulgación y Medios</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>Materiales formativos e informes interactivos del Plan Maestro Elda Circular.</p>
            <ModuloMultimedia />
          </section>
        )}

      </main>

      {/* Barra de Navegación Inferior Fija (4 BOTONES - INTEGRACIÓN TOTAL) */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', borderTop: '1px solid #ddd',
        display: 'flex', justifyContent: 'space-around', padding: '15px 0', boxShadow: '0 -2px 10px rgba(0,0,0,0.05)', zIndex: 1000
      }}>
        <button onClick={() => setPestanaActiva('mapa')} style={{ background: 'none', border: 'none', color: pestanaActiva === 'mapa' ? '#2E7D32' : '#666', fontWeight: pestanaActiva === 'mapa' ? 'bold' : 'normal', cursor: 'pointer', fontSize: '0.95rem' }}>📍 Mapa</button>
        <button onClick={() => setPestanaActiva('depositos')} style={{ background: 'none', border: 'none', color: pestanaActiva === 'depositos' ? '#2E7D32' : '#666', fontWeight: pestanaActiva === 'depositos' ? 'bold' : 'normal', cursor: 'pointer', fontSize: '0.95rem' }}>♻️ QR y Canje</button>
        <button onClick={() => setPestanaActiva('educacion')} style={{ background: 'none', border: 'none', color: pestanaActiva === 'educacion' ? '#2E7D32' : '#666', fontWeight: pestanaActiva === 'educacion' ? 'bold' : 'normal', cursor: 'pointer', fontSize: '0.95rem' }}>🎓 Aula</button>
        <button onClick={() => setPestanaActiva('multimedia')} style={{ background: 'none', border: 'none', color: pestanaActiva === 'multimedia' ? '#2E7D32' : '#666', fontWeight: pestanaActiva === 'multimedia' ? 'bold' : 'normal', cursor: 'pointer', fontSize: '0.95rem' }}>📻 Medios</button>
      </nav>

    </div>
  );
}