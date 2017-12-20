// Variables

var center,
    map,
    infowindow,
    marker,
    i,
    line,
    japanTrip,
    texasTrip,
    newYorkTrip,
    trips,
    markers = [
      ['<h2>Tokyo, JP</h2>', 35.693840,139.703549, 1],
      ['<h2>Dallas, TX</h2>', 32.7767,-96.7970, 2],
      ['<h2>New York City, NY</h2>', 40.7128,-73.985130, 3],
      ['<h2>Boston, MA</h2>', 42.3601,-71.0589, 4],
      ['<h2>Chicago, IL</h2>', 41.851215,-87.634422, 5],
      ['<h2>Washington, D.C.</h2>', 38.9072,-77.0369, 7],
      ['<h2>Hershey, PA</h2>', 40.2859,-76.6502, 8]
];

// Generate map, markers and line

function initMap() {
	center = {lat: 46.5476, lng: -87.3956};
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 3,
		center: center,
    styles: [{"featureType":"all","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#e5c163"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#c4c4c4"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#e5c163"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21},{"visibility":"on"}]},{"featureType":"poi.business","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#e5c163"},{"lightness":"0"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"color":"#e5c163"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#575757"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.stroke","stylers":[{"color":"#2c2c2c"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#999999"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
	});

	infowindow = new google.maps.InfoWindow();

	for (i = 0; i < markers.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(markers[i][1], markers[i][2]),
			map: map
		});
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
		 return function() {
			 infowindow.setContent(markers[i][0]);
			 infowindow.open(map, marker);
		 }
		})(marker, i));
	}

  // Coordinates for my 2017 Japan trip
  japanTrip2017 = [
    // K.I. Sawyer Airport (MQT)
    new google.maps.LatLng(46.3497,-87.3873),
    // Chicago O'Hare Airport (ORD)
    new google.maps.LatLng(41.9742,-87.9073),
    // Narita International Airport (NRT)
    new google.maps.LatLng(35.7720,140.3929)
  ];

  // Coordinates for my 2017 Texas trip
  texasTrip2017 = [
    // K.I. Sawyer Airport (MQT)
    new google.maps.LatLng(46.3497,-87.3873),
    // Detroit, Michigan
    new google.maps.LatLng(42.2162,-83.3554),
    // Dallas Fort Worth (DFT)
    new google.maps.LatLng(32.8998,-97.0403)
  ];

  // Coordinates for my 2017 NYC trip
  newYorkTrip2017 = [
    // K.I. Sawyer Airport (MQT)
    new google.maps.LatLng(46.3497,-87.3873),
    // Chicago O'Hare Airport (ORD)
    new google.maps.LatLng(41.9742,-87.9073),
    // John F. Kennedy Airport (JFK)
    new google.maps.LatLng(40.6413,-73.7781)
  ];

  // Coordinates for my 2016 Boston trip
  bostonTrip2016 = [
    // Chicago O'Hare Airport (ORD)
    new google.maps.LatLng(41.9742,-87.9073),
    // Logal International Airport (BOS)
    new google.maps.LatLng(42.3656,-71.0096)
  ];

  // Coordinates for my 2014 NYC trip
  newYorkTrip2014 = [
    // Austin Straubel International Airport (GRB)
    new google.maps.LatLng(44.4834,-88.1344),
    // Chicago O'Hare Airport (ORD)
    new google.maps.LatLng(41.9742,-87.9073),
    // LaGuardia Airport (LGA)
    new google.maps.LatLng(40.7769,-73.8740)
  ];

  // Coordinates for my 2014 Hershey trip
  hersheyTrip2014 = [
    // K.I. Sawyer Airport (MQT)
    new google.maps.LatLng(46.3497,-87.3873),
    // Chicago O'Hare Airport (ORD)
    new google.maps.LatLng(41.9742,-87.9073),
    // Harrisburg International Airport
    new google.maps.LatLng(40.1942,-76.7577)
  ];

  // Coordinates for my 2012 NYC trip
  newYorkTrip2012 = [
    // Austin Straubel International Airport (GRB)
    new google.maps.LatLng(44.4834,-88.1344),
    // Chicago O'Hare Airport (ORD)
    new google.maps.LatLng(41.9742,-87.9073),
    // LaGuardia Airport (LGA)
    new google.maps.LatLng(40.7769,-73.8740)
  ];

  // trips array
  trips = [
    japanTrip2017,
    texasTrip2017,
    newYorkTrip2017,
    bostonTrip2016,
    newYorkTrip2014,
    hersheyTrip2014,
    newYorkTrip2012
  ];

  // function to generate line between coordinates
  function generateLine(params) {
    line = new google.maps.Polyline({
      path: params,
      strokeColor: "#686462",
      strokeOpacity: 1.0,
      strokeWeight: 2,
      geodesic: true,
      map: map
    });
  }

  // loop over trips array and call generateLine
  for(var i = 0; i < trips.length; i++) {
    generateLine(trips[i]);
  }

}
