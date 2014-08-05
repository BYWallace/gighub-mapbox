var map = L.mapbox.map('map', 'examples.map-i80bb8p3');
L.mapbox.featureLayer()
  .loadURL('data/sweetgreen.geojson')
  .addTo(map);
