//TIME LAYER FILTERING

function changeDate(unixDate) {
  var date = parseInt(moment.unix(unixDate).format("YYYYMMDD"));
  var dateFilter = ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]];

  //LAYERS FOR FILTERING
  ["dutch_grants-5ehfqe", "dutch_grants-5ehfqe-highlighted", "grant-lots-lines"].forEach(id => {
    beforeMap.setFilter(id, dateFilter)
    afterMap.setFilter(id, dateFilter)
  })

  beforeMap.setFilter("lot_events-bf43eb-left", dateFilter);
  afterMap.setFilter("lot_events-bf43eb-right", dateFilter);

  demoFilterRangeCalc();
} //end function changeDate