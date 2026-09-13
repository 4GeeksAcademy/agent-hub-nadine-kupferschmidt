/**
 * AgentHub - Funcionalidad genérica e interactiva
 * Manejo de Modo Oscuro, Dropdowns y Modales
 */

document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       1. TOGGLE DE MODO OSCURO
       ========================================================================== */
    const initDarkMode = () => {
        const toggleBtn = document.getElementById('dark-mode-toggle');
        const rootElement = document.documentElement;

        // Inicializar tema según preferencia guardada en localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            rootElement.classList.add('dark');
        } else {
            // Default explícito: modo claro (no se agrega la clase 'dark')
            rootElement.classList.remove('dark');
        }

        // Si el botón existe en la página actual, registrar el evento click
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const isDark = rootElement.classList.toggle('dark');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            });
        }
    };

    /* ==========================================================================
       2. DROPDOWNS DE ACCIONES (⋮) GENÉRICOS
       ========================================================================== */
    const initDropdowns = () => {
        // Cerrar todos los menús desplegables abiertos
        const closeAllDropdowns = () => {
            const openMenus = document.querySelectorAll('[data-dropdown-menu]:not(.hidden)');
            openMenus.forEach(menu => menu.classList.add('hidden'));
        };

        // Delegación de eventos para clicks en triggers de dropdowns
        document.addEventListener('click', (event) => {
            const trigger = event.target.closest('[data-dropdown-trigger]');

            if (trigger) {
                event.stopPropagation();
                // Buscar el menú dentro del mismo contenedor padre
                const container = trigger.closest('[data-dropdown-container]') || trigger.parentElement;
                const menu = container ? container.querySelector('[data-dropdown-menu]') : null;

                if (menu) {
                    const isCurrentlyHidden = menu.classList.contains('hidden');
                    // Cerrar todos los demás dropdowns antes de abrir/alternar
                    closeAllDropdowns();
                    if (isCurrentlyHidden) {
                        menu.classList.remove('hidden');
                    }
                }
                return;
            }

            // Si el click no fue dentro de un menú desplegable, cerrar cualquier dropdown abierto
            const isClickInsideMenu = event.target.closest('[data-dropdown-menu]');
            if (!isClickInsideMenu) {
                closeAllDropdowns();
            }
        });
    };

    /* ==========================================================================
       3. MODALES GENÉRICOS
       ========================================================================== */
    const initModals = () => {
        // Abrir modal mediante elementos con data-modal-open
        document.addEventListener('click', (event) => {
            const openBtn = event.target.closest('[data-modal-open]');
            if (openBtn) {
                event.preventDefault();
                const modalName = openBtn.getAttribute('data-modal-open');
                const targetModal = document.querySelector(`[data-modal="${modalName}"]`);
                if (targetModal) {
                    targetModal.classList.remove('hidden');
                }
                return;
            }

            // Cerrar modal mediante botón de cierre o backdrop
            const closeBtn = event.target.closest('[data-modal-close]');
            const backdrop = event.target.closest('[data-modal-backdrop]');

            if (closeBtn) {
                event.preventDefault();
                const modalName = closeBtn.getAttribute('data-modal-close');
                const targetModal = document.querySelector(`[data-modal="${modalName}"]`);
                if (targetModal) {
                    targetModal.classList.add('hidden');
                }
                return;
            }

            if (backdrop) {
                event.preventDefault();
                const modalName = backdrop.getAttribute('data-modal-backdrop');
                const targetModal = document.querySelector(`[data-modal="${modalName}"]`);
                if (targetModal) {
                    targetModal.classList.add('hidden');
                }
            }
        });
    };

    /* ==========================================================================
       4. MENÚ MÓVIL
       ========================================================================== */
    const initMobileMenu = () => {
        const toggleBtn = document.getElementById('mobile-menu-toggle');
        const nav = document.querySelector('nav');
        const backdrop = document.getElementById('mobile-menu-backdrop');

        if (toggleBtn && nav && backdrop) {
            toggleBtn.addEventListener('click', () => {
                nav.classList.toggle('-translate-x-full');
                backdrop.classList.toggle('hidden');
            });

            backdrop.addEventListener('click', () => {
                nav.classList.add('-translate-x-full');
                backdrop.classList.add('hidden');
            });
        }
    };

    // Inicializar los módulos
    initDarkMode();
    initDropdowns();
    initModals();
    initMobileMenu();
});
