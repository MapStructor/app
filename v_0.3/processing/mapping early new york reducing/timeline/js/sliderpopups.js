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

function buildGrantLotsPopUpInfo(props) {
  var popup_html =
    "<h3>Grant Lot Division</h3><hr>" +
    "<br>" +
    "<b>Original Dutch Grant: </b>" +
    props.Lot +
    "<br>" +
    "<b>Lot Division: </b>" +
    props.dutchlot +
    "<br>" +
    "<b>Castello Taxlot (1660): </b>" +
    props.castello +
    "<br>" +
    "<br>" +
    "<b>Ownership:</b> " +
    props.name +
    "<br>" +
    "<b>From:</b> " +
    props.from +
    "<br>" +
    "<br>" +
    "<b>Start:</b> " +
    props.day1 +
    ", " +
    props.year1 +
    "<br>" +
    "<b>End:</b> " +
    props.day2 +
    ", " +
    props.year2 +
    "<br>" +
    "<br>" +
    "<b>Description:</b> " +
    "<br>" +
    props.descriptio +
    "<br><br>";
  $("#infoLayerGrantLots").html(popup_html);
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

function buildGravesendPopUpInfo(props) {
  var popup_html = "<h3>Brooklyn Grants</h3><hr>";

  if (typeof lots_info[props.node] == "undefined") {
    popup_html +=
      "<b>" +
      props.Name +
      "</b>" +
      "<br><br>" +
      "<b>Date:</b> <i>" +
      props["Date Text"] +
      "</i>" +
      "<br><br>" +
      "<i>" +
      props["Groups Dyl"] +
      "</i>" +
      "<br><br>";
  } else {
    if (lots_info[props.node].brooklyn_title.length > 0) {
      popup_html +=
        "<b>" + lots_info[props.node].brooklyn_title + "</b><br><br>";
    }

    if (lots_info[props.node].title_linked.length > 0) {
      popup_html += "<b>" + lots_info[props.node].title_linked + "</b><br><br>";
    } else if (lots_info[props.node].title.length > 0) {
      popup_html += "<b>" + lots_info[props.node].title + "</b><br><br>";
    }

    if (lots_info[props.node].date_start.length > 0) {
      popup_html +=
        "<b>Start:</b> <i>" + lots_info[props.node].date_start + "</i><br><br>";
    }

    if (
      lots_info[props.node].to_party.length > 0 ||
      lots_info[props.node].to_party2.length > 0
    ) {
      popup_html += "<b>To Party:</b><br>";

      if (lots_info[props.node].to_party_linked.length > 0)
        popup_html +=
          "<i>" + lots_info[props.node].to_party_linked + "</i><br>";
      else popup_html += "<i>" + lots_info[props.node].to_party + "</i><br>";

      if (lots_info[props.node].to_party2_linked.length > 0)
        popup_html +=
          "<i>" + lots_info[props.node].to_party2_linked + "</i><br>";
      else popup_html += "<i>" + lots_info[props.node].to_party2 + "</i><br>";
    }
    if (lots_info[props.node].from_party.length > 0) {
      if (lots_info[props.node].from_party_linked.length > 0)
        popup_html +=
          "<br><b>From Party:</b><br> <a href='" +
          lots_info[props.node].from_party_linked +
          "' target='_blank'>" +
          lots_info[props.node].from_party +
          "</a><br><br>";
      else
        popup_html +=
          "<br><b>From Party:</b><br><i>" +
          lots_info[props.node].from_party +
          "</i><br><br>";
    }
    if (lots_info[props.node].indigenous_signatories.length > 0) {
      popup_html +=
        "<b>Indigenous Signatories:</b><br><i>" +
        lots_info[props.node].indigenous_signatories.replace(/\\n/g, "<br>") +
        "</i><br>";
    }
  }

  $("#infoLayerGravesend").html(popup_html);

  $("#infoLayerGravesend").html(popup_html);
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

function buildKarlPopUpInfo(props) {
  var popup_html = "";
  var node_id = props.node_id.replace(/\/node\//g, "");

  popup_html = "<h3>Long Island Towns</h3><hr>";
  if (typeof settlements_info[node_id] == "undefined") {
    popup_html += "<b>" + props.enc_name + "</b>";
  } else {
    popup_html +=
      "<b>" +
      settlements_info[node_id].name +
      "</b><br>" +
      "<b>Date:</b> <i>" +
      settlements_info[node_id].date +
      "</i>" +
      "<br><br>" +
      "<b>Description:</b>" +
      "<br>" +
      "<i>" +
      settlements_info[node_id].descr +
      "</i>";
  }

  popup_html += "<br>";

  $("#infoLayerKarl").html(popup_html);
}

function buildFarmsPopUpInfo(props) {
  var popup_html = "";

  if (typeof lots_info[props.NID_num] == "undefined") {
    popup_html =
      "<h3>Original Grants &amp; Farms</h3><hr>" +
      "<br>" +
      "<b>To:</b> <i>" +
      props.To +
      "</i><br>" +
      "<b>Date:</b> <i>" +
      props.Date +
      "</i><br>" +
      "<br>";
  } else {
    popup_html = "<h3>Original Grants &amp; Farms</h3><hr><br>";
    if (lots_info[props.NID_num].title_linked.length > 0) {
      popup_html +=
        "<b>" + lots_info[props.NID_num].title_linked + "</b><br><br>";
    } else if (lots_info[props.NID_num].title.length > 0) {
      popup_html += "<b>" + lots_info[props.NID_num].title + "</b><br><br>";
    }
    if (lots_info[props.NID_num].to_party.length > 0) {
      if (lots_info[props.NID_num].to_party_linked.length > 0)
        popup_html +=
          "<b>To Party:</b> <i>" +
          lots_info[props.NID_num].to_party_linked +
          "</i><br>";
      //RESTORE THIS:
      else
        popup_html +=
          "<b>To Party:</b> <i>" +
          lots_info[props.NID_num].to_party +
          "</i><br>";
    }
      // Check if to_party2_linked is defined and has content, and use it first
      if (lots_info[props.NID_num].to_party2_linked && lots_info[props.NID_num].to_party2_linked.length > 0) {
        popup_html +=
          "<b>To Party 2:</b> <i>" +
          lots_info[props.NID_num].to_party2_linked.replace(
          //  /href="\u0022/g,
              /href="/g,
            "target=\"_blank\" href=\"https://nahc-mapping.org/mappingNY/encyclopedia"
          ) +
          "</i><br>";
      }
      // We only add the plain text version if to_party2_linked is not present
      else if (lots_info[props.NID_num].to_party2 && lots_info[props.NID_num].to_party2.length > 0) {
        popup_html +=
          "<b>To Party 2:</b> <i>" + lots_info[props.NID_num].to_party2 + "</i><br>";
      }


      // Inside the else block, where other properties are added:
      if (lots_info[props.NID_num].to_party_linked2.length > 0) {
        popup_html +=
          "<b>To Party 2:</b> <i>" +
          lots_info[props.NID_num].to_party_linked2 +
          "</i><br>";
      } else if (lots_info[props.NID_num].to_party_text2.length > 0) {
        popup_html +=
          "<b>To Party 2:</b> <i>" +
          lots_info[props.NID_num].to_party_text2 +
          "</i><br>";
      }

    if (lots_info[props.NID_num].from_party.length > 0) {
      if (lots_info[props.NID_num].from_party_linked.length > 0)
        //RESTORE THIS TOO:
        popup_html +=
          "<b>From Party:</b> <i>" +
          lots_info[props.NID_num].from_party_linked +
          "</i><br>";
      else
        popup_html +=
          "<b>From Party:</b> <i>" +
          lots_info[props.NID_num].from_party +
          "</i><br>";
    }


    if (lots_info[props.NID_num].from_party_linked2.length > 0) {
      popup_html +=
        "<b>From Party 2:</b> <i>" +
        lots_info[props.NID_num].from_party_linked2 +
        "</i><br>";
    } else if (lots_info[props.NID_num].from_party_text2.length > 0) {
      popup_html +=
        "<b>From Party 2:</b> <i>" +
        lots_info[props.NID_num].from_party_text2 +
        "</i><br>";
    }



    if (lots_info[props.NID_num].date_start.length > 0) {
      popup_html +=
        "<b>Start:</b> <i>" + lots_info[props.NID_num].date_start + "</i><br>";
    }
    if (lots_info[props.NID_num].date_end.length > 0) {
      popup_html +=
        "<b>End:</b> <i>" + lots_info[props.NID_num].date_end + "</i><br>";
    }
    if (lots_info[props.NID_num].type.length > 0) {
      popup_html +=
        "<br><b>Type:</b> <i>" + lots_info[props.NID_num].type + "</i><br>";
    }
  }

  $("#infoLayerFarms").html(popup_html);

  $("#infoLayerFarms").html(popup_html);
}

function buildCurrLotsPopUpInfo(props) {
  var popup_html =
    "<h3>Current Lot</h3><hr>" +
    "<b>Owner:</b>" +
    "<br>" +
    props.OwnerName +
    "<br><br>" +
    "<b>Address:</b>" +
    "<br>" +
    props.Address +
    "<br><br>" +
    "<b>Lot:</b>" +
    "<br>" +
    props.BBL +
    "<br><br>";
  $("#infoLayerCurrLots").html(popup_html);
}
