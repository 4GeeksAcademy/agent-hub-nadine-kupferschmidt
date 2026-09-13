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

---

## users.html — Estructura + Contenido (Gestión de usuarios)

**Prompt:**
```
Rol: Sos un desarrollador frontend que sigue un proceso de construcción por capas (estructura → contenido → estilo), sin adelantarte a la capa de estilo todavía.

Stack: HTML semántico puro. Sin Tailwind, sin ninguna clase CSS, sin atributos style todavía — eso viene en un prompt posterior. Sí podés usar los atributos data-* que te indico abajo, porque son ganchos para el JavaScript ya existente (js/app.js), no estilos.

Restricciones:

Reutilizá exactamente la misma barra lateral (<nav>) y barra superior (<header>) de index.html (#file:index.html), cambiando solo: el <h1> por "Gestión de usuarios", y el link activo de la sidebar de "Dashboard" a "Gestión de usuarios".
El contenido de <main> es completamente nuevo para esta página (no reutilices las tarjetas del Dashboard).
Los dropdowns deben usar estos atributos (ya soportados por js/app.js): un contenedor con data-dropdown-container, un botón trigger con data-dropdown-trigger, y el menú con data-dropdown-menu (con clase "hidden" por defecto).
El modal de detalle debe usar: un botón/ícono con data-modal-open="user-detail-{id}" (un id único por fila), un contenedor con data-modal="user-detail-{id}" (con clase "hidden" por defecto), un botón de cierre con data-modal-close="user-detail-{id}", y un backdrop con data-modal-backdrop="user-detail-{id}".
No agregues JavaScript propio de esta página — toda la interactividad ya la maneja js/app.js de forma genérica.

Contenido: Necesito el HTML completo (estructura + contenido, sin estilos) para la sección "Gestión de usuarios" de un panel de administración interno llamado AgentHub. Especificación:

Una tabla con columnas: Nombre, Email, Plan, Estado, Acciones. 5 filas con estos datos:
Marcela Rojas | marcela.rojas@brasaland.cr | Pro | Activo
Diego Fernández | diego.fernandez@ecoretail.com | Básico | Activo
Valentina Ruiz | valentina.ruiz@cafeandina.com | Enterprise | Activo
Andrés Solano | andres.solano@logitech-cr.com | Pro | Suspendido
Camila Herrera | camila.herrera@studiobyte.io | Básico | Inactivo
En la columna Estado, mostrá el valor como texto por ahora (el color del badge se aplica en la capa de Estilo).
En la columna Acciones, un botón "⋮" (dropdown trigger) que despliega un menú con dos opciones: "Ver detalle" y "Eliminar".
"Ver detalle" abre un modal único para esa fila, con el registro completo del usuario (nombre, email, plan, estado) y un botón de cierre.
Generá un id único por usuario (ej. user-1, user-2...) para que cada modal y su trigger correspondiente estén correctamente vinculados.

Generá el archivo completo, incluyendo <!DOCTYPE html>, <head> igual al de index.html (Tailwind CDN, Google Fonts, tailwind.config), y el <body> completo.
```

## users.html — Estilo (Gestión de usuarios)

**Prompt:**
```
Rol: Sos un desarrollador frontend senior especializado en Tailwind CSS y diseño de paneles de administración (dashboards internos tipo SaaS).

Stack: Tailwind CSS vía CDN (misma configuración que index.html: darkMode 'class', Inter + Plus Jakarta Sans vía Google Fonts, tailwind.config inline en el <head>).

Restricciones:

No cambies la estructura de etiquetas HTML ni el contenido/texto que ya existe. Solo agregá clases de Tailwind.
Nada de CSS externo ni atributos style en línea.
Usá exactamente el mismo <head>, sidebar (<nav>) y barra superior (<header>) que ya tiene index.html (#file:index.html), pero con el link "Gestión de usuarios" resaltado como activo (usando las mismas clases que "Dashboard" tiene activas en index.html) y el resto de los links del sidebar con las clases de estado normal (no activo).
Tabla: encabezado (<thead>) con fondo levemente distinto al resto, texto en mayúsculas pequeñas para los headers, filas con borde inferior sutil separándolas, padding cómodo en cada celda, y un hover leve en cada fila (bg-slate-50 en claro / bg-slate-800/50 en oscuro).
Badges de estado (dentro de la columna Estado), como un span con fondo suave y texto del color correspondiente, rounded-full, padding pequeño:
"Activo" → emerald
"Suspendido" → amber
"Inactivo" → slate (gris neutro)
El botón "⋮" (data-dropdown-trigger): sin fondo por defecto, hover con fondo gris suave, rounded, tamaño de click cómodo (al menos 32x32px).
El menú del dropdown (data-dropdown-menu): posicionado en absoluto justo debajo/al lado del botón que lo abre, con fondo blanco/slate-900, borde, rounded-lg, shadow-lg, ancho fijo razonable (ej. w-40), cada opción del menú como un botón de ancho completo con hover.
Los modales (data-modal): overlay de pantalla completa centrado (fixed inset-0, flex items-center justify-center), el backdrop (data-modal-backdrop) con fondo negro semi-transparente (bg-black/50) cubriendo toda la pantalla, y el contenido del modal como una tarjeta centrada (bg-white dark:bg-slate-900, rounded-lg, shadow-lg, padding, ancho máximo razonable tipo max-w-md).
Dentro del modal, la lista <dl>/<dt>/<dd> con buen espaciado entre pares (dt en gris más chico/label, dd en texto normal más marcado).
El botón "Cerrar" del modal con estilo de botón secundario (borde, sin relleno fuerte).

Contenido: Aplicá estilos de Tailwind a este archivo completo (estructura y contenido ya definidos, no los alteres): #file:users.html
```

