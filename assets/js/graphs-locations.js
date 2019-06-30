queue()
    .defer(d3.csv, "assets/rick-morty-data/locations.csv")
    .await(makeGraphs);

function makeGraphs(error, rmData) {
    var ndx = crossfilter(rmData);

    different_places(ndx);
    planest_in_dimensions(ndx);
    dc.renderAll();
}


function different_places(ndx) {

    var type_dim = ndx.dimension(dc.pluck('types'));
    var group = type_dim.group();

    dc.pieChart("#types-of-places")
        .height(500)
        .radius(100)
        .transitionDuration(1500)
        .dimension(type_dim)
        .group(group);


}

function planest_in_dimensions(ndx) {
    
    
    var dimension_dim = ndx.dimension(dc.pluck('dimension'));
    var group = dimension_dim.group();

    dc.barChart("#places-in-dimensions")
        .width(1000)
        .height(300)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(dimension_dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Dimensions")
        .yAxis().ticks(20);

}
