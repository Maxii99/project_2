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
    
  
  
  var criteria = {

    "region":"all",
    "country":"all",
    "year":"all",
    "by":"State",
    "top":"all"

  }

  RefreshMap(criteria)
  Populate_DropDowns()

// ----> Events <--------

  d3.selectAll(".drop-down").on("change", function () {
    
    d3.event.preventDefault();

    update_criteria();

    console.log(criteria)

    RefreshMap(criteria)





  });


  function markerSize(population) {
    return population/10;
  }


  function RefreshMap(params) {

    // Assemble API query URL
    if (params.by == "State")

      {
        var url = `http://127.0.0.1:5000/api/v1.0/immigrants_by_state/${params.country}/${params.year}/${params.top}`;
        var n = 0;
      }

    else

      {
        var url = `http://127.0.0.1:5000/api/v1.0/immigrants_by_county/${params.country}/${params.year}/${params.top}`;
        var n = 1;
      };


      console.log(url)
    
    // Grab the data with d3
    d3.json(url).then(function(response) {

    
      // Loop through data
      for (var i = 0; i < response.locations.length; i++) {

    
        // Set the data location property to a variable
        var location = response.locations[i];
        var name = location[0+n];
        var coordinates = [location[1+n], location[2+n]];
        var population = location[3+n];
        
    
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

  }

  function Populate_DropDowns() {

    var features = ["region", "country", "year"]
    
    var APIs = {
      "region": "http://127.0.0.1:5000//api/v1.0/regions",
      "country": "http://127.0.0.1:5000//api/v1.0/countries",
      "year": "http://127.0.0.1:5000//api/v1.0/years"
        
    };
   

    var i=0
    features.forEach((feature)=>{

        d3.json(APIs[feature]).then(function(response) {

          var DropDown = d3.select(`#${feature}`);

          DropDown.selectAll("option").remove();

          DropDown.append("option")
          .attr("value", "all")
          .text("All");


          response.forEach((item)=>{

              DropDown.append("option")
              .attr("value", item)
              .text(item);

          });

        });
    });

  };

  function update_criteria() {

    var myDrop_down = d3.event.target;

    

    criteria[String(myDrop_down.id)] = fixAll(myDrop_down.value);


      function fixAll(myText) {


        if (myText == "All")

          {return "all"}

        else

          {return myText};

      };
  
  
  }