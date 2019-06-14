var map;
var center;
var infoWindow;
var markerCollection = [];
var markerBounds;
var japanTrip2019;
var norwayTrip2018;
var icelandTrip2018;
var japanTrip2017;
var texasTrip2017;
var newYorkTrip2017;
var bostonTrip2016;
var newYorkTrip2014;
var newYorkTrip2012;
var hersheyTrip2014;
var texasTrip2003;
var trips;
var style = [
  { stylers: [{ visibility: 'off' }] },
  {
    featureType: 'water',
    stylers: [{ visibility: 'on' }, { color: '#2D2D2D' }]
  },
  {
    featureType: 'landscape',
    stylers: [{ visibility: 'on' }, { color: '#423d27' }]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'on' }, { color: '#2D2D2D' }, { weight: 1 }]
  }
];
var markers = [
  [32.4119, -99.68, '<h2>Abilene Regional Airport</h2>', 'ABI'],
  [52.3105, 4.7683, '<h2>Amsterdam Airport Schiphol</h2>', 'AMS'],
  [60.2918, 5.2220, '<h2>Bergen Airport, Flesland</h2>', 'BGO'],
  [42.3656, -71.0096, '<h2>Logan International Airport</h2>', 'BOS'],
  [32.8998, -97.0403, '<h2>Dallas/Forth Worth International Airport</h2>', 'DFT'],
  [42.2162, -83.3554, '<h2>Detroit Metropolitan Airport</h2>', 'DTW'],
  [45.7202, -87.092, '<h2>Delta County Airport', 'ESC'],
  [44.4834, -88.1344, '<h2>Austin Straubel International Airport</h2>', 'GRB'],
  [40.6413, -73.7781, '<h2>John F. Kennedy International Airport</h2>', 'JFK'],
  [63.9870, -22.6192, '<h2>Keflavik International Airport</h2>', 'KEF'],
  [40.7769, -73.874, '<h2>LaGuardia Airport</h2>', 'LGA'],
  [40.1942, -76.7577, '<h2>Harrisburg International Airport</h2>', 'MDT'],
  [42.9476, -87.8966, '<h2>General Mitchell International Airport</h2>', 'MKE'],
  [46.3497, -87.3873, '<h2>Sawyer International Airport', 'MQT'],
  [44.8848, -93.2223, '<h2>Minneapolis–Saint Paul International Airport</h2>', 'MSP'],
  [35.772, 140.3929, '<h2>Narita International Airport</h2>', 'NRT'],
  [41.9742, -87.9073, '<h2>OHare International Airport</h2>', 'ORD'],
  [34.7863, 135.4378, '<h2>Osaka International Airport</h2>', 'ITM']
];
var focal = { lat: 46.3497, lng: -87.3873 };
var iconBase = 'https://jacobproffer.github.io/airports/img/marker.svg';

