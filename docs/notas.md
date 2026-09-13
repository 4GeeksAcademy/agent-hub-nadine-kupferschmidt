# Notas del proyecto — AgentHub Admin Panel

## Qué es esto
Un prototipo de panel de administración para AgentHub (una plataforma ficticia de alquiler de agentes de IA). El panel es de uso interno, no para los clientes finales.

## Cómo lo hice

1. **Primero escribí la especificación (`SPECS.md`)**, antes de tocar código. Ahí definí qué debía tener cada una de las 6 secciones, qué componentes se repetían (sidebar, dropdowns, modales, badges) y una checklist de criterios de aceptación. Ese archivo se commiteó primero, antes que cualquier HTML.

2. **Usé Google Stitch** para generar una propuesta visual a partir del `SPECS.md`, y saqué de ahí la paleta de colores (fondo slate, acentos indigo/emerald/amber/rose), las tipografías (Plus Jakarta Sans para títulos, Inter para texto) y el logo.

3. **Construí cada página en 3 pasos** (Estructura → Contenido → Estilo), usando GitHub Copilot con prompts detallados para cada paso. Primero armaba el HTML sin estilos, después el contenido con los datos, y al final le aplicaba Tailwind CSS.

4. **Fui documentando cada prompt** en `docs/prompts.md`, con el prompt usado y el resultado obtenido, para dejar registro del proceso.

## Estructura del proyecto

- `SPECS.md` — la especificación completa.
- `docs/prompts.md` — todos los prompts usados con Copilot.
- 6 páginas HTML: `index.html` (Dashboard), `users.html`, `agents.html`, `skills.html`, `contracts.html`, `errors.html`.
- `js/app.js` — un solo archivo de JavaScript compartido por las 6 páginas, con la lógica de: modo oscuro, dropdowns de acciones (⋮), modales, y el menú hamburguesa para mobile.

## Decisiones importantes

- **Multi-página en vez de una sola página**, para que cada sección sea un archivo más chico y manejable.
- **El modo oscuro se guarda en `localStorage`**, así se mantiene aunque el usuario navegue entre secciones o recargue la página.
- **Los mismos 4 agentes** (SupportBot, SalesAssist, DocuParser, SchedulerAI) aparecen consistentemente en Gestión de agentes, Contrataciones y Log de errores.
- El panel funciona en **desktop, tablet y también mobile** (con menú hamburguesa y tablas que se convierten en tarjetas apiladas en pantallas chicas).

## Errores que aparecieron y cómo se resolvieron

- Clases de Tailwind inválidas (ej. un color que no existe) — se corrigieron reemplazándolas por la clase correcta.
- Un `<div>` sin su etiqueta de cierre en una sección — se corrigió agregando el cierre faltante.
- Dropdowns que se mostraban en fila en vez de en columna — se corrigió agregando `flex flex-col` a los menús.
- Parpadeo blanco al cambiar de página en modo oscuro — se corrigió aplicando la clase de modo oscuro apenas carga la página, antes de que se dibuje el contenido.