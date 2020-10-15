// Creating map object
var myMap = L.map("map", {
    center: [39.8, -98.57],
    zoom: 5
  });
  
  // Adding tile layer to the map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Assemble API query URL
  var url = "http://127.0.0.1:5000/api/v1.0/immigrants_by_county/all/all/all";

  function markerSize(population) {
    return population/10;
  }

  // Grab the data with d3
  d3.json(url).then(function(response) {
  
    // Loop through data
    for (var i = 0; i < response.locations.length; i++) {

        console.log("loop")
  
      // Set the data location property to a variable
      var location = response.locations[i];
      var name = location[1];
      var coordinates = [location[2], location[3]];
      var population = location[4];
      
      console.log(coordinates)
  
        L.circle(coordinates, {
            fillOpacity: 0.75,
            color: "purple",
            fillColor: "purple",
            // Setting our circle's radius equal to the output of our markerSize function
            // This will make our marker's size proportionate to its population
            radius: markerSize(population)
          }).bindPopup("<h1>" + name + "</h1> <hr> <h3>Population: " + population + "</h3>").addTo(myMap);

    }
  
  });
  