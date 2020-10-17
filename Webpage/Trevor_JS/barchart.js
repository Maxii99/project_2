function buildPlot(diversity = "all", plot) {
  
    var url = `http://127.0.0.1:5000/api/v1.0/migration_data/${diversity}`;
  
    d3.json(url).then(function(data) {
      // Grab values from the response json object to build the plots
      var labels = data[0]["labels"];
      traces = []
      Object.entries(data[1]).forEach((value)=>{
       traces.push({
         x: labels,
         y: value[1],
         name: value[0],
         type: "bar",
       })
      })
  
  
  var data = traces;
  
  var layout = {
    title: `${diversity} Chart`,
    barmode: "stack"
  };
  
  Plotly.newPlot(plot, data, layout);

})

}

buildPlot("age", "plot1")
buildPlot("education", "plot2")
buildPlot("median_income", "plot3")
buildPlot("income", "plot4")
buildPlot("occupation", "plot5")
  

