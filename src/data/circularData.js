export const cuestionariosZero = {
  primaria: [
    {
      id: 1,
      pregunta: "¿En qué contenedor debemos depositar una botella de plástico vacía?",
      opciones: ["Contenedor Amarillo", "Contenedor Azul", "Contenedor Marrón"],
      correcta: 0,
      puntos: 10
    },
    {
      id: 2,
      pregunta: "La piel de un plátano o los restos de comida van al contenedor...",
      opciones: ["Gris (Resto)", "Marrón (Orgánico)", "Verde (Vidrio)"],
      correcta: 1,
      puntos: 10
    }
  ],
  secundaria: [
    {
      id: 1,
      pregunta: "Según la Ley 7/2022, ¿qué beneficio directo tiene separar correctamente la materia orgánica?",
      opciones: [
        "Reduce el canon de vertido estatal y ahorra unos 90€ por tonelada.",
        "Ninguno, todo se junta en el camión.",
        "Permite fabricar más envases de plástico libremente."
      ],
      correcta: 0,
      puntos: 20
    }
  ]
};

export const tiposContenedores = [
  { id: 'organica', nombre: 'Orgánica', color: '#8B4513', icono: 'Egg' },
  { id: 'envases', nombre: 'Envases', color: '#F1C40F', icono: 'Package' },
  { id: 'vidrio', nombre: 'Vidrio', color: '#27AE60', icono: 'GlassWater' },
  { id: 'papel', nombre: 'Papel y Cartón', color: '#2980B9', icono: 'FileText' },
  { id: 'resto', nombre: 'Resto', color: '#7F8C8D', icono: 'Trash2' }
];