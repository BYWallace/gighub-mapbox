navigator.geolocation.getCurrentPosition(function(position) {
  generateMap(position.coords.latitude, position.coords.longitude);
});

var generateMap = function(geoLat, geoLon) {
  var currentDate = new Date(Date.now());
  var convertedDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();

  var map = L.mapbox.map('map', 'examples.map-i80bb8p3')
    .setView([geoLat, geoLon], 10);

  $.ajax({
    url: "http://api.seatgeek.com/2/events?lat=" + geoLat + "&lon=" + geoLon + "&range=25mi&datetime_local=" + convertedDate + "&taxonomies.name=concert",
    type: "get",
    dataType: "json",
    context: this
  }).then(createMarkers);

  L.marker([geoLat, geoLon], {
    icon: L.mapbox.marker.icon({
      'marker-color': '#dd4b39',
      'marker-symbol': 'star'
    })
  }).addTo(map);

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
      var concertTime = new Date(events[i].datetime_local);
      var hour = concertTime.getHours();
      concertTime.setHours(hour + 3);
      listings += '<div id="listing" class="listings" ' + dataHTML + '"><span class="titles">' + events[i].title + '</span><br><span>' + events[i].venue.name +'</span><span class="time">' + concertTime.toLocaleTimeString().replace(':00','') + '</span></div>';
    }
    $(".sidebar").append(listings);

    $(".listings").on('click', function() {
      map.setView([$(this).data("lat"), $(this).data("lon")], 15);
    });
  }
};