if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;
    if (!document.documentElement.contains(el)) {
      return null;
    }
    do {
      if (el.matches(s)) {
        return el;
      }
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

function closeAllInfoWindows() {
  for (var i = 0; i < markerCollection.length; i++) {
    infoWindow.close();
  }
}

// Listen for all clicks on the document
document.addEventListener('click', function(event) {
  if (!event.target.closest('#map') && !event.target.closest('.sidebar-item')) {
    closeAllInfoWindows();
  }
});

/* eslint-disable no-unused-vars */
function initMap() {
  center = focal;
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: center,
    styles: style
  });

  markerBounds = new google.maps.LatLngBounds();
  infoWindow = new google.maps.InfoWindow();

  function makeMarker(options) {
    var pushPin = new google.maps.Marker({
      map: map,
      optimized: false,
      icon: {
        url: iconBase,
        scaledSize: new google.maps.Size(30, 30),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(15, 15)
      }
    });
    pushPin.setOptions(options);
    google.maps.event.addListener(pushPin, 'click', function() {
      infoWindow.setOptions(options);
      infoWindow.open(map, pushPin);
      if (this.sidebarButton) {
        this.sidebarButton.button.focus();
      }
    });
    var idleIcon = pushPin.getIcon();
    if (options.sidebarItem) {
      pushPin.sidebarButton = new SidebarItem(pushPin, options);
      pushPin.sidebarButton.addIn('sidebar');
    }
    markerBounds.extend(options.position);
    markerCollection.push(pushPin);
    return pushPin;
  }

  google.maps.event.addListener(map, 'click', function() {
    infoWindow.close();
  });

  function SidebarItem(marker, opts) {
    var tag = opts.sidebarItemType || 'button';
    var row = document.createElement(tag);
    row.innerHTML = opts.sidebarItem;
    row.className = opts.sidebarItemClassName || 'sidebar-item';
    row.onclick = function() {
      google.maps.event.trigger(marker, 'click');
    };
    row.onmouseover = function() {
      google.maps.event.trigger(marker, 'mouseover');
    };
    row.onmouseout = function() {
      google.maps.event.trigger(marker, 'mouseout');
    };
    this.button = row;
  }

  SidebarItem.prototype.addIn = function(block) {
    if (block && block.nodeType === 1) {
      this.div = block;
    } else {
      this.div =
        document.getElementById(block) ||
        document.getElementById('sidebar') ||
        document.getElementsByTagName('body')[0];
    }
    this.div.appendChild(this.button);
  };

  SidebarItem.prototype.remove = function() {
    if (!this.div) {
      return false;
    }
    this.div.removeChild(this.button);
    return true;
  };

  for (var i = 0; i < markers.length; i += 1) {
    makeMarker({
      position: new google.maps.LatLng(markers[i][0], markers[i][1]),
      sidebarItem: markers[i][3],
      content: markers[i][2]
    });
  }

  // Coordinates for my 2017 Japan trip
  japanTrip2019 = [
    // K.I. Sawyer Airport (MQT)
    new google.maps.LatLng(46.3497, -87.3873),
    // Chicago O'Hare Airport (ORD)
    new google.maps.LatLng(41.9742, -87.9073),
    // Narita International Airport (NRT)
    new google.maps.LatLng(35.772, 140.3929),
    // Osaka International Airport (ITM)
    new google.maps.LatLng(34.7863, 135.4378),
    // Narita International Airport (NRT)
    new google.maps.LatLng(35.772, 140.3929),
    // Chicago O'Hare Airport (ORD)
    new google.maps.LatLng(41.9742, -87.9073),
    // K.I. Sawyer Airport (MQT)
    new google.maps.LatLng(46.3497, -87.3873)
  ];

  // Coordinates for my 2018 Norway trip
  norwayTrip2018 = [
    // K.I. Sawyer Airport (MQT)
    new google.maps.LatLng(46.3497, -87.3873),
    // Detroit Metropolitan Airport (DTW)
    new google.maps.LatLng(42.2162, -83.3554),
    // Amsterdam Airport Schiphol
    new google.maps.LatLng(52.3105, 4.7683),
    // Bergen Airport, Flesland (BGO)
    new google.maps.LatLng(60.2918, 5.2220),
    // Amsterdam Airport Schiphol
    new google.maps.LatLng(52.3105, 4.7683),
    // Minneapolis–Saint Paul International Airport
    new google.maps.LatLng(44.8848, -93.2223),
    // K.I. Sawyer Airport (MQT)
    new google.maps.LatLng(46.3497, -87.3873),
  ];

  // Coordinates for my 2018 Iceland trip
  icelandTrip2018 = [
    // K.I. Sawyer Airport (MQT)
    new google.maps.LatLng(46.3497, -87.3873),
    // Detroit Metropolitan Airport (DTW)
    new google.maps.LatLng(42.2162, -83.3554),
    // John F. Kennedy Airport (JFK)
    new google.maps.LatLng(40.6413, -73.7781),
    // Keflavik international Airport (KEF)
    new google.maps.LatLng(63.9870, -22.6192),
    // John F. Kennedy Airport (JFK)
    new google.maps.LatLng(40.6413, -73.7781),
    // Minneapolis–Saint Paul International Airport
    new google.maps.LatLng(44.8848, -93.2223),
    // K.I. Sawyer Airport (MQT)
    new google.maps.LatLng(46.3497, -87.3873)
  ];

  // Coordinates for my 2017 Japan trip
  japanTrip2017 = [
    // K.I. Sawyer Airport (MQT)
    new google.maps.LatLng(46.3497, -87.3873),
    // Chicago O'Hare Airport (ORD)
    new google.maps.LatLng(41.9742, -87.9073),
    // Narita International Airport (NRT)
    new google.maps.LatLng(35.772, 140.3929),
    // Chicago O'Hare Airport (ORD)
    new google.maps.LatLng(41.9742, -87.9073),
    // K.I. Sawyer Airport (MQT)
    new google.maps.LatLng(46.3497, -87.3873)
  ];

  // Coordinates for my 2017 Texas trip
  texasTrip2017 = [
    // K.I. Sawyer Airport (MQT)
    new google.maps.LatLng(46.3497, -87.3873),
    // Detroit Metropolitan Airport (DTW)
    new google.maps.LatLng(42.2162, -83.3554),
    // Dallas Fort Worth (DFT)
    new google.maps.LatLng(32.8998, -97.0403),
    // Detroit Metropolitan Airport (DTW)
    new google.maps.LatLng(42.2162, -83.3554),
    // K.I. Sawyer Airport (MQT)
    new google.maps.LatLng(46.3497, -87.3873)
  ];

  // Coordinates for my 2017 NYC trip
  newYorkTrip2017 = [
    // K.I. Sawyer Airport (MQT)
    new google.maps.LatLng(46.3497, -87.3873),
    // Chicago O'Hare Airport (ORD)
    new google.maps.LatLng(41.9742, -87.9073),
    // John F. Kennedy Airport (JFK)
    new google.maps.LatLng(40.6413, -73.7781),
    // Chicago O'Hare Airport (ORD)
    new google.maps.LatLng(41.9742, -87.9073),
    // K.I. Sawyer Airport (MQT)
    new google.maps.LatLng(46.3497, -87.3873)
  ];

  // Coordinates for my 2016 Boston trip
  bostonTrip2016 = [
    // General Mitchell International Airport
    new google.maps.LatLng(42.9476, -87.8966),
    // Logal International Airport (BOS)
    new google.maps.LatLng(42.3656, -71.0096),
    // General Mitchell International Airport
    new google.maps.LatLng(42.9476, -87.8966)
  ];

  // Coordinates for my 2014 NYC trip
  newYorkTrip2014 = [
    // Austin Straubel International Airport (GRB)
    new google.maps.LatLng(44.4834, -88.1344),
    // Chicago O'Hare Airport (ORD)
    new google.maps.LatLng(41.9742, -87.9073),
    // LaGuardia Airport (LGA)
    new google.maps.LatLng(40.7769, -73.874),
    // Chicago O'Hare Airport (ORD)
    new google.maps.LatLng(41.9742, -87.9073),
    // Austin Straubel International Airport (GRB)
    new google.maps.LatLng(44.4834, -88.1344)
  ];

  // Coordinates for my 2014 Hershey trip
  hersheyTrip2014 = [
    // K.I. Sawyer Airport (MQT)
    new google.maps.LatLng(46.3497, -87.3873),
    // Detroit Metropolitan Airport (DTW)
    new google.maps.LatLng(42.2162, -83.3554),
    // Harrisburg International Airport
    new google.maps.LatLng(40.1942, -76.7577),
    // Detroit Metropolitan Airport (DTW)
    new google.maps.LatLng(42.2162, -83.3554),
    // K.I. Sawyer Airport (MQT)
    new google.maps.LatLng(46.3497, -87.3873)
  ];

  // Coordinates for my 2012 NYC trip
  newYorkTrip2012 = [
    // Austin Straubel International Airport (GRB)
    new google.maps.LatLng(44.4834, -88.1344),
    // Chicago O'Hare Airport (ORD)
    new google.maps.LatLng(41.9742, -87.9073),
    // LaGuardia Airport (LGA)
    new google.maps.LatLng(40.7769, -73.874),
    // Chicago O'Hare Airport (ORD)
    new google.maps.LatLng(41.9742, -87.9073),
    // Austin Straubel International Airport (GRB)
    new google.maps.LatLng(44.4834, -88.1344)
  ];

  texasTrip2003 = [
    // K.I. Sawyer Airport (MQT)
    new google.maps.LatLng(46.3497, -87.3873),
    // Chicago O'Hare Airport (ORD)
    new google.maps.LatLng(41.9742, -87.9073),
    // Dallas Fort Worth (DFT)
    new google.maps.LatLng(32.8998, -97.0403),
    // Abiline Regional Airport
    new google.maps.LatLng(32.4119, -99.68),
    // Dallas Fort Worth (DFT)
    new google.maps.LatLng(32.8998, -97.0403),
    // Chicago O'Hare Airport (ORD)
    new google.maps.LatLng(41.9742, -87.9073),
    // Delta County Airport (ESC)
    new google.maps.LatLng(45.7202, -87.092)
  ];

  // trips array
  trips = [
    japanTrip2019,
    norwayTrip2018,
    icelandTrip2018,
    japanTrip2017,
    texasTrip2017,
    newYorkTrip2017,
    bostonTrip2016,
    newYorkTrip2014,
    hersheyTrip2014,
    newYorkTrip2012,
    texasTrip2003
  ];

  // function to generate line between coordinates
  function generateLine(params) {
    new google.maps.Polyline({
      path: params,
      strokeColor: '#677279',
      strokeOpacity: 0.2,
      strokeWeight: 3,
      geodesic: true,
      map: map
    });
  }

  // loop over trips array and call generateLine
  for (i = 0; i < trips.length; i++) {
    generateLine(trips[i]);
  }
}
/* eslint-enable no-unused-vars */
