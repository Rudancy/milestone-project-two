 queue()
  .defer(d3.csv, "assets/rick-morty-data/characters.csv")
  .await(makeGraphs);

 function makeGraphs(error, rmData) {
  var ndx = crossfilter(rmData);


  function convert_episode_data(key) {
   rmData.forEach(function(d) {
    d.episode = parseInt(d.episode);
    return [d.episode];
   });
  }

  //create a function that takes the top 10 values with the most values

  function convert_id_data(key) {
   rmData.forEach(function(d) {
    d.id = parseInt(d.id);
    return [d.id];
   });
  }

  function convert_appearence_data(key) {
   rmData.forEach(function(d) {
    d.appearenceNum = parseInt(d.appearenceNum);
    return [d.appearenceNum];
   });
  }



  convert_episode_data('episode');
  convert_id_data('id');
  convert_appearence_data('episodeNum');
  table(ndx);
  barChart(ndx);
  countChart(ndx);
  tableChart(ndx);
  dead_or_alive(ndx);
  show_genders(ndx);
  average_appearence_by_male_female(ndx);
  //main_character(ndx);
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
   .yAxis().ticks(10);
 }


 function dead_or_alive(ndx) {
  var dim = ndx.dimension(dc.pluck('status'));
  var group = dim.group();

  dc.pieChart("#dead-or-alive")
   .height(500)
   .radius(100)
   .transitionDuration(1500)
   .dimension(dim)
   .group(group);

 }


 //average graph

 function average_appearence_by_male_female(ndx) {


  var dim = ndx.dimension(dc.pluck('gender'));
  var group = dim.group().reduceSum(dc.pluck('appearenceNum'));

  dc.barChart("#appearence-average")
   .width(400)
   .height(400)
   .margins({ top: 10, right: 50, bottom: 30, left: 50 })
   .dimension(dim)
   .group(group)
   //.valueAccessor(function(d) {
   // return d.value.average.toFixed(2);
   //})
   .transitionDuration(500)
   .x(d3.scale.ordinal())
   .xUnits(dc.units.ordinal)
   .elasticY(true)
   .xAxisLabel("Gender")
   .yAxis().ticks(20);
 }


 // https://www.tutorialspoint.com/dcjs/dcjs_data_table.htm

 


 var barChart = dc.barChart('#line');
 var countChart = dc.dataCount('#mystats');
 var tableChart = dc.dataTable('#mytable')

 function table(errors, ndx) {
  let numberOfAppearences = ndx.dimension(function(d) {
   if (d.numberOfAppearences > 5) {
    return d.numberOfAppearences;
   }
  });
  var ageGroup = numberOfAppearences.group().reduceCount();

  barChart
   .width(400)
   .height(300)
   .x(d3.scale.ordinal())
   .yAxisLabel('episodes')
   .xAxisLabel('id')
   .elasticY(true)
   .elasticX(true)
   .dimension(numberOfAppearences)
   .group(ageGroup);

  countChart
   .dimension(ndx)
   .group(ndx.groupAll());

  tableChart
   .dimension('id')
   .group(ageGroup)

   .size(Infinity)
   .columns(['id', 'appearenceNum'])
   .sortBy(function(d) {
    return d.id;
   })
   .order(d3.ascending);



 }
 