import React, { useState, useEffect } from 'react';
import { cuestionariosZero, tiposContenedores } from './data/circularData';
import { Trash2, Radio, BookOpen, ChevronDown, ChevronUp, Ticket, ShoppingBag, Percent, Video, Menu, MapPin, CheckCircle, Play, Pause, Camera, Clock, ShieldAlert, Zap, Award } from 'lucide-react';

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
// COMPONENTE INTERNO: INTERCAMBIO DE ENSERES
// =================================================================
function ModuloEnseres({ sincronizarConXampp }) {
  const [anuncios, setAnuncios] = useState([
    { id: 1, titulo: "Silla de escritorio ergonómica", barrio: "San Francisco de Sales", fecha: Date.now() - 3600000 * 12, imagen: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=500&auto=format&fit=crop&q=60" },
    { id: 2, titulo: "Mesa de centro de salón (Madera)", barrio: "Plaza Castelar", fecha: Date.now() - 3600000 * 30, imagen: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=500&auto=format&fit=crop&q=60" }
  ]);
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevoBarrio, setNuevoBarrio] = useState('Centro');
  const [imagenSimulada, setImagenSimulada] = useState('');

  const manejarFotoSimulada = (e) => {
    const archivo = e.target.files[0];
    if (archivo) setImagenSimulada(URL.createObjectURL(archivo));
  };

  const registrarAnuncio = (e) => {
    e.preventDefault();
    if (!nuevoTitulo) return alert("Introduce una breve descripción.");
    const nuevoItem = { id: Date.now(), titulo: nuevoTitulo, barrio: nuevoBarrio, fecha: Date.now(), imagen: imagenSimulada || "https://images.unsplash.com/photo-1581428982868-e410dd047a90?w=500&auto=format&fit=crop&q=60" };
    setAnuncios([nuevoItem, ...anuncios]);
    sincronizarConXampp('registrar_ensere_tablon', nuevoItem);
    setNuevoTitulo(''); setImagenSimulada('');
    alert("🎉 ¡Anuncio publicado por 72 horas!");
  };

  const calcularTiempoRestante = (fechaRegistro) => {
    const restanteMs = (72 * 60 * 60 * 1000) - (Date.now() - fechaRegistro);
    if (restanteMs <= 0) return "Expirado";
    return `${Math.floor(restanteMs / 3600000)}h ${Math.floor((restanteMs % 3600000) / 60000)}m restantes`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={20} color="#E65100" /> Tablón de Enseres (72h Máx)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '15px' }}>
          {anuncios.map(item => (
            <div key={item.id} style={{ border: '1px solid #edf2f7', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f8fafc' }}>
              <div style={{ width: '100%', height: '120px' }}><img src={item.imagen} alt={item.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
              <div style={{ padding: '12px' }}>
                <strong style={{ display: 'block', fontSize: '0.9rem' }}>{item.titulo}</strong>
                <span style={{ display: 'block', fontSize: '0.8rem', color: '#718096' }}>📍 {item.barrio}</span>
                <span style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 'bold', color: '#E65100', backgroundColor: '#FFF3E0', padding: '2px 6px', borderRadius: '4px', marginTop: '8px' }}>{calcularTiempoRestante(item.fecha)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
        <h3 style={{ margin: '0 0 15px 0', fontSize: '1.1rem', color: '#2E7D32' }}>📸 Publicar en Tablón Ciudadano</h3>
        <form onSubmit={registrarAnuncio} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input type="text" value={nuevoTitulo} onChange={e => setNuevoTitulo(e.target.value)} placeholder="Ej. Sofá, estantería..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0' }} />
          <select value={nuevoBarrio} onChange={e => setNuevoBarrio(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0' }}>
            <option value="Centro">Centro / Plaza Castelar</option>
            <option value="San Francisco de Sales">San Francisco de Sales</option>
          </select>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ backgroundColor: '#edf2f7', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', border: '1px solid #cbd5e0', fontSize: '0.85rem' }}>
              <Camera size={16} style={{ marginRight: '5px' }} /> Foto <input type="file" accept="image/*" onChange={manejarFotoSimulada} style={{ display: 'none' }} />
            </label>
            {imagenSimulada && <img src={imagenSimulada} alt="Preview" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />}
          </div>
          <button type="submit" style={{ backgroundColor: '#2E7D32', color: '#fff', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Publicar Objeto</button>
        </form>
      </div>
    </div>
  );
}

// =================================================================
// COMPONENTE INTERNO: IGLÚ VERDE Y VIDRIO (PANTALLA PARTIDA HORIZONTAL)
// =================================================================
function ModuloVidrio({ eldaCoins, setEldaCoins, sincronizarConXampp }) {
  const [iglueSeleccionado, setIglueSeleccionado] = useState('padreManjon');
  const [kilosUsuario, setKilosUsuario] = useState(() => {
    const guardados = localStorage.getItem('vidrioKilos');
    return guardados ? parseFloat(guardados) : 0;
  });

  const igluesEcovidrio = {
    padreManjon: { nombre: "Av. Padre Manjón (Frente Alminar)", llenado: "Disponible", curva: 35, distanciaMeters: 3 },
    chapi: { nombre: "Calle Chapí (Esquina Teatro)", llenado: "Próximo a Llenado", curva: 78, distanciaMeters: 12 },
    campoAlto: { nombre: "Polígono Campo Alto (Ecoparque Fijo)", llenado: "Completo", curva: 96, distanciaMeters: 45 }
  };

  const datosIglue = igluesEcovidrio[iglueSeleccionado];

  // Cálculo de impacto: 1 kg de vidrio ahorra aprox 1.2 kWh de energía térmica en hornos
  const energiaAhorrada = (kilosUsuario * 1.2).toFixed(1);

  const realizarCheckIn = () => {
    const esSabado = new Date().getDay() === 6;
    
    if (datosIglue.distanciaMeters <= 5) {
      const premio = esSabado ? 10 : 2; // Gamificación: sábado priorizado con +10 coins
      const nuevoSaldo = eldaCoins + premio;
      const nuevosKilos = kilosUsuario + 4.5; // Simulación: un depósito medio son 4.5kg

      setEldaCoins(nuevoSaldo);
      setKilosUsuario(nuevosKilos);
      localStorage.setItem('eldaCoins', nuevoSaldo);
      localStorage.setItem('vidrioKilos', nuevosKilos);

      sincronizarConXampp('checkin_vidrio_ecovidrio', { iglue: iglueSeleccionado, kilos: 4.5, puntos: premio });

      alert(`🎯 ¡Check-in verificado por Geolocalización!\nEstás a ${datosIglue.distanciaMeters}m del iglú.\nHas sumado +${premio} Elda-Coins 🪙 y registrado 4.5 kg de vidrio.`);
    } else {
      alert(`⚠️ Error de Geolocalización.\nTu GPS indica que estás a ${datosIglue.distanciaMeters} metros del iglú verde. Debes aproximarte a menos de 5 metros para validar el depósito.`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
      
      {/* MITAD SUPERIOR: VISUAL (MAPA GOOGLE MAPS / INTELIGENCIA DE LLENADO INTEGRADAS 16:9) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', backgroundColor: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
        
        {/* Renderizado del Mapa Ecovidrio */}
        <div style={{
          aspectRatio: '16/9', backgroundImage: "url('/media/mapa-elda.png')",
          backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '12px',
          border: '1px solid #A5D6A7', position: 'relative'
        }}>
          <div style={{ position: 'absolute', top: '40%', left: '50%', backgroundColor: '#2E7D32', color: 'white', padding: '6px 12px', borderRadius: '15px', fontSize: '0.75rem', fontWeight: 'bold', border: '1px solid white' }}>
            🟢 Iglú Ecovidrio
          </div>
        </div>

        {/* Widget IA de Inteligencia de Llenado */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px', padding: '10px', backgroundColor: '#F1F8E9', borderRadius: '12px', border: '1px solid #C5E1A5' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#1B5E20', textTransform: 'uppercase' }}>🔮 Curva de Llenado IA (Ecovidrio)</span>
          <strong style={{ fontSize: '1.1rem', color: '#2d3748' }}>{datosIglue.nombre}</strong>
          
          {/* Barra de progreso predictiva */}
          <div style={{ width: '100%', height: '12px', backgroundColor: '#e2e8f0', borderRadius: '6px', overflow: 'hidden', marginTop: '5px' }}>
            <div style={{ 
              width: `${datosIglue.curva}%`, height: '100%', 
              backgroundColor: datosIglue.curva > 90 ? '#d32f2f' : datosIglue.curva > 70 ? '#FBC02D' : '#2E7D32',
              transition: 'width 0.3s'
            }} />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '500' }}>
            <span>Capacidad: {datosIglue.curva}%</span>
            <span style={{ 
              color: datosIglue.llenado === 'Completo' ? '#d32f2f' : datosIglue.llenado === 'Próximo a Llenado' ? '#E65100' : '#2E7D32',
              fontWeight: 'bold'
            }}>{datosIglue.llenado}</span>
          </div>
        </div>
      </div>

      {/* MITAD INFERIOR: CONTROLES, FORMULARIOS Y SECCIÓN DE IMPACTO ENERGÉTICO */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
        
        {/* Formulario de Selección y Check-In por GPS */}
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ margin: 0, color: '#2E7D32', fontSize: '1rem' }}>📍 Formulario de Depósito Certificado</h4>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '4px' }}>Selecciona tu Iglú Verde más cercano:</label>
            <select 
              value={iglueSeleccionado} 
              onChange={e => setIglueSeleccionado(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0' }}
            >
              {Object.keys(igluesEcovidrio).map(key => (
                <option key={key} value={key}>{igluesEcovidrio[key].nombre}</option>
              ))}
            </select>
          </div>

          <div style={{ backgroundColor: '#FFF3E0', padding: '12px', borderRadius: '8px', border: '1px solid #FFE0B2', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={20} color="#E65100" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.8rem', color: '#E65100', fontWeight: '500' }}>
              <strong>Paso Crítico:</strong> No introduzcas vidrio en las bolsas con QR del Kit Ciudadano para evitar roturas peligrosas. El vidrio va suelto al iglú.
            </span>
          </div>

          <button 
            onClick={realizarCheckIn}
            style={{ width: '100%', backgroundColor: '#2E7D32', color: 'white', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <MapPin size={16} /> Validar Depósito por Geolocalización
          </button>
        </div>

        {/* Panel Maestro de Impacto y Auditoría Energética */}
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ margin: '0 0 10px 0', color: '#0D47A1', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}><Zap size={18} /> Indicadores de Impacto Ambiental</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#555', lineHeight: '1.4' }}>
              El reciclaje de vidrio en España evitó emisiones masivas de CO2. El ahorro de energía del sector equivale al consumo de <strong>todos los hospitales de España durante dos meses enteros</strong>.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '12px' }}>
            <div style={{ backgroundColor: '#F5F5F5', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#666', fontWeight: 'bold' }}>VIDRIO RECICLADO</span>
              <strong style={{ fontSize: '1.4rem', color: '#2E7D32' }}>{kilosUsuario.toFixed(1)} kg</strong>
            </div>
            <div style={{ backgroundColor: '#E3F2FD', padding: '12px', borderRadius: '8px', textAlign: 'center', border: '1px solid #BBDEFB' }}>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#0D47A1', fontWeight: 'bold' }}>ENERGÍA AHORRADA</span>
              <strong style={{ fontSize: '1.4rem', color: '#0D47A1' }}>{energiaAhorrada} kWh</strong>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #eee', paddingTop: '10px', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#2E7D32', fontWeight: 'bold' }}>
            <Award size={14} />
            <span>Rentabilidad: 100 envases depositados fabrican más de 90 envases nuevos sin perder pureza.</span>
          </div>
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
  const [reproduccionActiva, setReproduccionActiva] = useState(true);
  const [eldaCoins, setEldaCoins] = useState(() => {
    const guardadas = localStorage.getItem('eldaCoins');
    return guardadas ? parseInt(guardadas, 10) : 120;
  });

  const esSabado = new Date().getDay() === 6;

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

  useEffect(() => {
    let temporizador = null;
    if (reproduccionActiva && pestanaActiva === 'mapa') {
      temporizador = setInterval(() => {
        setSlideIndice((prev) => (prev + 1) % 10);
      }, 3000);
    }
    return () => { if (temporizador) clearInterval(temporizador); };
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
      alert(`🎉 Canje correcto para: "${premio.nombre}".`);
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
          <span style={{ fontWeight: 'bold', fontSize: '1.15rem', color: '#2E7D32' }}>Elda Circular Civic OS</span>
        </div>
        
        <div style={{ backgroundColor: '#FFF9C4', border: '1px solid #FBC02D', padding: '6px 14px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.85rem' }}>
          {esSabado ? "🍾 ¡Hoy Sábado es Día del Vidrio!" : `🪙 ${eldaCoins} Elda-Coins`}
        </div>

        {/* Desplegable Combo Menu */}
        {menuAbierto && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#fff',
            borderBottom: '3px solid #2E7D32', boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
            display: 'flex', flexDirection: 'column', zIndex: 1200
          }}>
            <button onClick={() => { setPestanaActiva('mapa'); setMenuAbierto(false); }} style={{ padding: '16px 24px', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid #f0f0f0', cursor: 'pointer', fontWeight: pestanaActiva === 'mapa' ? 'bold' : 'normal', color: '#333' }}>📍 Mitad Superior: Slideshow 16:9 | Mitad Inferior: Callejero y Premios</button>
            <button onClick={() => { setPestanaActiva('vidrio'); setMenuAbierto(false); }} style={{ padding: '16px 24px', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid #f0f0f0', cursor: 'pointer', fontWeight: pestanaActiva === 'vidrio' ? 'bold' : 'normal', color: '#2E7D32' }}>🍾 🆕 Mitad Superior: Iglús Ecovidrio e IA | Mitad Inferior: GPS y Energía Ahorrada</button>
            <button onClick={() => { setPestanaActiva('enseres'); setMenuAbierto(false); }} style={{ padding: '16px 24px', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid #f0f0f0', cursor: 'pointer', fontWeight: pestanaActiva === 'enseres' ? 'bold' : 'normal', color: '#333' }}>📦 Mitad Superior: Tablón Enseres (72h) | Mitad Inferior: Registro con Foto</button>
            <button onClick={() => { setPestanaActiva('depositos'); setMenuAbierto(false); }} style={{ padding: '16px 24px', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid #f0f0f0', cursor: 'pointer', fontWeight: pestanaActiva === 'depositos' ? 'bold' : 'normal', color: '#333' }}>♻️ Mitad Superior: Cámara Lector QR | Mitad Inferior: Formulario Trazabilidad</button>
            <button onClick={() => { setPestanaActiva('educacion'); setMenuAbierto(false); }} style={{ padding: '16px 24px', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid #f0f0f0', cursor: 'pointer', fontWeight: pestanaActiva === 'educacion' ? 'bold' : 'normal', color: '#333' }}>🎓 Mitad Superior: Banner Educativo | Mitad Inferior: Cuestionario Z-ero</button>
            <button onClick={() => { setPestanaActiva('multimedia'); setMenuAbierto(false); }} style={{ padding: '16px 24px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontWeight: pestanaActiva === 'multimedia' ? 'bold' : 'normal', color: '#333' }}>📻 Mitad Superior: Reproductor Vídeo 16:9 | Mitad Inferior: Podcast e Informes</button>
          </div>
        )}
      </header>

      {/* ÁREA DE CONTENIDO PRINCIPAL */}
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

        {/* NUEVO MÓDULO CORREGIDO: IGLÚ VERDE Y TRAZABILIDAD DE VIDRIO */}
        {pestanaActiva === 'vidrio' && (
          <ModuloVidrio eldaCoins={eldaCoins} setEldaCoins={setEldaCoins} sincronizarConXampp={sincronizarConXampp} />
        )}

        {/* MODULO 3: INTERCAMBIO DE ENSERES */}
        {pestanaActiva === 'enseres' && (
          <ModuloEnseres sincronizarConXampp={sincronizarConXampp} />
        )}

        {/* MODULO 4: VALIDACIÓN QR */}
        {pestanaActiva === 'depositos' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div style={{ width: '100%', aspectRatio: '16/9', maxHeight: '280px', backgroundColor: '#E8F5E9', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '2px dashed #2E7D32' }}>
              <CheckCircle size={44} color="#2E7D32" style={{ marginBottom: '10px' }} />
              <h3 style={{ color: '#1B5E20', margin: 0, fontSize: '1.15rem' }}>Lector Óptico de Trazabilidad QR Activo</h3>
            </div>
            <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <select id="selectContenedor" style={{ width: '100%', padding: '12px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #cbd5e0' }}>
                {tiposContenedores.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
              <button onClick={() => alert("¡Depósito validado!")} style={{ width: '100%', backgroundColor: '#2E7D32', color: '#fff', padding: '14px', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>Enviar Registro de Validación</button>
            </div>
          </div>
        )}

        {/* MODULO 5: AULA DE FORMACIÓN */}
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
                      <button key={i} onClick={() => alert("Procesado")} style={{ padding: '10px 16px', border: '1px solid #cbd5e0', borderRadius: '6px', backgroundColor: '#fff' }}>{op}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULO 6: HUB MULTIMEDIA */}
        {pestanaActiva === 'multimedia' && (
          <section style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <ModuloMultimedia />
          </section>
        )}

      </main>

    </div>
  );
}