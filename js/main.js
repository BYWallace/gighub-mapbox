var map = L.mapbox.map('map', 'examples.map-i80bb8p3');
L.mapbox.featureLayer()
  .loadURL('data/sweetgreen.geojson')
  .addTo(map);

var locations = L.mapbox.featureLayer().addTo(map);
locations.loadURL('data/sweetgreen.geojson');

var listings = document.getElementById('listing');

locations.on('ready', function() {
  locations.eachLayer(function(locale) {
    // Parse into the geojson for each locale
    var prop = locale.feature.properties;

    var listing = listings.appendChild(document.createElement('div'));
    listing.className = 'item';

    var link = listing.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'title';
    link.innerHTML = prop.address;

    if (prop.crossStreet) {
      link.innerHTML += '<br /><small>' + prop.crossStreet + '</small>';
    }

    var details = listing.appendChild(document.createElement('div'));
    details.innerHTML = prop.city;

    if (prop.phone) {
      details.innerHTML += ' &middot; ' + prop.phoneFormatted;
    }

    link.onclick = function() {
      // 1. Toggle an active class for `listing`. View the source in the demo link for example.

      // 2. When a menu item is clicked, animate the map to center its associated locale and open its popup.
      map.setView(locale.getLatLng(), 16);
      locale.openPopup();
    };

    var popup = 'Sweetgreen';
    locale.bindPopup(popup);

    locale.on('click', function() {
      map.setView(locale.getLatLng, 16);
    });
  });
});