---

## agents.html — Estructura + Contenido (Gestión de agentes)

**Prompt:**
```
Rol: Sos un desarrollador frontend que sigue un proceso de construcción por capas (estructura → contenido → estilo), sin adelantarte a la capa de estilo todavía.

Stack: HTML semántico puro. Sin Tailwind, sin ninguna clase CSS, sin atributos style todavía. Podés usar los atributos data-* de dropdown/modal, porque son ganchos para js/app.js ya existente.

Restricciones:

Reutilizá exactamente la misma barra lateral (<nav>) y barra superior (<header>) de index.html (#file:index.html), cambiando el <h1> a "Gestión de agentes" y el link activo de la sidebar a "Gestión de agentes".
Para la lista de skills colapsada, usá <details> y <summary> (etiquetas nativas de HTML para contenido expandible/colapsable) — NO uses JavaScript propio ni div con data-attributes para esto.
El dropdown de acciones usa los mismos atributos que ya soporta js/app.js: data-dropdown-container, data-dropdown-trigger, data-dropdown-menu.
El modal de "Configurar" usa los mismos atributos que ya soporta js/app.js: data-modal-open="agent-config-{id}", data-modal="agent-config-{id}", data-modal-close="agent-config-{id}", data-modal-backdrop="agent-config-{id}". Adentro del modal, el system prompt va en un <textarea> editable (no un <p>).
No agregues JavaScript propio de esta página.

Contenido: HTML completo (estructura + contenido, sin estilos) para "Gestión de agentes" de AgentHub. Especificación:

Un listado de 4 agentes, cada uno con: nombre, propietario, estado (texto por ahora), y un <details>/<summary> que al expandirse muestra sus skills:
SupportBot | Café Andina S.A. | Activo | Skills: Navegación web, Lectura de documentos
SalesAssist | EcoRetail | Activo | Skills: Gestión de calendario, Lectura de documentos
DocuParser | Brasaland | Fallando | Skills: Lectura de documentos
SchedulerAI | StudioByte | Activo | Skills: Gestión de calendario, Navegación web
Cada agente tiene un dropdown "⋮" con dos opciones: "Configurar" y "Eliminar".
"Configurar" abre un modal con un <textarea> que contiene un system prompt de ejemplo para ese agente (inventá un texto breve y coherente con el propósito del agente, ej. para SupportBot: "Sos un asistente de soporte al cliente. Respondé consultas sobre pedidos y devoluciones con tono amable y profesional.").
Generá ids únicos por agente (agent-1, agent-2, etc.) para vincular cada modal con su trigger.

Generá el archivo completo, con el mismo <head> que index.html.
```

## agents.html — Estilo (Gestión de agentes)

**Prompt:**
```
Rol: Sos un desarrollador frontend senior especializado en Tailwind CSS y diseño de paneles de administración.

Stack: Tailwind CSS vía CDN (misma configuración que index.html y users.html).

Restricciones:

No cambies la estructura de etiquetas ni el contenido/texto existente. Solo agregá clases de Tailwind.
Reutilizá el mismo <head>, sidebar y topbar que users.html (#file:users.html), con "Gestión de agentes" como link activo.
Cada agente como una tarjeta (bg-white/dark:bg-slate-900, border, rounded-lg, shadow-sm, padding), en una lista vertical con espaciado entre tarjetas.
Badge de Estado (mismo patrón que en users.html): Activo → emerald, Fallando → rose. Usá un <span> para el badge, no lo apliques al contenedor.
IMPORTANTE — transición suave del <details>: envolvé el <ul> de skills (dentro de cada <details>) en un <div class="grid grid-rows-[0fr] group-open:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out overflow-hidden">, y ese div a su vez con otro div interno con "overflow-hidden" adentro conteniendo el <ul> (necesario para que el grid-rows anime correctamente). Agregale la clase "group" al <details>. Esto logra una animación de expansión/colapso solo con CSS, sin necesitar JavaScript.
El <summary> debe ocultar su marcador nativo (usá "list-none" o "[&::-webkit-details-marker]:hidden") y en su lugar mostrar un ícono de flecha (▸ o similar) que rote 90 grados cuando el <details> está abierto, usando "group-open:rotate-90" y "transition-transform".
El dropdown y el modal siguen exactamente el mismo estilo visual que ya definimos en users.html (mismo dropdown flotante, mismo modal centrado con backdrop).
El <textarea> del modal debe verse como un campo de texto real: borde, rounded-lg, padding, ancho completo, fuente monoespaciada opcional para diferenciarlo visualmente de texto normal, con un alto mínimo cómodo para leer varias líneas.

Contenido: Aplicá estilos de Tailwind a este archivo completo (estructura y contenido ya definidos, no los alteres): #file:agents.html
```

