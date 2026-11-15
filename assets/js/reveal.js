/*
 * Apparition douce des blocs au défilement (ScrollReveal).
 * - data-reveal        : le bloc apparaît d'un seul tenant
 * - data-reveal-group  : ses enfants directs apparaissent en cascade
 * Rien n'est masqué si ScrollReveal ne charge pas ou si le visiteur
 * a demandé à réduire les animations.
 */
document.addEventListener('DOMContentLoaded', function () {
    if (typeof ScrollReveal === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var sr = ScrollReveal({
        origin: 'bottom',
        distance: '24px',
        duration: 900,
        easing: 'cubic-bezier(.2, .7, .2, 1)',
        viewFactor: 0.15
    });

    sr.reveal('[data-reveal]');
    document.querySelectorAll('[data-reveal-group]').forEach(function (group) {
        sr.reveal(group.children, { interval: 120 });
    });
});
