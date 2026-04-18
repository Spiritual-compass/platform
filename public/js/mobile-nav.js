(function () {
    'use strict';

    var btn = document.getElementById('hamburgerBtn');
    var nav = document.querySelector('.header .nav');
    var header = document.querySelector('.header');
    if (!btn || !nav || !header) return;

    function positionNav() {
        // Place the dropdown exactly at the bottom of the sticky header
        nav.style.top = header.getBoundingClientRect().bottom + 'px';
    }

    function openMenu() {
        positionNav();
        nav.classList.add('nav-open');
        btn.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        nav.classList.remove('nav-open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', function () {
        nav.classList.contains('nav-open') ? closeMenu() : openMenu();
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
        if (!header.contains(e.target) && !nav.contains(e.target)) closeMenu();
    });
})();
