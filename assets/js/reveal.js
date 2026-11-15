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

    // ScrollReveal mémorise la position des blocs au chargement. Si la page change
    // de hauteur ensuite (police web, images, vidéos intégrées), on lui fait
    // recalculer ces positions, sinon les blocs du bas ne se déclenchent pas.
    var pending = null;
    function refresh() {
        clearTimeout(pending);
        pending = setTimeout(function () { window.dispatchEvent(new Event('resize')); }, 150);
    }
    if ('ResizeObserver' in window) {
        new ResizeObserver(refresh).observe(document.body);
    }
    window.addEventListener('load', refresh);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
});
