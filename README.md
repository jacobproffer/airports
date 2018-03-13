# Locations

This project started as an experiment with the Google Maps API. The overall goal was to track which airports I've been to with markers.

As the project progressed, I wanted to also depict flight paths. Thankfully, the Google Maps API provides a polyline to achieve this. The polylines are created via a for-loop, which loops over a multidimensional array of latitude and longitude coordinates.
To take into account repeated flight paths, I lowered the opacity of the polyline. Although subtle, this allows for repeated flight paths to standout.

Lastly, I set the geodesic option for the polyline to true. With this setting, the polylines follow the curvature of the Earth.