---

## skills.html — Estructura + Contenido (Skills)

**Prompt:**
```
Rol: Sos un desarrollador frontend que sigue un proceso de construcción por capas (estructura → contenido → estilo), sin adelantarte a la capa de estilo todavía.

Stack: HTML semántico puro. Sin Tailwind, sin ninguna clase CSS, sin atributos style todavía. Podés usar los atributos data-* de dropdown/modal, porque son ganchos para js/app.js ya existente.

Restricciones:

Reutilizá exactamente la misma barra lateral (<nav>) y barra superior (<header>) de agents.html (#file:agents.html), cambiando el <h1> a "Skills" y el link activo de la sidebar a "Skills".
El dropdown usa los mismos atributos que ya soporta js/app.js: data-dropdown-container, data-dropdown-trigger, data-dropdown-menu.
El modal de "Ver detalle" usa: data-modal-open="skill-detail-{id}", data-modal="skill-detail-{id}", data-modal-close="skill-detail-{id}", data-modal-backdrop="skill-detail-{id}".
No agregues JavaScript propio de esta página.

Contenido: HTML completo (estructura + contenido, sin estilos) para el catálogo de "Skills" de AgentHub. Especificación:

Un texto explicativo al inicio de la sección (antes del catálogo) que describa qué es una "skill" en AgentHub: una habilidad que se le puede asignar a un agente para ampliar sus capacidades (ej. navegar la web, leer documentos, gestionar calendarios).
Un catálogo de 4 skills, cada una con nombre, descripción breve, y contador de agentes que la usan:
Navegación web | "Permite al agente buscar y leer información en sitios web en tiempo real." | Usada por 2 agentes
Lectura de documentos | "Permite al agente extraer y analizar contenido de archivos y documentos." | Usada por 3 agentes
Gestión de calendario | "Permite al agente coordinar reuniones y revisar disponibilidad." | Usada por 2 agentes
Envío de correos | "Permite al agente redactar y enviar correos electrónicos en nombre del cliente." | Usada por 1 agente
Cada skill tiene un dropdown "⋮" con dos opciones: "Ver detalle" y "Eliminar".
"Ver detalle" abre un modal con el nombre, descripción completa y contador de esa skill.
Generá ids únicos por skill (skill-1, skill-2, etc.) para vincular cada modal con su trigger.

Generá el archivo completo, con el mismo <head> que agents.html.
```

## skills.html — Estilo (Skills)

**Prompt:**
```
Rol: Sos un desarrollador frontend senior especializado en Tailwind CSS y diseño de paneles de administración.

Stack: Tailwind CSS vía CDN (misma configuración que agents.html).

Restricciones:

No cambies la estructura de etiquetas ni el contenido/texto existente. Solo agregá clases de Tailwind.
Reutilizá el mismo <head>, sidebar y topbar que agents.html (#file:agents.html), con "Skills" como link activo.
El texto explicativo de "qué es una skill" debe destacarse levemente del resto (ej. una caja con fondo sutil distinto, bg-slate-100/dark:bg-slate-800/50, rounded-lg, padding), para diferenciarlo visualmente del catálogo de tarjetas.
Las 4 skills en una cuadrícula (grid): 1 columna en mobile, 2 en tablet, no hace falta una tercera columna en desktop salvo que prefieras 2 fijas — elegí lo que se vea mejor con tarjetas de este tamaño.
Cada tarjeta de skill: mismo estilo de tarjeta que ya usamos (bg-white/dark:bg-slate-900, border, rounded-lg, shadow-sm, padding).
El contador "Usada por N agentes" debe destacarse un poco (ej. como una badge o texto en color indigo, sin necesitar fondo de color completo).
Dropdown: mismo estilo ya usado en users.html y agents.html.
Modales: mismo estilo centrado con backdrop que ya usamos — IMPORTANTE: no te olvides de la clase "flex" junto con "hidden" en el contenedor del modal (ej. "hidden fixed inset-0 z-50 flex items-center justify-center p-6"), sin esa clase el modal no se centra cuando se muestra.

Contenido: Aplicá estilos de Tailwind a este archivo completo (estructura y contenido ya definidos, no los alteres): #file:skills.html
```

