(function() {
  function bySelAll(sel, root) { return Array.prototype.slice.call((root||document).querySelectorAll(sel)); }
  function setPressed(container, lang) {
    bySelAll('[data-set-lang]', container).forEach(function(btn){
      var on = btn.getAttribute('data-set-lang') === lang;
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (on) btn.classList.add('active'); else btn.classList.remove('active');
    });
  }
  function applyLang(lang) {
    bySelAll('[data-lang]').forEach(function(el){
      el.style.display = (el.getAttribute('data-lang') === lang) ? '' : 'none';
    });
    bySelAll('.lang-toggle').forEach(function(toggle){ setPressed(toggle, lang); });
  }
  function pickInitialLang() {
    try {
      var saved = localStorage.getItem('siteLang');
      if (saved) return saved;
    } catch(e) {}
    if (typeof window.defaultLang === 'string') return window.defaultLang;
    return 'es';
  }
  function setLang(lang) {
    try { localStorage.setItem('siteLang', lang); } catch(e) {}
    applyLang(lang);
  }
  document.addEventListener('DOMContentLoaded', function() {
    var lang = pickInitialLang();
    applyLang(lang);
    bySelAll('.lang-toggle [data-set-lang]').forEach(function(btn){
      btn.addEventListener('click', function(){
        var chosen = btn.getAttribute('data-set-lang') || 'es';
        setLang(chosen);
      });
    });
  });
})();
