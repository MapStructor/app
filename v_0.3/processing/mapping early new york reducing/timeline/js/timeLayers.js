//TIME LAYER FILTERING

function changeDate(unixDate) {
  var date = parseInt(moment.unix(unixDate).format("YYYYMMDD"));
  var dateFilter = ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]];

  //LAYERS FOR FILTERING

  //NAHC
  beforeMap.setFilter("dutch_grants-5ehfqe-left", dateFilter);
  afterMap.setFilter("dutch_grants-5ehfqe-right", dateFilter);

  beforeMap.setFilter("dutch_grants-5ehfqe-left-highlighted", dateFilter);
  afterMap.setFilter("dutch_grants-5ehfqe-right-highlighted", dateFilter);

  beforeMap.setFilter("lot_events-bf43eb-left", dateFilter);
  afterMap.setFilter("lot_events-bf43eb-right", dateFilter);

  beforeMap.setFilter("grant-lots-lines-left", dateFilter);
  afterMap.setFilter("grant-lots-lines-right", dateFilter);

  demoFilterRangeCalc();
} //end function changeDate