---

## contracts.html — Estructura + Contenido (Contrataciones de agentes)

**Prompt:**
```
Rol: Sos un desarrollador frontend que sigue un proceso de construcción por capas (estructura → contenido → estilo), sin adelantarte a la capa de estilo todavía.

Stack: HTML semántico puro. Sin Tailwind, sin ninguna clase CSS, sin atributos style todavía. Podés usar los atributos data-* de dropdown/modal, porque son ganchos para js/app.js ya existente.

Restricciones:

Reutilizá exactamente la misma barra lateral (<nav>) y barra superior (<header>) de skills.html (#file:skills.html), cambiando el <h1> a "Contrataciones de agentes" y el link activo de la sidebar a "Contrataciones".
El dropdown usa los mismos atributos que ya soporta js/app.js: data-dropdown-container, data-dropdown-trigger, data-dropdown-menu.
El modal de "Ver detalle" usa: data-modal-open="contract-detail-{id}", data-modal="contract-detail-{id}", data-modal-close="contract-detail-{id}", data-modal-backdrop="contract-detail-{id}".
No agregues JavaScript propio de esta página.

Contenido: HTML completo (estructura + contenido, sin estilos) para "Contrataciones de agentes" de AgentHub. Especificación:

Una tabla con columnas: Cliente, Agente, Skills contratadas, Fecha inicio, Fecha fin, Total pagado, Acciones. 4 filas:
Café Andina S.A. | SupportBot | Navegación web, Lectura de documentos | 15/01/2026 | 15/07/2026 | $420
EcoRetail | SalesAssist | Gestión de calendario, Lectura de documentos | 01/02/2026 | 01/08/2026 | $380
Brasaland | DocuParser | Lectura de documentos | 01/11/2025 | 01/05/2026 | $200
StudioByte | SchedulerAI | Gestión de calendario, Navegación web | 10/03/2026 | 10/09/2026 | $400
Cada fila tiene un dropdown "⋮" con la opción "Ver detalle".
"Ver detalle" abre un modal con el desglose completo del contrato: cliente, agente, fechas, y una lista línea por línea de cada skill contratada con su precio individual, más el total al final. Usá estos precios unitarios para el desglose:
Navegación web: $220
Lectura de documentos: $200
Gestión de calendario: $180
Generá ids únicos por contrato (contract-1, contract-2, etc.) para vincular cada modal con su trigger.

Generá el archivo completo, con el mismo <head> que skills.html
```

## contracts.html — Estilo (Contrataciones de agentes)

**Prompt:**
```
Rol: Sos un desarrollador frontend senior especializado en Tailwind CSS y diseño de paneles de administración.

Stack: Tailwind CSS vía CDN (misma configuración que skills.html).

Restricciones:

No cambies la estructura de etiquetas ni el contenido/texto existente. Solo agregá clases de Tailwind.
Reutilizá el mismo <head>, sidebar y topbar que skills.html (#file:skills.html), con "Contrataciones" como link activo.
La tabla usa exactamente el mismo estilo que la de users.html (#file:users.html): mismo contenedor de tarjeta, mismo thead con fondo distinto y texto en mayúsculas pequeñas, mismas filas con hover y borde inferior. IMPORTANTE: no le agregues overflow-x-auto al contenedor (eso causó un bug con los dropdowns en una sección anterior).
Las columnas "Fecha inicio", "Fecha fin" y "Total pagado" deben estar alineadas a la derecha o usar una fuente monoespaciada sutil, para que sea fácil comparar montos y fechas de un vistazo entre filas.
El dropdown: mismo estilo que en las otras secciones, pero como acá el menú tiene solo UNA opción ("Ver detalle", sin "Eliminar"), ajustá el ancho del menú si hace falta para que no se vea desproporcionado.
El modal: mismo estilo centrado con backdrop y "flex" que ya usamos (no te olvides la clase "flex" junto con "hidden"). Dentro del modal, separá visualmente el bloque de datos generales (<dl>) del bloque de "Skills contratadas" (con un separador sutil, ej. border-t, o un fondo levemente distinto), y el total pagado al final debe destacarse (texto más grande o en negrita) ya que es el dato de cierre del desglose.

Contenido: Aplicá estilos de Tailwind a este archivo completo (estructura y contenido ya definidos, no los alteres): #file:contracts.html
```