import React, { useState, useEffect } from 'react';
import { cuestionariosZero, tiposContenedores } from './data/circularData';
import { Trash2, Radio, BookOpen, ChevronDown, ChevronUp, Ticket, ShoppingBag, Percent, Video, Menu, MapPin, CheckCircle, Play, Pause, Camera, Clock, RefreshCw } from 'lucide-react';

// Endpoint local de tu servidor XAMPP (Apache + MySQL)
const XAMPP_API_URL = "http://localhost/elda-circular-api";

// =================================================================
// COMPONENTE INTERNO: MAPA CIVIC (Pantalla Partida Horizontal)
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
      <div style={{
        width: '100%', aspectRatio: '16/9', backgroundImage: "url('/media/mapa-elda.png')",
        backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '14px',
        border: '1px solid #B2DFDB', position: 'relative', boxShadow: 'inset 0 0 12px rgba(0,0,0,0.12)'
      }}>
        <div style={{
          position: 'absolute', top: datosEsquina.coordenadas.y, left: datosEsquina.coordenadas.x, transform: 'translate(-50%, -50%)',
          backgroundColor: '#d32f2f', color: 'white', padding: '8px 14px', borderRadius: '20px', fontSize: '0.8rem',
          fontWeight: 'bold', boxShadow: '0 4px 8px rgba(0,0,0,0.3)', border: '2px solid white', whiteSpace: 'nowrap'
        }}>
          📍 {datosEsquina.nombre.split(' ')[0]}
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px', color: '#2E7D32', fontSize: '0.95rem' }}>🌐 Seleccionar Punto de Monitorización:</label>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px' }}>
          {Object.keys(esquinasElda).map((key) => (
            <button
              key={key}
              onClick={() => setEsquinaActiva(key)}
              style={{
                padding: '12px 18px', borderRadius: '8px',
                border: esquinaActiva === key ? '2px solid #2E7D32' : '1px solid #cbd5e0',
                backgroundColor: esquinaActiva === key ? '#E8F5E9' : '#fff',
                fontWeight: esquinaActiva === key ? 'bold' : 'normal', cursor: 'pointer', whiteSpace: 'nowrap'
              }}
            >
              Esquina {esquinasElda[key].nombre.split(' ')[0]}
            </button>
          ))}
        </div>
        <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #f0f4f8', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.9rem', color: '#4a5568' }}>
          <p style={{ margin: 0 }}><strong>Ubicación Completa:</strong> {datosEsquina.nombre}</p>
          <p style={{ margin: 0 }}><strong>Horario Operativo:</strong> {datosEsquina.horario}</p>
          <p style={{ margin: 0 }}><strong>Estado del Sensor:</strong> <span style={{ color: '#2E7D32', fontWeight: 'bold' }}>{datosEsquina.estado}</span></p>
          <p style={{ margin: 0 }}><strong>Pureza LER Acumulada:</strong> <span style={{ color: '#E65100', fontWeight: 'bold' }}>{datosEsquina.pureza}</span></p>
        </div>
      </div>
    </div>
  );
}

