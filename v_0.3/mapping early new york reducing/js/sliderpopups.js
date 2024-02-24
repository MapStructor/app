//Default slider position
$("#infoLayerGrantLots").slideUp();
$("#infoLayerDutchGrants").slideUp();
$("#demoLayerInfo").slideUp();
$("#infoLayerCastello").slideUp();
$("#infoLayerNativeGroups").slideUp();

function extractTextFromHTML(htmlString) {
  return $("<div>").html(htmlString).text();
}

function addFieldToPopup(
  fieldContent,
  displayMode = "",
  addExtraBreak = "",
  defaultValue = ""
) {
  let content = fieldContent
    ? displayMode === "unlinked"
      ? extractTextFromHTML(fieldContent)
      : fieldContent
    : defaultValue;
  return content
    ? (addExtraBreak === "break" ? "<br>" : "") + content + "<br>"
    : "";
}

function buildPopUpInfo(props) {
  var prop_nid = "" + props.nid + "";
  var popup_html =
    "<b><h2>Lot:<br>" +
    addFieldToPopup(taxlot_events_info[prop_nid].taxlot, true) +
    "</h2></b>";

  popup_html += addFieldToPopup(
    taxlot_events_info[prop_nid].property_type,
    "unlinked"
  );
  popup_html += "<hr>";

  popup_html +=
    "<b>DATE: </b>" +
    addFieldToPopup(
      taxlot_events_info[prop_nid].start,
      "unlinked",
      "",
      "Unknown"
    );
  popup_html += "<hr>";

  popup_html += "<b>OWNERSHIP: </b><br>";

  // To Party 1
  popup_html += addFieldToPopup(
    taxlot_events_info[prop_nid].to_party_1_role,
    "unlinked",
    "",
    "Unknown"
  );
  popup_html += addFieldToPopup(taxlot_events_info[prop_nid].to_party_1_text);
  popup_html += addFieldToPopup(taxlot_events_info[prop_nid].to_party);
  popup_html += addFieldToPopup(
    taxlot_events_info[prop_nid].to_party_1_entity,
    "unlinked"
  );

  // To Party 2
  popup_html += addFieldToPopup(
    taxlot_events_info[prop_nid].to_party_2_role,
    "unlinked",
    "break"
  );
  popup_html += addFieldToPopup(taxlot_events_info[prop_nid].to_party_2_text);
  popup_html += addFieldToPopup(taxlot_events_info[prop_nid].to_party2);
  popup_html += addFieldToPopup(
    taxlot_events_info[prop_nid].to_party_2_entity,
    "unlinked"
  );

  // Taxlot Event
  if (taxlot_events_info[prop_nid].taxlotevent) {
    popup_html +=
      "<br><b>LOT EVENT: </b><br>" +
      addFieldToPopup(taxlot_events_info[prop_nid].taxlotevent);
  }

  popup_html += "<hr>";

  // From 1
  popup_html += "<b>FROM: </b><br>";
  popup_html += addFieldToPopup(
    taxlot_events_info[prop_nid].from_party_1_role,
    "unlinked"
  );
  popup_html += addFieldToPopup(taxlot_events_info[prop_nid].from_party_1_text);
  popup_html += addFieldToPopup(taxlot_events_info[prop_nid].from_party);
  popup_html += addFieldToPopup(
    taxlot_events_info[prop_nid].from_party_1_entity,
    "unlinked"
  );

  // From 2 - With extra line break
  popup_html += addFieldToPopup(
    taxlot_events_info[prop_nid].from_party_2_role,
    "unlinked",
    "break"
  );
  popup_html += addFieldToPopup(taxlot_events_info[prop_nid].from_party_2_text);
  popup_html += addFieldToPopup(taxlot_events_info[prop_nid].from_party2);
  popup_html += addFieldToPopup(
    taxlot_events_info[prop_nid].from_party_2_entity,
    "unlinked"
  );

  popup_html += "<hr>";
  popup_html +=
    "<b>Lot Event ID:</b><br>" +
    addFieldToPopup(taxlot_events_info[prop_nid].title);

  $("#demoLayerInfo").html(popup_html);
}

