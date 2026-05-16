# Elda Circular Civic OS ♻️📱
**Progressive Web App (PWA) de Gestión de Residuos, Logística Urbana y Meritocracia Ciudadana**

---

## 📋 Descripción del Proyecto
**Elda Circular Civic OS** es una plataforma digital de ingeniería social y gestión ambiental diseñada para el municipio de Elda (Alicante). Bajo la premisa de *"Elda como nueva"*, este ecosistema transforma la recogida de residuos urbanos tradicionales en un modelo eficiente de economía circular, trazabilidad en origen y meritocracia activa, eliminando los contenedores fijos del centro peatonalizado mediante las **Esquinas de Quita y Pon**.

El sistema se alinea con la **Ley 7/2022 de residuos** y el **Plan Integral de Residuos de la Comunidad Valenciana (PIRCV)**, ofreciendo una solución tecnológica integral para mitigar el impacto del canon de vertido.

---

## 🏁 Hitos Consolidados en la Infraestructura
* **Interfaz PWA unificada:** Navegación móvil fluida basada en 4 pestañas fijas operativas (`📍 Mapa`, `♻️ QR y Canje`, `🎓 Aula` y `📻 Medios`).
* **Blindaje de Código:** Arquitectura optimizada con componentes internos independientes dentro de `src/App.jsx`. Compilación de Vite al 100% limpia (cero errores, cero warnings).
* **Motor de Meritocracia Activa:** Persistencia de datos local (`LocalStorage`) que gestiona el balance y el canje de **Elda-Coins** por incentivos reales (Descuentos en la Tasa de Basuras, entradas del **Teatro Castelar** y vales para el Comercio Local).
* **Hub Multimedia de Consulta:** Integración en la pestaña de Medios de un reproductor de audio nativo para el podcast `.m4a` de NotebookLM y menús interactivos con los balances económicos del eje Elda-Villena.

---

## 📂 Estructura Real del Repositorio
```text
elda-circular-civic/
├── docs/
│   └── propuesta-tecnica.md      # Dosier económico del ahorro de 90€/Tn y Ley 7/2022.
├── public/
│   └── media/
│       ├── mapa-elda.png         # Plano base para la localización de las esquinas.
│       └── podcast-elda.m4a      # Audio del podcast formativo de NotebookLM.
├── src/
│   ├── data/
│   │   └── circularData.js       # Base de datos de los tipos de contenedores y quizzes del Aula.
│   ├── App.jsx                   # Componente maestro React con la lógica unificada de la app.
│   └── main.jsx                  # Punto de entrada del entorno.
├── package.json                  # Dependencias del proyecto (lucide-react, react, vite).
└── README.md                     # Guía técnica maestra (Este archivo).