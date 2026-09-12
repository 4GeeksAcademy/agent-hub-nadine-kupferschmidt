# SPECS.md — AgentHub Admin Panel

## Producto

AgentHub es una plataforma SaaS donde empresas pueden alquilar agentes de IA — asistentes inteligentes preconfigurados que se equipan con distintas skills (habilidades como navegar por la web, leer documentos o gestionar calendarios) y se despliegan para tareas de negocio específicas.

Este panel de administración es una herramienta **interna**, usada por el equipo de AgentHub (no por los clientes finales). El usuario administrador gestiona la cartera completa de clientes y agentes de la plataforma: monitorea ingresos, controla usuarios registrados, administra los agentes desplegados, gestiona el catálogo de skills disponibles, revisa los contratos de alquiler activos/pasados, y monitorea errores de ejecución de los agentes.

## Stack tecnológico y restricciones

- HTML + Tailwind CSS vía CDN para todos los estilos.
- JavaScript vanilla únicamente — sin frameworks (React, Vue, etc.), sin jQuery, sin herramientas de build.
- Sin backend ni conexión a APIs — todos los datos están hardcodeados directamente en el HTML.
- Sin archivos CSS personalizados ni atributos `style` en línea — todo el estilo se resuelve con clases utilitarias de Tailwind.
- Modo claro/oscuro implementado con las utilidades `dark:` de Tailwind, controlado por un toggle en la barra superior, con el estado persistente al navegar entre secciones.
- El modo por defecto al cargar cualquier página es el modo claro. El modo oscuro se activa únicamente cuando el usuario lo elige con el toggle; no debe aplicarse `class="dark"` al `<html>` de forma predeterminada en el HTML ni en el JS de inicio.
- HTML semántico (`section`, `table`, `nav`, `header`, `main`, etc.) en todo el documento.
- Layout usable en viewports de escritorio y tablet.

## 1. Dashboard

1. Cuatro tarjetas de métrica dispuestas en una cuadrícula responsive (2 columnas en tablet, 4 en desktop, 1 en mobile), cada una con: ícono representativo (SVG o emoji), etiqueta descriptiva y valor hardcodeado en tamaño grande.
   - Tarjeta 1: "Ingresos totales (este mes)" — valor ej. $48,200
   - Tarjeta 2: "Pérdida por descuentos/cupones" — valor ej. $3,150
   - Tarjeta 3: "Agentes activos" — valor ej. 132
   - Tarjeta 4: "Agentes fallando" — valor ej. 4
2. Cada tarjeta usa un color de acento distinto según el tipo de métrica (ej. verde para ingresos, rojo para pérdidas/fallas, azul para agentes activos), con borde o fondo suave del color, y una sombra sutil (`shadow-sm` o `shadow-md`).
3. Debajo de las tarjetas, un contenedor de ancho completo con borde punteado (`border-dashed`), altura fija (ej. `h-64`), y un texto centrado tipo "Gráfico de actividad semanal (placeholder)" que representa el futuro gráfico.
4. Toda la sección respeta el modo oscuro: fondos, textos y bordes cambian con las utilidades `dark:` sin perder contraste ni legibilidad.

## 2. Gestión de usuarios

1. Una tabla con columnas: Nombre, Email, Plan, Estado (badge de color: activo/inactivo/suspendido). Al menos 5 filas de usuarios hardcodeados.
2. Cada fila tiene un botón "⋮" al final. Al hacer click, se abre un menú desplegable pequeño (dropdown) con dos opciones: "Ver detalle" y "Eliminar".
3. Al hacer click en "Ver detalle", se abre un modal (ventana superpuesta con fondo oscuro semi-transparente detrás) que muestra el registro completo de ese usuario.
4. El modal se cierra de dos formas: con un botón de cierre (X) dentro del modal, o haciendo click en el fondo oscuro (backdrop) que está detrás.
5. El dropdown se cierra automáticamente si el usuario hace click en cualquier otro lugar de la pantalla (fuera del menú).

## 3. Gestión de agentes

1. Un listado con al menos 4 agentes, cada uno mostrando: nombre del agente, propietario, badge de estado (activo/inactivo/fallando).
2. Cada agente tiene una lista de skills oculta por defecto, con un botón/ícono de flecha para expandirla. Al hacer click, la lista se despliega con una transición suave (no aparece de golpe); un segundo click la vuelve a colapsar.
3. Cada agente tiene un dropdown "⋮" con dos opciones: "Configurar" y "Eliminar".
4. "Configurar" abre un modal que contiene un `<textarea>` editable con el system prompt (instrucciones) del agente. El modal se cierra con botón de cierre o click en el backdrop.
5. El dropdown se cierra al hacer click fuera de él, igual que en la sección de usuarios.

## 4. Skills (catálogo)

