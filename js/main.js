var map = L.mapbox.map('map', 'examples.map-i80bb8p3')
  .setView([38.8951, -77.0367], 10);

L.mapbox.featureLayer()
  .addTo(map);

var concerts = L.mapbox.featureLayer().addTo(map);

$.ajax({
  url: "http://api.seatgeek.com/2/events?geoip=50.200.196.50&range=25mi&datetime_local=2014-08-07&taxonomies.name=concert",
  type: "get",
  dataType: "json",
  context: this
}).then(createMarkers);

var markers = [];

function createMarkers(response) {
  var events = response.events;

  for (var i=0; i<events.length; i++) {

    var marker = L.marker([events[i].venue.location.lat, events[i].venue.location.lon], {
      icon: L.mapbox.marker.icon({
        'marker-color': '#0072b1'
      })
    }).addTo(map);
  }

  createListings(events);
}

function createListings(events) {
  var listings = '';

  for (var i=0; i<events.length; i++) {
    var dataHTML = 'data-lat="' + events[i].venue.location.lat + '" data-lon="' + events[i].venue.location.lon;
    listings += '<div id="listing" class="listings" ' + dataHTML + '"><h2>' + events[i].title + '</h2>' + events[i].venue.name +'</div>';
  }
  $(".sidebar").append(listings);

  $(".listings").on('click', function() {
    map.setView([$(this).data("lat"), $(this).data("lon")], 15);
  });
}
