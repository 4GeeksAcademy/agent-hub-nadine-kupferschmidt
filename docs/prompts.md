# Prompts usados con Copilot

Este archivo documenta los prompts usados para generar cada sección del panel, siguiendo el enfoque de construcción por capas Algoritmo del Pintor (Estructura → Contenido → Estilo).

---

## index.html — Estructura + Contenido (Dashboard)

**Prompt:**
```
Rol: Sos un desarrollador frontend que sigue un proceso de construcción por capas (estructura → contenido → estilo), sin adelantarte a la capa de estilo todavía.

Stack: HTML semántico puro. Sin Tailwind, sin ninguna clase CSS, sin atributos style, sin JavaScript por ahora — eso viene en un prompt posterior.

Restricciones:
- Usá etiquetas semánticas correctas: <nav> para la barra lateral, <header> para la barra superior, <main> con <section> para el contenido.
- La barra lateral (<nav>) debe tener enlaces a estas 6 páginas: index.html (Dashboard), users.html (Gestión de usuarios), agents.html (Gestión de agentes), skills.html (Skills), contracts.html (Contrataciones), errors.html (Log de errores).
- La barra superior (<header>) debe tener un <h1> con el título de la sección y un <button id="dark-mode-toggle"> para el toggle de modo oscuro (todavía sin funcionalidad).
- No agregues clases CSS, atributos style, ni JavaScript.

Contenido: Necesito el HTML completo (estructura + contenido, sin estilos) para el Dashboard de un panel de administración interno llamado AgentHub. Esta es la especificación de la sección:

1. Cuatro tarjetas de métrica, cada una con un ícono, una etiqueta y un valor hardcodeado:
   - "Ingresos totales (este mes)" — $48,200
   - "Pérdida por descuentos/cupones" — $3,150
   - "Agentes activos" — 132
   - "Agentes fallando" — 4
2. Debajo de las tarjetas, un contenedor de ancho completo que representa un placeholder de un gráfico, con el texto "Gráfico de actividad semanal (próximamente)".

Generá el archivo completo, incluyendo <!DOCTYPE html>, <head> con <title>, y el <body> con la barra lateral, la barra superior y el contenido del Dashboard.
```

## index.html — Estilo (Dashboard)

**Prompt:**
```
Rol: Sos un desarrollador frontend senior especializado en Tailwind CSS y diseño de paneles de administración (dashboards internos tipo SaaS).

Stack: Tailwind CSS vía CDN (no build tools, no archivo de configuración externo — la configuración se hace inline con <script>tailwind.config = {...}</script> dentro del <head>). JavaScript vanilla no aplica en este prompt (el toggle de modo oscuro se cablea en un prompt posterior).

Restricciones:
- No cambies la estructura de etiquetas HTML ni el contenido/texto que ya existe. Solo agregá clases de Tailwind (y las etiquetas de <head> necesarias: Tailwind CDN, Google Fonts, tailwind.config).
- Nada de CSS externo ni atributos style en línea — todo con clases utilitarias de Tailwind.
- darkMode: 'class' en la config de Tailwind (el toggle real de modo oscuro se implementa después; por ahora solo necesito que las clases dark: estén aplicadas y listas).
- Tipografía: Inter para texto general, Plus Jakarta Sans para títulos (cargadas desde Google Fonts).
- Paleta de color:
  - Fondo modo claro: slate-50 / white. Fondo modo oscuro: slate-950 / slate-900.
  - Tarjetas: bg-white border-slate-200 (claro) / bg-slate-900 border-slate-800 (oscuro), rounded-lg, shadow-sm.
  - Ingresos totales → acento emerald.
  - Pérdidas por descuentos → acento amber.
  - Agentes activos → acento indigo.
  - Agentes fallando → acento rose.
- Sidebar: fondo diferenciado del contenido principal, ancho fijo en desktop, con el link "Dashboard" resaltado como activo (ya que este archivo es index.html).
- Grid de tarjetas: 1 columna en mobile, 2 en tablet, 4 en desktop.
- El botón del toggle debe verse como un control de UI real (ícono o texto dentro de un botón con padding, borde redondeado), aunque todavía no tenga funcionalidad de JS.

Contenido: Aplicá estilos de Tailwind al archivo HTML index.html (structure + content ya definidos, no los alteres). #file:index.html
```

## js/app.js — Toggle, dropdowns y modales (genérico)

**Prompt:**
```
Rol: Sos un desarrollador frontend senior especializado en JavaScript vanilla, sin frameworks ni librerías externas.

Stack: JavaScript vanilla puro (sin jQuery, sin build tools). Este archivo se va a importar desde 6 páginas HTML distintas del mismo proyecto, así que todo el código debe ser genérico y reutilizable, no específico de una sola página.

Restricciones:
- No uses ninguna librería externa.
- El código debe ejecutarse solo después de que el DOM esté cargado (usá DOMContentLoaded o el atributo defer en el <script>).
- No asumas que existen dropdowns o modales en la página — el código debe funcionar aunque una página no tenga ninguno (por ejemplo, el Dashboard no tiene ninguno de los dos).

Contenido: Necesito que generes js/app.js con 3 funcionalidades independientes:

1. TOGGLE DE MODO OSCURO
   - Busca el botón con id="dark-mode-toggle".
   - Al hacer click, alterna la clase "dark" en el elemento <html>.
   - Guarda la preferencia en localStorage con la clave "theme" (valores "dark" o "light").
   - Al cargar la página, si localStorage tiene "theme" = "dark", aplicá la clase "dark" al <html>. Si no hay nada guardado en localStorage, NO apliques la clase dark (el default debe ser modo claro, nunca oscuro por defecto).

2. DROPDOWNS DE ACCIONES (⋮) GENÉRICOS
   - Cada dropdown en el proyecto va a tener un botón disparador con el atributo data-dropdown-trigger, y su menú asociado con data-dropdown-menu (ambos dentro de un mismo contenedor padre).
   - Al hacer click en el trigger, mostrar/ocultar el menú asociado (alternando una clase "hidden").
   - Si hay varios dropdowns abiertos en la página, al abrir uno nuevo se deben cerrar los demás.
   - Al hacer click en cualquier parte de la página que esté FUERA de un dropdown abierto, ese dropdown debe cerrarse.

3. MODALES GENÉRICOS
   - Cada modal va a tener un contenedor con data-modal="nombre-del-modal" (oculto por defecto con la clase "hidden"), y se abre mediante algún elemento con data-modal-open="nombre-del-modal".
   - Cada modal contiene un botón de cierre con data-modal-close="nombre-del-modal", y un backdrop (el fondo oscuro) con data-modal-backdrop="nombre-del-modal".
   - Al hacer click en data-modal-open, quitar la clase "hidden" del modal correspondiente.
   - Al hacer click en el botón de cierre O en el backdrop, volver a agregar la clase "hidden".

Generá el archivo completo, comentado en español, dividiendo claramente las 3 secciones con comentarios.
```