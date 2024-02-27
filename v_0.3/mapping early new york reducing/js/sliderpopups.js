//Default slider position
$(
  "#infoLayerGrantLots, #infoLayerDutchGrants, #demoLayerInfo, #infoLayerCastello, #infoLayerNativeGroups"
).slideUp();

const extractTextFromHTML = (htmlString) => $("<div>").html(htmlString).text();

const addFieldToPopup = (
  fieldContent,
  displayMode = "",
  addExtraBreak = "",
  defaultValue = ""
) => {
  let content = fieldContent
    ? displayMode === "unlinked"
      ? extractTextFromHTML(fieldContent)
      : fieldContent
    : defaultValue;
  return content
    ? (addExtraBreak === "break" ? "<br>" : "") + content + "<br>"
    : "";
};

const buildPopUpInfo = (props) => {
  const prop_nid = `${props.nid}`;
  // console.log("buildPopupInfo", prop_nid, props)
  fetch(`https://encyclopedia.nahc-mapping.org/rendered-export-single?nid=${prop_nid}`).then(buffer => buffer.json()).then(res => {
    console.log(res[0].rendered_entity)
    $("#demoLayerInfo").html(res[0].rendered_entity);
  })
};

const buildDutchGrantPopUpInfo = (props) => {
  const prop_nid = `${props.nid}`;
  console.log(props);
  console.log("buildDutchGrantPopUpInfo", props)
  fetch(`https://encyclopedia.nahc-mapping.org/rendered-export-single?nid=${prop_nid}`).then(buffer => buffer.json()).then(res => {
    console.log(res[0].rendered_entity)
    $("#demoLayerInfo").html(res[0].rendered_entity);
  })
};

const buildNativeGroupPopUpInfo = (props) => {
  let popup_html = "<h3>Long Island Tribes</h3><hr>";
  if (
    typeof taxlot_event_entities_info[props.nid] === "undefined" ||
    props.nid === ""
  ) {
    popup_html += `<b>${props.name}</b>`;
  } else {
    popup_html += `<b>${
      taxlot_event_entities_info[props.nid].name_html.length > 0
        ? taxlot_event_entities_info[props.nid].name_html
        : props.name
    }</b><br><br><b>Description:</b><br>${
      taxlot_event_entities_info[props.nid].descr
    }<br><br>`;
  }
  popup_html += "<br><br>";
  $("#infoLayerNativeGroups").html(popup_html);
};

const buildCastelloPopUpInfo = (feature, type = "info-panel") => {
  if (type === "info-panel")
    return `<h3>Castello Taxlot (1660)</h3><hr><br><b>Taxlot: </b>${feature.properties.LOT2}<br><b>Property Type: </b>${feature.properties.tax_lots_1}<br><br><b>Encyclopedia Page: </b><br><a href="https://encyclopedia.nahc-mapping.org/lots/taxlot${feature.properties.LOT2}" target="_blank">https://encyclopedia.nahc-mapping.org/lots/taxlot${feature.properties.LOT2}</a>`;
  if (type === "popup")
    return `<div class='infoLayerCastelloPopUp'><b>Taxlot (1660):</b><br>${feature.properties.LOT2}</div>`;
};
