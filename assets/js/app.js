// Variables

let map,
    center,
    infowindow,
    marker,
    i,
    line,
    japanTrip2017,
    texasTrip2017,
    newYorkTrip2017,
    bostonTrip2016,
    newYorkTrip2014,
    newYorkTrip2012,
    hersheyTrip2014,
    trips,
    style = [{"stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#000000"}]},{"featureType":"landscape","stylers":[{"visibility":"on"},{"color":"#342B3F"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"weight":1}]}],
    markers = [
      ['<h3>Narita International Airport</h3>', 35.7720,140.3929, 1],
      ['<h3>Dallas/Forth Worth International Airport</h3>', 32.8998,-97.0403, 2],
      ['<h3>John F. Kennedy International Airport</h3>', 40.6413,-73.7781, 3],
      ['<h3>LaGuardia Airport</h3>', 40.7769,-73.8740, 4],
      ['<h3>Logan International Airport</h3>', 42.3656,-71.0096, 4],
      ['<h3>Detroit Metropolitan Airport</h3>', 42.2162,-83.3554, 5],
      ['<h3>OHare International Airport</h3>', 41.9742,-87.9073, 6],
      ['<h3>Harrisburg International Airport</h3>', 40.1942,-76.7577, 7],
      ['<h3>Austin Straubel International Airport</h3>',44.4834,-88.1344,8],
      ['<h3>Sawyer International Airport', 46.3497,-87.3873, 9]
    ];

const focal = {lat: 46.3497, lng: -87.3873},
     iconBase = 'http://jacobproffer.com/locations/img/marker.svg';

// Generate map, markers and line
function initMap() {
	center = focal;
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 3,
		center: center,
    styles: style
	});

	infowindow = new google.maps.InfoWindow();

	for (i = 0; i < markers.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(markers[i][1], markers[i][2]),
			map: map,
      icon: {
        url: iconBase,
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(15, 15)
      }
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
    // Detroit Metropolitan Airport (DTW)
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
      strokeColor: "#A8CD61",
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
