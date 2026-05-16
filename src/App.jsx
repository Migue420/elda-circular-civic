import React, { useState, useEffect } from 'react';
import { Trash2, Radio, BookOpen, ChevronDown, ChevronUp, Ticket, ShoppingBag, Percent, Video, Menu, MapPin, CheckCircle, Play, Pause, Camera, Clock, ShieldAlert, Zap, Award, User, Building, Landmark, HelpCircle, FileText, Lock, LogOut } from 'lucide-react';

const XAMPP_API_URL = "http://localhost/elda-circular-api";

export default function App() {
  // --- ESTADOS DE CONTROL DE ACCESO ---
  const [usuarioLogeado, setUsuarioLogeado] = useState(false);
  const [rolUsuario, setRolUsuario] = useState('ciudadano'); // ciudadano, partner, gestor, admin
  const [datosUsuario, setDatosUsuario] = useState(null);
  
  // --- ESTADOS DE CREDENCIALES (FORMULARIO) ---
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [selectRolSimulado, setSelectRolSimulado] = useState('ciudadano');

  // --- OTROS ESTADOS DEL SISTEMA ---
  const [pestanaActiva, setPestanaActiva] = useState('mapa');
  const [eldaCoins, setEldaCoins] = useState(120);
  const [slideIndice, setSlideIndice] = useState(0);
  const [reproduccionActiva, setReproduccionActiva] = useState(true);

  // Lógica de simulación de inicio de sesión local conectado conceptualmente a XAMPP
  const manejarLogin = async (e) => {
    e.preventDefault();
    if (!inputUsername || !inputPassword) {
      alert("Por favor, introduce tus credenciales.");
      return;
    }

    // Estructura simulada que emula la respuesta de la tabla 'usuarios' de elda_circular_db
    const mockUsuario = {
      username: inputUsername,
      nombre_completo: inputUsername.charAt(0).toUpperCase() + inputUsername.slice(1),
      rol: selectRolSimulado,
      vivienda_catastro: "Ref-" + Math.floor(100000 + Math.random() * 900000),
      elda_coins_balance: eldaCoins,
      vidrio_kilos_totales: 24.5
    };

    setDatosUsuario(mockUsuario);
    setRolUsuario(selectRolSimulado);
    setUsuarioLogeado(true);
    
    // Sincronización asíncrona hacia el backend de XAMPP
    await sincronizarConXampp('login_usuario', { username: inputUsername, rol: selectRolSimulado });
    alert(`👋 ¡Bienvenido al sistema, ${mockUsuario.nombre_completo}! Rol: ${selectRolSimulado.toUpperCase()}`);
  };

  const manejarLogout = () => {
    setUsuarioLogeado(false);
    setDatosUsuario(null);
    setRolUsuario('ciudadano');
    setInputUsername('');
    setInputPassword('');
    alert("Sesión cerrada correctamente. Entorno público restablecido.");
  };

  const sincronizarConXampp = async (operacion, datosCarga) => {
    try {
      await fetch(`${XAMPP_API_URL}/guardar_registro.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operacion, datosCarga, timestamp: new Date().toISOString() })
      });
    } catch (err) {
      console.log("Modo local offline activo - Datos preparados para sincronización.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      {/* CABECERA ESTÁTICA INSTITUCIONAL */}
      <header className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 p-2 rounded-lg text-slate-950 font-bold text-xl tracking-wider">EC</div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">ELDA CIRCULAR</h1>
            <p className="text-xs text-emerald-400 font-medium tracking-widest">CIVIC OS v46</p>
          </div>
        </div>
        
        {/* Indicador de estado de sesión rápido en barra superior */}
        <div className="flex items-center gap-2">
          {usuarioLogeado ? (
            <span className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {datosUsuario?.nombre_completo} ({rolUsuario.toUpperCase()})
            </span>
          ) : (
            <span className="bg-amber-500/10 text-amber-400 text-xs px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5">
              <Lock size={12} />
              Modo Informativo
            </span>
          )}
        </div>
      </header>

      {/* SISTEMA DE NAVEGACIÓN PRINCIPAL */}
      <nav className="bg-slate-900 border-b border-slate-800 flex overflow-x-auto">
        <button onClick={() => setPestanaActiva('mapa')} className={`px-6 py-3.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${pestanaActiva === 'mapa' ? 'border-emerald-500 text-emerald-400 bg-slate-850' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>
          🗺️ Panel Público 16:9
        </button>
        <button onClick={() => setPestanaActiva('enseres')} className={`px-6 py-3.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${pestanaActiva === 'enseres' ? 'border-emerald-500 text-emerald-400 bg-slate-850' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>
          📦 Tablón de Enseres
        </button>
        <button onClick={() => setPestanaActiva('vidrio')} className={`px-6 py-3.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${pestanaActiva === 'vidrio' ? 'border-emerald-500 text-emerald-400 bg-slate-850' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>
          🟢 Iglú Verde (Ecovidrio)
        </button>
        <button onClick={() => setPestanaActiva('usuario')} className={`ml-auto px-6 py-3.5 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${pestanaActiva === 'usuario' ? 'border-blue-500 text-blue-400 bg-slate-850' : 'border-transparent text-slate-300 hover:text-white bg-slate-950'}`}>
          <User size={16} /> {usuarioLogeado ? 'Mi Cuenta' : 'Acceso Privado'}
        </button>
      </nav>

      {/* CUERPO DE LA PLATAFORMA (DISEÑO HORIZONTAL SPLIT SCREEN EN NÚCLEOS OPERATIVOS) */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* PESTAÑA: CONTROL DE ACCESO / MENÚ DE USUARIO */}
        {pestanaActiva === 'usuario' && (
          <div className="flex-1 flex flex-col md:flex-row h-full">
            {/* Mitad Superior / Izquierda (Visual/Informativa 16:9) */}
            <div className="flex-1 bg-slate-950 p-6 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-slate-800">
              <div className="w-full max-w-md space-y-4 text-center">
                <div className="inline-flex p-3 rounded-full bg-blue-500/10 text-blue-400 mb-2">
                  <ShieldAlert size={40} />
                </div>
                <h2 className="text-xl font-bold text-white">Seguridad de la Infraestructura Civic OS</h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  El entorno dinámico securiza la base de datos municipal relacional. Los permisos multi-rol restringen la manipulación de tasas fiscales y balances de monedas locales de Elda.
                </p>
                <div className="bg-slate-900 p-4 rounded-xl text-left border border-slate-850 space-y-2">
                  <p className="text-xs text-slate-500 font-mono"># Roles de Acceso Vinculados:</p>
                  <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside font-mono">
                    <li><strong className="text-blue-400">Ciudadano:</strong> Alta de enseres y registro GPS.</li>
                    <li><strong className="text-purple-400">Partner:</strong> Validación y escaneo en comercios.</li>
                    <li><strong className="text-amber-400">Gestor:</strong> Aplicación de Pegatina Roja (Fobesa).</li>
                    <li><strong className="text-rose-400">Admin:</strong> Auditoría completa del superávit.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mitad Inferior / Derecha (Operativa / Formulario Dinámico) */}
            <div className="flex-1 bg-slate-900 p-6 overflow-y-auto flex items-center justify-center">
              <div className="w-full max-w-md">
                {!usuarioLogeado ? (
                  /* FORMULARIO DE ACCESO */
                  <form onSubmit={manejarLogin} className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white">Iniciar Sesión en el Motor Local</h3>
                      <p className="text-xs text-slate-400">Acceso sincronizado a elda_circular_db en XAMPP</p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Identificador Ciudadano / Username</label>
                        <input type="text" value={inputUsername} onChange={(e) => setInputUsername(e.target.value)} placeholder="Ej: miguelsirvent" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Contraseña de Acceso</label>
                        <input type="password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Simulación de Rol Operativo</label>
                        <select value={selectRolSimulado} onChange={(e) => setSelectRolSimulado(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors">
                          <option value="ciudadano">Ciudadano de Elda</option>
                          <option value="partner">Partner (Comercio Local Adherido)</option>
                          <option value="gestor">Gestor / Inspector (Fobesa)</option>
                          <option value="admin">Administrador (Auditoría Municipal)</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm py-2.5 px-4 rounded-lg mt-2 transition-colors flex items-center justify-center gap-2">
                      <Lock size={14} /> Autenticar en Servidor Local
                    </button>
                  </form>
                ) : (
                  /* PERFIL DE USUARIO / MENÚ OPERATIVO PRIVADO */
                  <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-emerald-900/40">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white">{datosUsuario?.nombre_completo}</h3>
                        <p className="text-xs text-emerald-400 font-mono font-medium tracking-wider uppercase">Rol: {rolUsuario}</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                        <User size={20} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-850">
                        <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Balance Activo</p>
                        <p className="text-lg font-black text-emerald-400 mt-1">{eldaCoins} <span className="text-xs font-normal">🫓</span></p>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-850">
                        <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Masa de Vidrio</p>
                        <p className="text-lg font-black text-blue-400 mt-1">{datosUsuario?.vidrio_kilos_totales} <span className="text-xs font-normal">kg</span></p>
                      </div>
                    </div>

                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850 space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Identificador Catastral:</span>
                        <span className="font-mono text-white font-medium">{datosUsuario?.vivienda_catastro}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Estado Base de Datos:</span>
                        <span className="text-emerald-400 font-semibold">Sincronizado MySQL</span>
                      </div>
                    </div>

                    <button onClick={manejarLogout} className="w-full bg-slate-900 hover:bg-slate-850 border border-slate-700 text-rose-400 font-medium text-sm py-2 px-4 rounded-lg mt-2 transition-colors flex items-center justify-center gap-2">
                      <LogOut size={14} /> Cerrar Sesión Segura
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA: TABLÓN DE ENSERES (CON FILTRO DE SEGURIDAD) */}
        {pestanaActiva === 'enseres' && (
          <div className="flex-1 flex flex-col h-full overflow-y-auto p-4 space-y-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h3 className="text-md font-bold text-white mb-1">📦 Tablón de Intercambio de Enseres (72 Horas Activas)</h3>
              <p className="text-xs text-slate-400">Listado público de objetos para el fomento de la economía circular en Elda.</p>
            </div>

            {/* PARTE DE CONTROL PRIVADO: EL FORMULARIO DE ALTA */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              {usuarioLogeado ? (
                <div className="space-y-3">
                  <p className="text-xs text-emerald-400 font-medium">✔️ Tu sesión activa te permite registrar nuevos objetos en el tablón:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" placeholder="Descripción del objeto (Silla, mesa...)" className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white" />
                    <button onClick={() => alert("Simulación: Objeto dado de alta por 72h")} className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-1.5 px-4 rounded-lg transition-colors">
                      Publicar Anuncio Ciudadano
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900/80 p-4 rounded-lg border border-dashed border-slate-700 text-center space-y-2">
                  <Lock className="mx-auto text-amber-400" size={20} />
                  <p className="text-xs text-slate-300">El formulario para dar de alta enseres está resguardado en el área privada.</p>
                  <button onClick={() => setPestanaActiva('usuario')} className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:underline font-medium">
                    Inicia sesión para registrar enseres →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PESTAÑA: IGLÚ VERDE (CON FILTRO DE SEGURIDAD OPERATIVA) */}
        {pestanaActiva === 'vidrio' && (
          <div className="flex-1 flex flex-col h-full overflow-y-auto p-4 space-y-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h3 className="text-md font-bold text-white mb-1">🟢 Red de Trazabilidad de Vidrio (Ecovidrio)</h3>
              <p className="text-xs text-slate-400">Datos en tiempo real de contenedores inteligentes e impacto energético local.</p>
            </div>

            {/* BOTÓN OPERATIVO PROTEGIDO */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              {usuarioLogeado ? (
                <div className="space-y-3">
                  <p className="text-xs text-slate-300">Ubicación detectada por simulación GPS dentro del rango de validación.</p>
                  <button onClick={() => { setEldaCoins(prev => prev + 2); alert("¡Depósito validado mediante geolocalización! +2 Elda-Coins añadidos."); }} className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2 px-6 rounded-lg transition-colors inline-flex items-center gap-2">
                    <MapPin size={14} /> Validar Check-In de Depósito (Menos de 5m)
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-850 space-y-2">
                  <p className="text-xs text-slate-400">Requiere autenticación para interactuar con la geolocalización y acumular créditos fiscales.</p>
                  <button onClick={() => setPestanaActiva('usuario')} className="bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold text-xs py-1.5 px-4 rounded-lg border border-slate-700 transition-colors">
                    Acceder a Mi Cuenta para realizar Depósitos
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* OTROS MÓDULOS DE LA WEB PÚBLICA (MAPA / SLIDESHOW 16:9 DE CONTROL) */}
        {pestanaActiva === 'mapa' && (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Mitad Superior (Visual/Slideshow 16:9 Limpio) */}
            <div className="flex-1 bg-slate-950 flex flex-col justify-center items-center relative p-2 border-b md:border-b-0 md:border-r border-slate-800">
              <div className="w-full aspect-video bg-slate-900 rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center relative">
                <span className="text-xs font-mono text-slate-600 absolute top-2 left-2">CANVAS PANORÁMICO NATIVO 16:9</span>
                <div className="text-center p-4">
                  <p className="text-2xl font-black tracking-widest text-emerald-500">slide05.png</p>
                  <p className="text-xs text-slate-400 mt-1">Simulación limpia de Diapositiva del Plan Maestro</p>
                </div>
              </div>
            </div>

            {/* Mitad Inferior (Operativa/Explicativa sin formularios directos) */}
            <div className="flex-1 bg-slate-900 p-6 overflow-y-auto flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase font-mono">Control de Exposición</span>
                  <button onClick={() => setReproduccionActiva(!reproduccionActiva)} className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors">
                    {reproduccionActiva ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                </div>
                <h3 className="text-lg font-bold text-white">Slide 05: Cumplimiento Integrado de la Ley 7/2022</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Esta diapositiva expone el marco técnico municipal adaptado al Plan Integral de Residuos de la Comunidad Valenciana (PIRCV), asegurando que el despliegue del sistema esté respaldado por la legislación vigente.
                </p>
              </div>
              <p className="text-[11px] text-slate-500 font-mono pt-4 border-t border-slate-800">
                Paso automático programado cada 3 segundos cíclicos.
              </p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}