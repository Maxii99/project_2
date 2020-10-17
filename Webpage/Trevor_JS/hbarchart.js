function buildPlot(diversity = "all", plot) {
  
    var url = `http://127.0.0.1:5000/api/v1.0/migration_data/${diversity}`;
  
    d3.json(url).then(function(data) {
      // Grab values from the response json object to build the plots

      console.log(data)

      var labels = data.labels;
      var headers = data.headers;
      var columns = data.values
    
      var sum = []

      var i=0
      
      columns[0].forEach(column=>sum.push(1))


      console.log(`Empty ${sum}`)

      columns.forEach((column)=>{

        
        i=0
        column.forEach((Item)=>{

          sum[i] += Item

          i +=1

        })

      })

      console.log(sum)




      Normalized = columns.map(column=>{

        i=0
        return column.map((Item)=>{

          console.log(Item)

          normal = Item/sum[i];

          i +=1

          return normal

        })

      })

      Normalized.forEach(column=>{console.log(column)})


      traces = []
      var j = 0
      columns.forEach((value)=>{
       traces.push({
         x: Normalized[j],
         y: labels,
         name: headers[j],
         type: "bar",
         orientation: 'h'
       })

       j+=1
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
  

