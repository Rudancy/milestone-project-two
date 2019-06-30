

  function type(ndx) {
   var dim = ndx.dimension(dc.pluck('type'));
   var group = dim.group();

   dc.pieChart("#types-of-characters")
    .height(500)
    .radius(1000)
    .transitionDuration(1500)
    .dimension(dim)
    .group(group);

  }



   var average_episode_group = id_dim.group().reduce(



    //add
    function(p, v) {
     p.count++;
     p.total += v.spend;
     p.average = p.total / p.count;
     return p;
    },

    //remove
    function(p, v) {
     p.count--;
     if (p.count == 0) {
      p.total = 0;
      p.average = 0;
     }
     else {
      p.total -= v.spend;
      p.average = p.total / p.count;
     }
     return p;
    },

    //initialise
    function() {
     return { count: 0, total: 0, average: 0 };
    }


   );
 



   function convert_id_data(Id) {
    rmData.forEach(function(d) {
     d.id = parseInt(d.id);
     return [d.id];
    });
   }



   function convert_episode_data(Episode) {
    rmData.forEach(function(d) {
     d.episode = parseInt(d.episode);
     return [d.episode];
    });
   }

   convert_id_data('id');
   convert_episode_data('episode');



   dead_or_alive(ndx);
   show_genders(ndx);
   type(ndx);
   characters_that_appear_most(ndx);
   dc.renderAll();







  }


// old work


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


  function type(ndx) {
   var dim = ndx.dimension(dc.pluck('type'));
   var group = dim.group();

   dc.pieChart("#types-of-characters")
    .height(500)
    .radius(1000)
    .transitionDuration(1500)
    .dimension(dim)
    .group(group);

  }

  function characters_that_appear_most(ndx) {
   var id_dim = ndx.dimension(dc.pluck('id'));
   


   var average_chart = dc.barChart("#scatterChart");
   average_chart
    .width(8000)
    .height(300)
    .margins({ top: 10, right: 50, bottom: 30, left: 50 })
    .dimension(id_dim)
    .group(num_appearances)
    .transitionDuration(500)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .xAxisLabel("Gender")
    .yAxis().ticks(20);
  }


//belongs in the makeGraph function
 function num_apps(key) {
  var num_appearances = 'num_appearances';
  rmData.forEach(function(d) {
   d[num_appearances] = ((d[key].match(/,/g) || []).length) + 1;
  
   
   
  });
 }

 num_apps('episode');




function characters_that_appear_most(ndx) {

 var episodeDim = ndx.dimension(dc.pluck('num_appearances'));

 var episodeGroup = episodeDim.group();

console.log(episodeGroup.all());


 dc.barChart('#scatterChart')
  .width(500)
  .height(500)
  .margins({ top: 10, right: 10, bottom: 10, left: 10 })
  .dimension(episodeDim)
  .group(episodeGroup)


  //.x(d3.scale.linear().domain([min_appearence, max_appearence]));
  // .x(d3.scale.linear().domain([0, 40]))
  .transitionDuration(500)
  .x(d3.scale.ordinal())
  .xUnits(dc.units.ordinal)
  .xAxisLabel("Gender")
  .yAxis().ticks(100);
  
}

// function characters_that_appear_most(ndx) {



//     var episode_dim = ndx.dimension(dc.pluck('episode'));


//     var total_episodes_per_id = episode_dim.group().reduceSum(dc.pluck('id'));

//     var min_appearence = episode_dim.bottom(1)[0].episode;
//     var max_appearence = episode_dim.top(1)[0].episode;

//     console.log(total_episodes_per_id.all())

//     dc.lineChart('#scatterChart')
//         .width(1000)
//         .height(500)
//         .margins({ top: 10, right: 10, bottom: 10, left: 10 })
//         .dimension(episode_dim)
//         .group(total_episodes_per_id)
//         .transitionDuration(100)
//         .x(d3.scale.linear().domain([min_appearence, max_appearence]));


// }



 
 
// to work out the average of a number
  function add_item(p, v) {
   p.count++;
   p.total += v.appearenceNum;
   p.average = p.total / p.count;
   return p;
  }

  function remove_item(p, v) {
   p.count--;
   if (p.count == 0) {
    p.total = 0;
    p.average = 0;
   }
   else {
    p.total -= v.appearenceNum;
    p.average = p.total / p.count;
   }
   return p;
  }

  function initialise() {
   return { count: 0, total: 0, average: 0 };
  }

  var average_appearence = dim.group().reduce(add_item, remove_item, initialise);