// =================================================================
// COMPONENTE INTERNO: HUB MULTIMEDIA (Pantalla Partida Horizontal)
// =================================================================
function ModuloMultimedia() {
  const [acordeonAbierto, setAcordeonAbierto] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
      <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#000', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }}>
        <video controls style={{ width: '100%', height: '100%', objectFit: 'contain' }}>
          <source src="/media/vibe-boogie-pop.mp4" type="video/mp4" />
        </video>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ backgroundColor: '#F1F8E9', padding: '18px', borderRadius: '14px', border: '1px solid #C5E1A5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Radio size={22} color="#2E7D32" />
            <strong style={{ color: '#1B5E20', fontSize: '0.95rem' }}>Podcast Técnico: Análisis Eje Elda-Villena</strong>
          </div>
          <audio controls style={{ width: '100%' }}>
            <source src="/media/podcast-elda.m4a" type="audio/mp4" />
          </audio>
        </div>

        <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#fff' }}>
          <button 
            onClick={() => setAcordeonAbierto(acordeonAbierto === 'rent' ? null : 'rent')} 
            style={{ width: '100%', padding: '14px 18px', backgroundColor: '#fff', border: 'none', textAlign: 'left', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', color: '#2d3748' }}
          >
            📉 Balance de Ahorro Neto por Canon Estatal (Ley 7/2022)
            <span>{acordeonAbierto === 'rent' ? '▲' : '▼'}</span>
          </button>
          {acordeonAbierto === 'rent' && (
            <div style={{ padding: '15px', backgroundColor: '#fafafa', borderTop: '1px solid #e2e8f0', fontSize: '0.85rem', lineHeight: '1.5', color: '#4a5568' }}>
              <strong>Materia Orgánica (Contenedor Marrón):</strong> Coste en planta de ~38,62€/Tratamiento. Al evitar la mezcla en la fracción Resto (cuya penalización es de 125€/Tn), se inyecta un superávit logístico directo de <strong>+51,38€ por tonelada</strong> recuperada.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =================================================================
// COMPONENTE INTERNO: INTERCAMBIO DE ENSERES (NUEVO MÓDULO)
// =================================================================
function ModuloEnseres({ sincronizarConXampp }) {
  // Base de datos local mockeada para los enseres activos en Elda
  const [anuncios, setAnuncios] = useState([
    { id: 1, titulo: "Silla de escritorio ergonómica", barrio: "San Francisco de Sales", fecha: Date.now() - 3600000 * 12, imagen: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=500&auto=format&fit=crop&q=60" },
    { id: 2, titulo: "Mesa de centro de salón (Madera)", barrio: "Plaza Castelar", fecha: Date.now() - 3600000 * 30, imagen: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=500&auto=format&fit=crop&q=60" }
  ]);

  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevoBarrio, setNuevoBarrio] = useState('Centro');
  const [imagenSimulada, setImagenSimulada] = useState('');

  // Función para capturar o simular la foto del mueble/ensere
  const manejarFotoSimulada = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const urlImagen = URL.createObjectURL(archivo);
      setImagenSimulada(urlImagen);
    }
  };

  const registrarAnuncio = (e) => {
    e.preventDefault();
    if (!nuevoTitulo) {
      alert("Por favor, introduce una breve descripción del objeto.");
      return;
    }

    const nuevoItem = {
      id: Date.now(),
      titulo: nuevoTitulo,
      barrio: nuevoBarrio,
      fecha: Date.now(), // Marca de tiempo actual para arrancar el reloj de 72 horas
      imagen: imagenSimulada || "https://images.unsplash.com/photo-1581428982868-e410dd047a90?w=500&auto=format&fit=crop&q=60"
    };

    const listaActualizada = [nuevoItem, ...anuncios];
    setAnuncios(listaActualizada);
    sincronizarConXampp('registrar_ensere_tablon', nuevoItem);

    // Resetear formulario
    setNuevoTitulo('');
    setImagenSimulada('');
    alert("🎉 ¡Anuncio publicado! Estará visible en el tablón durante las próximas 72 horas.");
  };

  // Función auxiliar para renderizar el tiempo de vida restante exacto
  const calcularTiempoRestante = (fechaRegistro) => {
    const setentaIDosHorasMs = 72 * 60 * 60 * 1000;
    const tiempoPasado = Date.now() - fechaRegistro;
    const restanteMs = setentaIDosHorasMs - tiempoPasado;

    if (restanteMs <= 0) return "Expirado";

    const horasTotales = Math.floor(restanteMs / (1000 * 60 * 60));
    const minutosTotales = Math.floor((restanteMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${horasTotales}h ${minutosTotales}m restantes`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', height: '100%' }}>
      
      {/* MITAD SUPERIOR: TABLÓN VISUAL (GALERÍA EN GRID HORIZONTAL) */}
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', color: '#1a202c', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={20} color="#E65100" /> Tablón de Enseres Activos (Caducidad de 72h)
        </h3>
        
        {anuncios.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic', fontSize: '0.95rem' }}>No hay objetos publicados en este momento.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '15px' }}>
            {anuncios.map((item) => (
              <div key={item.id} style={{ border: '1px solid #edf2f7', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f8fafc', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
                {/* Imagen Cuadrada Proporcional */}
                <div style={{ width: '100%', height: '140px', backgroundColor: '#eaeaea' }}>
                  <img src={item.image || item.imagen} alt={item.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {/* Detalles de la Alerta */}
                <div style={{ padding: '12px' }}>
                  <strong style={{ display: 'block', fontSize: '0.9rem', color: '#2d3748', height: '38px', overflow: 'hidden' }}>{item.titulo}</strong>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: '#718096', marginTop: '4px' }}>📍 Zona: {item.barrio}</span>
                  
                  {/* Cronómetro Flotante */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px', backgroundColor: '#FFF3E0', padding: '4px 8px', borderRadius: '6px', width: 'fit-content' }}>
                    <Clock size={12} color="#E65100" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#E65100' }}>{calcularTiempoRestante(item.fecha)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MITAD INFERIOR: FORMULARIO DE RECOLECCIÓN Y REGISTRO FOTOGRÁFICO */}
      <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <h3 style={{ margin: '0 0 15px 0', fontSize: '1.1rem', color: '#2E7D32' }}>📸 Formulario: Publicar Nuevo Objeto para Intercambio</h3>
        
        <form onSubmit={registrarAnuncio} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px', fontSize: '0.9rem' }}>1. Objeto a intercambiar (¿Qué es?):</label>
            <input 
              type="text" 
              value={nuevoTitulo}
              onChange={(e) => setNuevoTitulo(e.target.value)}
              placeholder="Ej. Sofá de 3 plazas, estantería blanca, etc." 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0', fontSize: '0.9rem', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px', fontSize: '0.9rem' }}>2. Barrio / Zona de Elda donde se encuentra:</label>
            <select 
              value={nuevoBarrio}
              onChange={(e) => setNuevoBarrio(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0', fontSize: '0.9rem' }}
            >
              <option value="Centro">Centro Ciudad / Plaza Castelar</option>
              <option value="San Francisco de Sales">San Francisco de Sales</option>
              <option value="Las Tres Doscientas">Las Tres Doscientas</option>
              <option value="Chapi">Zona Chapí</option>
              <option value="Estación">Barrio de la Estación</option>
            </select>
          </div>

          {/* APARTADO DE LA FOTO REQUERIDO */}
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px', fontSize: '0.9rem' }}>3. Subir o Hacer Foto del Enser:</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <label style={{
                backgroundColor: '#edf2f7', color: '#2d3748', padding: '12px 18px', borderRadius: '8px',
                fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #cbd5e0', fontSize: '0.85rem'
              }}>
                <Camera size={18} color="#4a5568" />
                Hacer / Subir Foto
                <input type="file" accept="image/*" onChange={manejarFotoSimulada} style={{ display: 'none' }} />
              </label>
              
              {imagenSimulada && (
                <div style={{ width: '60px', height: '60px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #ddd' }}>
                  <img src={imagenSimulada} alt="Vista previa" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            style={{ width: '100%', backgroundColor: '#2E7D32', color: '#fff', padding: '14px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem', marginTop: '10px' }}
          >
            Subir al Tablón Ciudadano e Informar a XAMPP
          </button>
        </form>
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
  const [reproduccionActiva, setReproduccionActiva] = useState(true);
  const [eldaCoins, setEldaCoins] = useState(() => {
    const guardadas = localStorage.getItem('eldaCoins');
    return guardadas ? parseInt(guardadas, 10) : 120;
  });

  const titulosSlides = [
    "Slide 01: Marco Strategico Municipal", "Slide 02: Logística de Quita y Pon",
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

  useEffect(() => {
    let temporizador = null;
    if (reproduccionActiva && pestanaActiva === 'mapa') {
      temporizador = setInterval(() => {
        setSlideIndice((prev) => (prev + 1) % 10);
      }, 3000);
    }
    return () => {
      if (temporizador) clearInterval(temporizador);
    };
  }, [reproduccionActiva, pestanaActiva]);

  const formatearSlide = (idx) => {
    const numReal = idx + 1;
    return numReal < 10 ? `0${numReal}` : `${numReal}`;
  };

  const sincronizarConXampp = async (operacion, datosCarga) => {
    try {
      await fetch(`${XAMPP_API_URL}/guardar_registro.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operacion, datosCarga, timestamp: new Date().toISOString() })
      });
    } catch (err) {
      console.log("Servidor XAMPP offline. Sincronizado localmente.");
    }
  };

  const ejecutarCanje = (premio) => {
    if (eldaCoins >= premio.coste) {
      const nuevoSaldo = eldaCoins - premio.coste;
      setEldaCoins(nuevoSaldo);
      localStorage.setItem('eldaCoins', nuevoSaldo);
      sincronizarConXampp('canje_premio_ciudadano', premio);
      alert(`🎉 Canje correcto: Código emitido para "${premio.nombre}".`);
    } else {
      alert("⚠️ Balance de Elda-Coins insuficiente.");
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh', paddingBottom: '30px' }}>
      
      {/* MENÚ SUPERIOR DESPLEGABLE TIPO COMBO */}
      <header style={{
        backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', padding: '14px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 1100,
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button 
            onClick={() => setMenuAbierto(!menuAbierto)} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '6px', borderRadius: '6px', backgroundColor: '#f8f9fa' }}
          >
            <Menu size={22} color="#2E7D32" />
          </button>
          <span style={{ fontWeight: 'bold', fontSize: '1.15rem', color: '#2E7D32', letterSpacing: '-0.3px' }}>Elda Circular Civic OS</span>
        </div>
        
        <div style={{ backgroundColor: '#FFF9C4', border: '1px solid #FBC02D', padding: '6px 14px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.85rem' }}>
          🪙 {eldaCoins} Elda-Coins
        </div>

        {/* Desplegable Combo Menu */}
        {menuAbierto && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#fff',
            borderBottom: '3px solid #2E7D32', boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
            display: 'flex', flexDirection: 'column', zIndex: 1200
          }}>
            <button onClick={() => { setPestanaActiva('mapa'); setMenuAbierto(false); }} style={{ padding: '16px 24px', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid #f0f0f0', cursor: 'pointer', fontWeight: pestanaActiva === 'mapa' ? 'bold' : 'normal', color: pestanaActiva === 'mapa' ? '#2E7D32' : '#333', fontSize: '0.95rem' }}>📍 Mitad Superior: Slideshow 16:9 | Mitad Inferior: Callejero y Premios</button>
            <button onClick={() => { setPestanaActiva('enseres'); setMenuAbierto(false); }} style={{ padding: '16px 24px', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid #f0f0f0', cursor: 'pointer', fontWeight: pestanaActiva === 'enseres' ? 'bold' : 'normal', color: pestanaActiva === 'enseres' ? '#2E7D32' : '#333', fontSize: '0.95rem' }}>📦 🆕 Mitad Superior: Tablón Enseres (72h) | Mitad Inferior: Registro con Foto</button>
            <button onClick={() => { setPestanaActiva('depositos'); setMenuAbierto(false); }} style={{ padding: '16px 24px', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid #f0f0f0', cursor: 'pointer', fontWeight: pestanaActiva === 'depositos' ? 'bold' : 'normal', color: pestanaActiva === 'depositos' ? '#2E7D32' : '#333', fontSize: '0.95rem' }}>♻️ Mitad Superior: Cámara Lector QR | Mitad Inferior: Formulario Trazabilidad</button>
            <button onClick={() => { setPestanaActiva('educacion'); setMenuAbierto(false); }} style={{ padding: '16px 24px', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid #f0f0f0', cursor: 'pointer', fontWeight: pestanaActiva === 'educacion' ? 'bold' : 'normal', color: pestanaActiva === 'educacion' ? '#2E7D32' : '#333', fontSize: '0.95rem' }}>🎓 Mitad Superior: Banner Educativo | Mitad Inferior: Cuestionario Z-ero</button>
            <button onClick={() => { setPestanaActiva('multimedia'); setMenuAbierto(false); }} style={{ padding: '16px 24px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontWeight: pestanaActiva === 'multimedia' ? 'bold' : 'normal', color: pestanaActiva === 'multimedia' ? '#2E7D32' : '#333', fontSize: '0.95rem' }}>📻 Mitad Superior: Reproductor Vídeo 16:9 | Mitad Inferior: Podcast e Informes</button>
          </div>
        )}
      </header>

      {/* ÁREA DE CONTENIDO */}
      <main style={{ maxWidth: '1200px', margin: '24px auto', padding: '0 20px' }}>
        
        {/* MODULO 1: PORTADA Y SLIDESHOW 16:9 */}
        {pestanaActiva === 'mapa' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <section style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '80%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f8fafc', position: 'relative', border: '1px solid #e2e8f0' }}>
                <img src={`/media/slide${formatearSlide(slideIndice)}.png`} alt={`Diapositiva ${slideIndice + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                <button onClick={() => setReproduccionActiva(!reproduccionActiva)} style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: 'rgba(46, 125, 50, 0.95)', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', fontSize: '0.8rem', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}>
                  {reproduccionActiva ? <Pause size={14} /> : <Play size={14} />} {reproduccionActiva ? "Pausar" : "Reanudar"}
                </button>
              </div>
              <div style={{ width: '80%', marginTop: '16px', padding: '15px 20px', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #edf2f7', textAlign: 'center' }}>
                <strong style={{ fontSize: '1.3rem', display: 'block', color: '#1B5E20', marginBottom: '6px' }}>{titulosSlides[slideIndice]}</strong>
                <span style={{ fontSize: '1.05rem', color: '#4a5568', fontWeight: '500', lineHeight: '1.5' }}>Plan Maestro de Ingeniería Social y Logística Urbana de Elda.</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', width: '80%' }}>
                <button onClick={() => { setSlideIndice((prev) => (prev - 1 + 10) % 10); setReproduccionActiva(false); }} style={{ backgroundColor: '#edf2f7', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}>◀ Anterior</button>
                <span style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#4a5568', backgroundColor: '#f1f5f9', padding: '6px 16px', borderRadius: '12px' }}>{slideIndice + 1} / 10 { !reproduccionActiva && "⏸️ (Pausado)" }</span>
                <button onClick={() => { setSlideIndice((prev) => (prev + 1) % 10); setReproduccionActiva(false); }} style={{ backgroundColor: '#2E7D32', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}>Siguiente ▶</button>
              </div>
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', flexWrap: 'wrap' }}>
              <section style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', color: '#1a202c', display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={20} color="#2E7D32" /> Distribución de Puntos de Proximidad</h3>
                <ModuloMapa />
              </section>
              <section style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: '0 0 15px 0', fontSize: '1.1rem', color: '#1a202c' }}>🛍️ Formulario de Solicitud de Vales e Incentivos</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {catalogoPremios.map((p) => (
                    <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#2d3748' }}>{p.nombre}</span>
                      <button onClick={() => ejecutarCanje(p)} style={{ backgroundColor: eldaCoins >= p.coste ? '#2E7D32' : '#cbd5e0', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' }}>Canjear por {p.coste} 🪙</button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {/* NUEVO MÓDULO INTERACTIVO DE ENSERES */}
        {pestanaActiva === 'enseres' && (
          <ModuloEnseres sincronizarConXampp={sincronizarConXampp} />
        )}

        {/* MODULO 2: VALIDACIÓN QR */}
        {pestanaActiva === 'depositos' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div style={{ width: '100%', aspectRatio: '16/9', maxHeight: '280px', backgroundColor: '#E8F5E9', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '2px dashed #2E7D32' }}>
              <CheckCircle size={44} color="#2E7D32" style={{ marginBottom: '10px' }} />
              <h3 style={{ color: '#1B5E20', margin: 0, fontSize: '1.15rem' }}>Lector Óptico de Trazabilidad QR Activo</h3>
            </div>
            <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 15px 0', fontSize: '1.1rem' }}>Formulario de Registro de Entrega</h3>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px', fontSize: '0.9rem' }}>1. Seleccionar Contenedor de Destino:</label>
              <select id="selectContenedor" style={{ width: '100%', padding: '12px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #cbd5e0' }}>
                {tiposContenedores.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px', fontSize: '0.9rem' }}>2. Estado de Pureza de la Fracción:</label>
              <select id="selectResiduo" style={{ width: '100%', padding: '12px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #cbd5e0' }}>
                <option value="correcto">Pureza Óptima (Sin mezcla de impropios)</option>
                <option value="impropio">Contaminación de Lote (Pegatina Roja)</option>
              </select>
              <button onClick={() => {
                setEldaCoins(p => p + 15);
                alert("¡Depósito validado en origen! Se han sumado +15 Elda-Coins.");
              }} style={{ width: '100%', backgroundColor: '#2E7D32', color: '#fff', padding: '14px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Enviar Registro de Validación</button>
            </div>
          </div>
        )}

        {/* MODULO 3: AULA DE FORMACIÓN */}
        {pestanaActiva === 'educacion' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div style={{ width: '100%', aspectRatio: '16/9', maxHeight: '240px', backgroundColor: '#E3F2FD', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #90CAF9' }}>
              <BookOpen size={40} color="#0D47A1" style={{ marginBottom: '8px' }} />
              <h3 style={{ margin: 0, color: '#0D47A1', fontSize: '1.15rem' }}>Programa de Auditoría Social "Generación Z-ero"</h3>
            </div>
            <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              {cuestionariosZero.primaria.map((quiz) => (
                <div key={quiz.id} style={{ marginBottom: '20px' }}>
                  <strong style={{ display: 'block', marginBottom: '10px' }}>{quiz.pregunta}</strong>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {quiz.opciones.map((op, i) => (
                      <button key={i} onClick={() => alert(i === quiz.correcta ? "¡Correcto!" : "Incorrecto.")} style={{ padding: '10px 16px', border: '1px solid #cbd5e0', borderRadius: '6px', backgroundColor: '#fff', cursor: 'pointer' }}>{op}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULO 4: HUB MULTIMEDIA */}
        {pestanaActiva === 'multimedia' && (
          <section style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ margin: '0 0 15px 0', fontSize: '1.2rem', color: '#2E7D32' }}>📻 Centro de Documentación y Medios</h2>
            <ModuloMultimedia />
          </section>
        )}

      </main>

    </div>
  );
}