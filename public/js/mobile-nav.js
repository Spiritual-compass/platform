(function () {
    'use strict';

    function init() {
        var headerContent = document.querySelector('.header-content');
        var nav = document.querySelector('.header .nav');
        var header = document.querySelector('.header');
        if (!headerContent || !nav) return;

        // Make header a positioning context for the dropdown
        header.style.position = 'sticky';

        // Create hamburger button
        var btn = document.createElement('button');
        btn.className = 'hamburger';
        btn.setAttribute('aria-label', 'Toggle navigation');
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = '<span></span><span></span><span></span>';

        // Append to header-content (after logo, before/instead of CTA)
        headerContent.appendChild(btn);

        // Toggle menu
        btn.addEventListener('click', function () {
            var isOpen = nav.classList.toggle('nav-open');
            btn.classList.toggle('open', isOpen);
            btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close menu when a link is clicked
        nav.addEventListener('click', function (e) {
            if (e.target.classList.contains('nav-link')) {
                nav.classList.remove('nav-open');
                btn.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu on outside click
        document.addEventListener('click', function (e) {
            if (!header.contains(e.target)) {
                nav.classList.remove('nav-open');
                btn.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
