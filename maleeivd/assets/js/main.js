// krooMalee — shared front-end behaviour (header shadow, back-to-top, embed loaders)

document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.site-header');
  var toTop = document.getElementById('toTop');

  if (header || toTop) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (header) {
        header.style.boxShadow = y > 10 ? '0 8px 24px -12px rgba(74,16,23,.25)' : 'none';
      }
      if (toTop) {
        toTop.classList.toggle('show', y > 500);
      }
    });
  }

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Close the mobile navbar after tapping a link
  var navCollapseEl = document.getElementById('siteNav');
  if (navCollapseEl && window.bootstrap) {
    var collapseInstance = window.bootstrap.Collapse.getOrCreateInstance(navCollapseEl, { toggle: false });
    navCollapseEl.querySelectorAll('a.nav-link, a.btn-nav-cta').forEach(function (link) {
      link.addEventListener('click', function () {
        collapseInstance.hide();
      });
    });
  }

  // Hide the loading spinner once an embedded iframe (Google Form / Wordwall game) finishes loading
  document.querySelectorAll('iframe[data-loader]').forEach(function (iframe) {
    var loader = document.getElementById(iframe.getAttribute('data-loader'));
    if (!loader) return;
    iframe.addEventListener('load', function () {
      loader.classList.add('hide');
    });
  });
});
