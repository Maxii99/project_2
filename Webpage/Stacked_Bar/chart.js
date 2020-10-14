var dataPoints = [];
var chart = new CanvasJS.Chart("chartContainer",{
    title:{
        text:"Rendering Chart with dataPoints from External JSON"
    },
    data: [{
        type: "line",
        dataPoints : dataPoints,
    }]
});
$.getJSON("http://127.0.0.1:5000/api/v1.0/immigrants_by_county/Germany/all/all", function(data) {  
    $.each(data, function(key, value){
        dataPoints.push({x: value[0], y: parseInt(value[1])});
    });
    chart.render();
});