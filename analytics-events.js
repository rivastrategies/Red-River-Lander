(function () {
  'use strict';

  if (window.rrAnalytics) return;

  function destinationFor(host, path) {
    if (host === 'redriverbbq.com') {
      if (path.indexOf('/league-city') === 0) return 'bbq_league_city';
      if (path.indexOf('/katy') === 0) return 'bbq_katy';
      return 'red_river_bbq';
    }
    if (host === 'redrivercantina.com') {
      if (path.indexOf('/leaguecity') === 0) return 'cantina_league_city';
      if (path.indexOf('/richmond') === 0) return 'cantina_richmond';
      return 'red_river_cantina';
    }
    if (host === '1822kitchenandbar.com') return '1822_memorial';
    if (host === 'kiershcateringevents.com') return 'kiersh_catering_events';
    return '';
  }

  function trackEvent(name, params) {
    var clean = { brand: 'red_river_restaurants' };
    if (params && typeof params.location_id === 'string') {
      clean.location_id = params.location_id.slice(0, 80);
    }
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, clean);
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: name }, clean));
    }
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    try {
      var url = new URL(link.getAttribute('href'), window.location.href);
      var locationId = destinationFor(url.hostname.toLowerCase(), url.pathname.toLowerCase());
      if (locationId) trackEvent('select_location', { location_id: locationId });
    } catch (error) {}
  });

  window.rrAnalytics = { trackEvent: trackEvent };
})();
