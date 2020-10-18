// specify the columns
const onGridReady=(data)=>{
  console.log("grid is ready")
  fetch("http://127.0.0.1:5000/api/v1.0/immigrants_by_state/all/all/all").then(resp=>resp.json())
  .then(resp=>{console.log(resp)
    params.api.applyTransaction({add:resp})})


var columnDefs= [
  { headerName: "State", field: "state" },
  { headerName: "count", field: "count",}, 
  {headerName: "Lat",field: "lat",},
  { headerName: "Lng", field: "lng" },
  ]

// specify the data
var rowData= [
  { state: data.locations[0], count: data.locations[4], lat: data.locations[1], lng: data.locations[2]}]
// let the grid know which columns and what data to use
var gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  onGridReady: function () {
      gridOptions.api.sizeColumnsToFit();
  }
};

// wait for the document to be loaded, otherwise
// ag-Grid will not find the div in the document.
document.addEventListener("DOMContentLoaded", function() {

  // lookup the container we want the Grid to use
  var eGridDiv = document.querySelector('#myGrid');

  // create the grid passing in the div to use together with the columns & data we want to use
  new agGrid.Grid(eGridDiv, gridOptions);
});

}



