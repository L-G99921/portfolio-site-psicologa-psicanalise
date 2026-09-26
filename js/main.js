/* =========================================================
   Helena Vasconcelos — interações (leves e calmas)
   ========================================================= */
(function () {
  'use strict';

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  /* ---------- Ano no rodapé ---------- */
  var year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Modo noturno ("luminária") ---------- */
  var themeBtn = $('.theme-toggle');
  function isDark() {
    var t = root.getAttribute('data-theme');
    if (t) return t === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function syncThemeLabel() {
    if (themeBtn) themeBtn.setAttribute('aria-label', isDark() ? 'Acender a luz (modo claro)' : 'Modo noturno');
  }
  if (themeBtn) {
    syncThemeLabel();
    themeBtn.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('hv-theme', next); } catch (e) {}
      syncThemeLabel();
    });
  }

  /* ---------- Header ---------- */
  var header = $('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Menu móvel ---------- */
  var menuBtn = $('.menu-toggle');
  var mobileNav = $('#mobile-nav');
  function setMenu(open) {
    mobileNav.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    $('use', menuBtn).setAttribute('href', open ? '#i-x' : '#i-menu');
  }
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () { setMenu(mobileNav.hidden); });
    $$('a', mobileNav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !mobileNav.hidden) { setMenu(false); menuBtn.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 1080 && !mobileNav.hidden) setMenu(false); });
  }

  /* ---------- Revelação suave ao rolar ---------- */
  var revealEls = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    revealEls.forEach(function (el) {
      var siblings = $$(':scope > [data-reveal]', el.parentElement);
      var i = siblings.indexOf(el);
      if (i > 0) el.style.transitionDelay = Math.min(i, 6) * 90 + 'ms';
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Item ativo no menu ---------- */
  var navLinks = $$('.main-nav a[href^="#"]');
  if ('IntersectionObserver' in window && navLinks.length) {
    var byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var navIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = byId[entry.target.id];
        if (link && entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('is-active'); l.removeAttribute('aria-current'); });
          link.classList.add('is-active');
          link.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) { var s = document.getElementById(id); if (s) navIo.observe(s); });
  }

  /* ---------- FAQ: um item aberto por vez ---------- */
  var details = $$('.accordion details');
  details.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) details.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* ---------- Tempo de leitura (páginas de texto) ---------- */
  var prose = $('.prose');
  var readEl = $('[data-read-time]');
  if (prose && readEl) {
    var words = prose.textContent.trim().split(/\s+/).length;
    readEl.textContent = Math.max(1, Math.ceil(words / 200)) + ' min de leitura';
  }

  /* ---------- Formulário de contato ---------- */
  var form = $('#contact-form');
  if (!form) return;

  function setError(input, msg) {
    var field = input.closest('.field');
    var slot = field ? $('.field-error', field) : $('[data-for="' + input.name + '"]', form);
    if (field) field.classList.toggle('has-error', !!msg);
    if (slot) slot.textContent = msg || '';
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  }

  function validate(input) {
    var v = (input.value || '').trim();
    var msg = '';
    if (input.name === 'nome' && v.length < 2) msg = 'Como posso te chamar?';
    if (input.name === 'contato') {
      var digits = v.replace(/\D/g, '');
      var isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
      if (!isEmail && digits.length < 10) msg = 'Informe um e-mail ou um WhatsApp com DDD.';
    }
    if (input.name === 'consentimento' && !input.checked) msg = 'Preciso da sua autorização para responder.';
    setError(input, msg);
    return !msg;
  }

  var required = $$('[required]', form);
  required.forEach(function (input) {
    input.addEventListener('blur', function () { if (input.value && input.type !== 'checkbox') validate(input); });
    input.addEventListener('input', function () { if (input.getAttribute('aria-invalid') === 'true') validate(input); });
    input.addEventListener('change', function () { if (input.getAttribute('aria-invalid') === 'true') validate(input); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var firstInvalid = null;
    required.forEach(function (input) { if (!validate(input) && !firstInvalid) firstInvalid = input; });
    if (firstInvalid) { firstInvalid.focus(); return; }

    var btn = $('button[type="submit"]', form);
    btn.disabled = true;
    btn.textContent = 'Enviando…';

    // Site estático: o envio é simulado. Troque por um fetch() para o seu serviço de formulários.
    setTimeout(function () {
      var data = new FormData(form);
      var modal = { presencial: 'presencial', online: 'online', indiferente: 'presencial ou online' }[data.get('modalidade')];
      var msg = 'Oi, Helena! Aqui é ' + data.get('nome') + '. Queria marcar uma primeira conversa (' + modal + ').' +
        (data.get('horario') ? ' Para mim funciona melhor: ' + data.get('horario') + '.' : '');
      $('#wa-link').href = 'https://wa.me/5511900000000?text=' + encodeURIComponent(msg);

      form.hidden = true;
      var ok = $('#form-success');
      ok.hidden = false;
      ok.focus();
    }, 700);
  });
})();
