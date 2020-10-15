function buildPlot(diversity = "all") {
  
    var url = `http://127.0.0.1:5000/api/v1.0/diversity_by_state/all/all/all`;
  
    d3.json(url).then(function(data) {
      // Grab values from the response json object to build the plots
      var label = data.labels;
      var location = data.locations;
      // Print the names of the columns
      console.log(data.labels);
      // Print the data for each day
      console.log(data.locations);

  
var trace1 = {
    labels: label,
    values: location,
    type: 'pie'
  };


  
  var data = [trace1];
  
  var layout = {
    title: "Pie Chart",
  };



  
  Plotly.newPlot("plot", data, layout);

    })

}

buildPlot()