function buildDutchGrantPopUpInfo(props) {
  var popup_html = "";
  if (typeof lots_info[props.Lot] == "undefined") {
    popup_html =
      "<h3>Dutch Grant</h3><hr>" +
      props.name +
      "<br>" +
      "<b>Dutch Grant Lot:</b> <a href='https://encyclopedia.nahc-mapping.org/grantlot/" +
      props.Lot +
      "' target='_blank'>" +
      props.Lot +
      "</a><br>" +
      "<br>" +
      "<b>Start:</b> <i>" +
      props.day1 +
      " " +
      props.year1 +
      "</i><br>" +
      "<b>End:</b> <i>" +
      props.day2 +
      " " +
      props.year2 +
      "</i><br>" +
      "<br>" +
      "<b>Description (partial):</b>" +
      "<br>" +
      props.descriptio +
      "<br><br>";
  } else {
    var builds_imgs = "";
    if (lots_info[props.Lot].builds.length > 0) {
      for (let i = 0; i < lots_info[props.Lot].builds.length; i++) {
        builds_imgs +=
          "<img src='https://encyclopedia.nahc-mapping.org" +
          lots_info[props.Lot].builds[i] +
          "'  width='258' ><br><br>";
      }
    }
    popup_html =
      "<h3>Dutch Grant</h3><hr>" +
      "<br>" +
      "<b>Dutch Grant Lot:</b> <a href='https://encyclopedia.nahc-mapping.org/lots/grantlot" +
      props.Lot +
      "' target='_blank'>" +
      props.Lot +
      "</a><br>" +
      "<br>";

    if (lots_info[props.Lot].to_party_linked.length > 0) {
      popup_html +=
        "<b>To Party:</b> <i>" +
        lots_info[props.Lot].to_party_linked +
        "</i><br><br>";
    } else if (lots_info[props.Lot].to_party.length > 0) {
      popup_html +=
        "<b>To Party:</b> <i>" + lots_info[props.Lot].to_party + "</i><br><br>";
    }
    if (lots_info[props.Lot].from_party_linked.length > 0) {
      popup_html +=
        "<b>From Party:</b> <i>" +
        lots_info[props.Lot].from_party_linked +
        "</i><br><br>";
    } else if (lots_info[props.Lot].from_party.length > 0) {
      popup_html +=
        "<b>From Party:</b> <i>" +
        lots_info[props.Lot].from_party +
        "</i><br><br>";
    }
    if (lots_info[props.Lot].date_start.length > 0) {
      popup_html +=
        "<b>Start:</b> <i>" + lots_info[props.Lot].date_start + "</i><br>";
    }
    if (lots_info[props.Lot].date_end.length > 0) {
      popup_html +=
        "<b>End:</b> <i>" + lots_info[props.Lot].date_end + "</i><br><br>";
    }
    if (lots_info[props.Lot].descr.length > 0) {
      popup_html +=
        "<b>Description:</b>" +
        "<br>" +
        "<i>" +
        lots_info[props.Lot].descr +
        "</i>";
    }
    popup_html += "<br><br>" + builds_imgs;
  }

  $("#infoLayerDutchGrants").html(popup_html);

  $("#infoLayerDutchGrants").html(popup_html);
}

function buildNativeGroupPopUpInfo(props) {
  var popup_html = "<h3>Long Island Tribes</h3><hr>";

  if (
    typeof taxlot_event_entities_info[props.nid] == "undefined" ||
    props.nid == ""
  ) {
    popup_html += "<b>" + props.name + "</b>";
  } else {
    popup_html +=
      "<b>" +
      (taxlot_event_entities_info[props.nid].name_html.length > 0
        ? taxlot_event_entities_info[props.nid].name_html
        : props.name) +
      "</b>" +
      "<br><br>" +
      "<b>Description:</b>" +
      "<br>" +
      taxlot_event_entities_info[props.nid].descr +
      "<br><br>";
  }

  popup_html += "<br><br>";

  $("#infoLayerNativeGroups").html(popup_html);
}

function buildCastelloPopUpInfo(feature, type = "info-panel") {
  if (type === "info-panel")
    return (places_popup_html =
      "<h3>Castello Taxlot (1660)</h3><hr>" +
      "<br>" +
      "<b>" +
      "Taxlot: " +
      "</b>" +
      feature.properties.LOT2 +
      "<br>" +
      "<b>" +
      "Property Type: " +
      "</b>" +
      feature.properties.tax_lots_1 +
      "<br>" +
      "<br>" +
      "<b>" +
      "Encyclopedia Page: " +
      "</b>" +
      "<br>" +
      '<a href="https://encyclopedia.nahc-mapping.org/lots/taxlot' +
      feature.properties.LOT2 +
      '" target="_blank">https://encyclopedia.nahc-mapping.org/lots/taxlot' +
      feature.properties.LOT2 +
      "</a>");

  if (type === "popup")
    return (
      "<div class='infoLayerCastelloPopUp'><b>Taxlot (1660):</b><br>" +
      feature.properties.LOT2 +
      "</div>"
    );
}
