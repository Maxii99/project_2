function buildPlot(Location = "all") {
  
    var url = `http://127.0.0.1:5000/api/v1.0/diversity_by_state/${Location}/all/all`;
  
    d3.json(url).then(function(data) {
      // Grab values from the response json object to build the plots
      var label = [];
      var counts = [];
      var total = data.total;
      var limit = 0.01*total;
      var other_count = 0 
      var other_names = []

      i=0
      data.counts.forEach((count)=>{

        if (count > limit) 
          {
            
            label.push(data.labels[i]);
            counts.push(count);
          
          }
        else
          {
            other_count +=count;
            other_names.push(data.labels[i]);
          };

          i+=1
      });

      label.push(`Other`);
      counts.push(other_count);
    
      var trace1 = {
          labels: label,
          values: counts,
          type: 'pie'
        };


        var data = [trace1];
        
        var layout = {
          title: `${Location} Diversity`,
        };

        
        Plotly.newPlot("plot", data, layout);

})

}

buildPlot('Illinois')