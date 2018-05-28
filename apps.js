queue()
    .defer(d3.json, "transactions.json")
    .await(makeGraphs);
    
function makeGraphs(error, transactionsData){
    var ndx = crossfilter(transactionsData);

        var name_dim = ndx.dimension(dc.pluck("name"));
        var total_spend_per_person = name_dim.group().reduceSum(dc.pluck("spend"));
        
        dc.barChart("#per-person-chart")
            .width(300)
            .height(150)
            .margins({top: 10, right: 50, bottom: 30, left: 50})
            .dimension(name_dim)
            .group(total_spend_per_person)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Person")
            .yAxis().ticks(4);
            
        var store_dim = ndx.dimension(dc.pluck("store"));
        var total_spend_per_store = store_dim.group().reduceSum(dc.pluck("spend"));
        
        dc.barChart("#per-store-chart")
            .width(300)
            .height(150)
            .margins({top: 10, right: 50, bottom: 30, left: 50})
            .dimension(store_dim)
            .group(total_spend_per_store)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Store")
            .yAxis().ticks(4);
            
        var state_dim = ndx.dimension(dc.pluck("state"));
        var total_spend_per_state = state_dim.group().reduceSum(dc.pluck("spend"));
        
        dc.barChart("#per-state-chart")
            .width(300)
            .height(150)
            .margins({top: 10, right: 50, bottom: 30, left: 50})
            .dimension(state_dim)
            .group(total_spend_per_state)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("State")
            .yAxis().ticks(4);
            
    /* Pie Chart Data Representation*/
    
        var person_dim = ndx.dimension(dc.pluck("name"));
        var total_spend_per_person = person_dim.group().reduceSum(dc.pluck("spend"));
        
        dc.pieChart("#per-person-chart-pieChart")
            .height(150)
            .radius(90)
            .dimension(person_dim)
            .group(total_spend_per_person)
            .transitionDuration(500);
            
        var state_dim = ndx.dimension(dc.pluck("store"));
        var total_spend_per_store = state_dim.group().reduceSum(dc.pluck("spend"));
        
        dc.pieChart("#per-store-chart-pieChart")
            .height(150)
            .radius(90)
            .dimension(state_dim)
            .group(total_spend_per_state)
            .transitionDuration(500);
            
        var state_dim = ndx.dimension(dc.pluck("state"));
        var total_spend_per_store = state_dim.group().reduceSum(dc.pluck("spend"));
        
        dc.pieChart("#per-state-chart-pieChart")
            .height(150)
            .radius(90)
            .dimension(state_dim)
            .group(total_spend_per_state)
            .transitionDuration(500);
             
        dc.renderAll(); 
    }