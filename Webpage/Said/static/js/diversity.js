chart= new GeoChart({
    "layers": [
        {
            "id": "piePositions",
            "type": "items",
            "data": {
                "id": "gdp"
            },
            "aggregation": {
                "enabled": true,
                "distance": 70,
                "weightFunction": function (node) {
                        var sum = 0;
                        for (var key in node.gdp) {
                            if ({}.hasOwnProperty.call(node.gdp, key)) {
                                sum += node.gdp[key];
                            }
                        }
                        return sum;
                    }
                },
                "style": {
                    "nodeAutoScaling": null,
                    "nodeStyleFunction": function (node) {
                        var r;

                        r = node.data.aggregatedWeight;
            
                        // in order to fit nodes on the chart, display the radius in a logarithmic scale
                        node.radius = Math.log(Math.max(2, r * 1e-6)) * 15;

                        // Show the country names, if an aggregation contains only 1 node
                        aggr = node.data.aggregatedNodes;
     
                        if (aggr.length === 1) {
                            node.label = aggr[0].id;
                        } else {
                            node.display = "image";
                            node.label = "" + aggr.length + "locations";
                        }
                    },
                "node": {
                    "radius": 0,
                    "fillColor": "#2fc32f",
                    "lineColor": "#2fc32f",
                    "label": "",
                    "display": "droplet"
                },
                "nodeHovered": {
                    "shadowColor": "#2fc32f"
                },
                "nodeLabel": {
                    "backgroundStyle": {
                        "fillColor": "#2fc32f",
                        "lineColor": "#2fc32f"
                    },
                    "textStyle": {
                        "fillColor": "#b0dc0b"
                    }
                },
                "removedColor": null
            }
        },
        {
            "id": "pie",
            "type": "charts",
            "shapesLayer": "piePositions",
            "chartType": "piechart",
            "settingsFunction": function (node, data) {
                     aggr = data.aggregatedNodes;

                    if (aggr.settingsApplied) return {
                        pie: { radius: node.removed ? 1e-30 : node.radius - 3, innerRadius: 1 }
                    };
                    aggr.settingsApplied = true;

                    var pieData = {subvalues: []};

                    // When displaying aggregated GDP of a region, summarize the GDP sectors
                    var gdp = {
                        Agriculture: 0,
                        Industry: 0,
                        Service: 0
                    };
                    for (var i = 0; i < aggr.length; i++) {
                        var c = aggr[i];
                        for (var j in c.gdp) {
                            if ({}.hasOwnProperty.call(gdp, j)) {
                                gdp[j] += c.gdp[j];
                            }
                        }
                    }
                    var radius = 0;
                    for (var key in gdp) {
                        if ({}.hasOwnProperty.call(gdp, key)) {
                            pieData.subvalues.push({
                                value: gdp[key],
                                name: key
                            });
                        }
                    }
                    return {
                        pie: {
                            radius: node.radius - 3,
                            innerRadius: 1,
                            style: {
                                colorDistribution: "list"
                            }
                        },
                        data: {
                            preloaded: pieData
                        },
                        labels: {enabled: false},
                        info: {
                            contentsFunction: function (data) {
                                return "" + data.name + " " + data.value.toLocaleString() + "M $";
                            }
                        }
                    };
                }
        }
    ],
    "navigation": {
        "initialLat": 40,
        "initialLng": -95,
        "initialZoom": 4
    },
    "container": "demo",
    "data": [
        {
            "id": "gdp",
            "url": "http://127.0.0.1:5000/api/v1.0/immigrants_by_state/all/all/all",
            "perBoundsData": false
        }
    ],
    "interaction": {
        "resizing": {
            "enabled": false
        }
    }
})