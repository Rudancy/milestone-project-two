  queue()
      .defer(d3.tsv, "assets/rick-morty-data/characters.tsv")
      .defer(d3.tsv, "assets/rick-morty-data/episodes.tsv")
      .defer(d3.tsv, "assets/rick-morty-data/locations.tsv")
      .await(makeGraphs);

  function makeGraphs(error, rmData) {
      var ndx = crossfilter(rmData);

      show_genders(ndx);
      dc.renderAll();
  }

  function show_genders(ndx) {
      var dim = ndx.dimension(dc.pluck('gender'));
      var group = dim.group();

      dc.barChart("#gender-chart")
          .width(400)
          .height(300)
          .margins({ top: 10, right: 50, bottom: 30, left: 50 })
          .dimension(dim)
          .group(group)
          .transitionDuration(500)
          .x(d3.scale.ordinal())
          .xUnits(dc.units.ordinal)
          .elasticY(true)
          .xAxisLabel("Gender")
          .yAxis().ticks(20);
  }
  
  
  