1. Un catálogo con al menos 4 skills, cada una mostrando: nombre, descripción breve, y un contador de cuántos agentes la tienen habilitada actualmente (ej. "Usada por 12 agentes").
2. Un texto explicativo visible en la parte superior de la sección, que describe brevemente qué es una "skill" en AgentHub (una habilidad que se le puede asignar a un agente, ej. navegar la web, leer documentos, gestionar calendarios).
3. Cada skill tiene un dropdown "⋮" con dos opciones: "Ver detalle" y "Eliminar" (mismo patrón que en Gestión de usuarios).

## 5. Contrataciones de agentes

1. Una tabla con al menos 4 contratos, mostrando: cliente, agente alquilado, skills contratadas (resumidas, ej. como badges chiquitos), fecha de inicio, fecha de fin, y monto total pagado.
2. Cada fila tiene un dropdown "⋮" con la opción "Ver detalle".
3. "Ver detalle" abre un modal con el desglose completo del contrato: datos generales (cliente, agente, fechas) más una lista línea por línea de cada skill contratada junto a su precio individual, y el total al final.
4. El modal se cierra con botón de cierre o con click en el backdrop, igual que en las secciones anteriores.

## 6. Log de errores

1. Una tabla/lista con al menos 6 entradas de error hardcodeadas, mostrando: timestamp, nombre del agente, badge de tipo de error (con color distinto según gravedad: rojo=crítico, amarillo=advertencia, azul=informativo), y una descripción breve.
2. Cada entrada tiene un dropdown "⋮" con dos opciones: "Ver detalle" y "Marcar como resuelto".
3. "Ver detalle" abre un modal con la traza completa del error (texto técnico simulado, ej. stack trace). Se cierra con botón de cierre o click en backdrop.
4. "Marcar como resuelto" cambia visualmente el estado de esa fila (ej. cambia el badge a "Resuelto" en verde, o la atenúa).

## Inventario de componentes

- **Sidebar (barra lateral):** navegación persistente con enlaces a las 6 secciones, resalta la sección activa. Presente en todas las vistas.
- **Topbar:** barra superior con el toggle de modo claro/oscuro.
- **Tarjeta de métrica:** ícono + etiqueta + valor, con color de acento. Usada en Dashboard.
- **Dropdown de acciones (⋮):** botón que despliega un menú pequeño con 2 opciones. Se cierra al hacer click afuera. Usado en las 5 secciones con tablas/listas (todas menos Dashboard).
- **Modal:** ventana superpuesta con backdrop oscuro. Se cierra con botón de cierre o click en el backdrop. Usado en Usuarios, Agentes, Skills, Contrataciones, Log de errores.
- **Badge:** etiqueta chica con color de fondo (estado o tipo). Usado en Usuarios, Agentes, Log de errores.
- **Lista colapsable:** contenido oculto que se expande/colapsa con transición suave al hacer click. Usado en Gestión de agentes.
- **Toggle de modo oscuro:** interruptor que cambia todo el panel entre claro/oscuro, y mantiene el estado al cambiar de sección.

## Criterios de aceptación

1. Las 6 secciones existen y son accesibles desde la sidebar, con indicador visual de sección activa.
2. El toggle de modo claro/oscuro cambia todo el panel usando utilidades `dark:` de Tailwind, y el modo elegido se mantiene al navegar entre secciones.
3. El Dashboard muestra 4 tarjetas de métrica con valores hardcodeados y un placeholder de gráfico semanal debajo.
4. La tabla de usuarios tiene al menos 5 filas, cada una con dropdown ⋮ funcional ("Ver detalle" y "Eliminar").
5. "Ver detalle" en Usuarios abre un modal con el registro completo; el modal cierra con botón de cierre y con click en el backdrop.
6. La sección de agentes lista al menos 4 agentes, cada uno con skills colapsadas por defecto que se expanden/colapsan con transición suave al hacer click.
7. Cada agente tiene dropdown ⋮ con "Configurar" (abre modal con `<textarea>` del system prompt) y "Eliminar".
8. El catálogo de Skills muestra al menos 4 skills con nombre, descripción y contador de agentes que la usan, más un texto explicativo de qué es una skill.
9. La tabla de Contrataciones tiene al menos 4 contratos; "Ver detalle" abre un modal con el desglose de skills contratadas y su precio individual.
10. El Log de errores tiene al menos 6 entradas con timestamp, agente, badge de tipo con color por gravedad, y descripción.
11. Cada dropdown ⋮ del panel se cierra al hacer click fuera de su área.
12. Los mismos nombres de agentes se repiten de forma consistente entre Gestión de agentes, Contrataciones y Log de errores (no se inventan nombres distintos en cada sección).
13. Se usa HTML semántico (`section`, `table`, `nav`, `header`, `main`) en todo el documento.
14. Todos los modales (en las secciones donde aparecen) cierran tanto con el botón de cierre como con click en el backdrop.
15. Las clases utilitarias de Tailwind se usan de forma consistente en todo el proyecto, sin estilos en línea (`style=`) ni archivos CSS externos.
16. El layout es usable tanto en viewports de escritorio como de tablet.
