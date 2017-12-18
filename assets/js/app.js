// Variables

var tokyo,
    map,
		infowindow,
		marker,
		i,
		line,
		locations = [
			['<h2>Tokyo, JP</h2>', 35.693840,139.703549, 1],
			['<h2>Dallas, TX</h2>', 32.7767,-96.7970, 2],
			['<h2>New York City, NY</h2>', 40.7128,-73.985130, 3],
			['<h2>Boston, MA</h2>', 42.3601,-71.0589, 4],
			['<h2>Chicago, IL</h2>', 41.851215,-87.634422, 5],
			['<h2>Milwaukee, WI</h2>', 43.0389,-87.9065, 6],
			['<h2>Washington, D.C.</h2>', 38.9072,-77.0369, 7],
			['<h2>Hershey, PA</h2>', 40.2859,-76.6502, 8],
			['<h2>Toronto, ON', 51.2538,-85.3232, 9]
		];

// Generate map, markers and line

function initMap() {
	tokyo = {lat: 35.693840, lng: 139.703549};
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 2,
		center: tokyo,
    styles: [{"featureType":"all","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#e5c163"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#c4c4c4"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#e5c163"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21},{"visibility":"on"}]},{"featureType":"poi.business","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#e5c163"},{"lightness":"0"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"color":"#e5c163"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#575757"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.stroke","stylers":[{"color":"#2c2c2c"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#999999"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
	});
	infowindow = new google.maps.InfoWindow();
	for (i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map
		});
		line = new google.maps.Polyline({
			path: [
		    new google.maps.LatLng(locations[i][1], locations[i][2]),
		    new google.maps.LatLng(46.5476, -87.3956)
			],
			strokeColor: "#686462",
			strokeOpacity: 1.0,
			strokeWeight: 2,
			geodesic: true,
			map: map
		});
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
		 return function() {
			 infowindow.setContent(locations[i][0]);
			 infowindow.open(map, marker);
		 }
		})(marker, i));
	}
}
