function dutchGrantPopUpContent(features){
    let PopUpHTML = ""
    if (
        typeof dutch_grant_lots_info[features[0].properties.Lot] == "undefined"
      ) {
        PopUpHTML =
          "<div class='infoLayerDutchGrantsPopUp'>" +
          features[0].properties.name +
          "<br>";
      } else {
        PopUpHTML =
          "<div class='infoLayerDutchGrantsPopUp'>" +
          (dutch_grant_lots_info[features[0].properties.Lot].name_txt.length > 0
            ? dutch_grant_lots_info[features[0].properties.Lot].name_txt
            : features[0].properties.name) +
          "<br>";
      }
      PopUpHTML +=
        "<b>Dutch Grant Lot: </b>" + features[0].properties.Lot + "</div>";
    return PopUpHTML;
}

function lotEventsPopupContent(features) {
    return "<div class='demoLayerInfoPopUp'><b><h2>Taxlot: <a href='https://encyclopedia.nahc-mapping.org/taxlot/" +
    features[0].properties.TAXLOT +
    "' target='_blank'>" +
    features[0].properties.TAXLOT +
    "</a></h2></b></div>"
}

function castelloEventsPopUpContent(features) {
    return "<div class='infoLayerCastelloPopUp'><b>Taxlot (1660):</b><br>" +
    features[0].properties.LOT2 +
    "</div>"
}

function longIslandPopupContent(features){
    var PopUpHTML = ""
    if (
        typeof taxlot_event_entities_info[features[0].properties.nid] ==
          "undefined" ||
        features[0].properties.nid == ""
      ) {
        PopUpHTML =
          "<div class='infoLayerCastelloPopUp'><b>Name : </b>" +
          features[0].properties.name +
          "</div>";
      } else {
        PopUpHTML =
          "<div class='infoLayerCastelloPopUp'><b>Name : </b>" +
          (taxlot_event_entities_info[features[0].properties.nid].name.length > 0
            ? taxlot_event_entities_info[features[0].properties.nid].name
            : features[0].properties.name) +
          "</div>";
      }
      return PopUpHTML
}