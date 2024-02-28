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

const buildPopUpInfo = (props, sliderPopupName, type) => {
  const nid =
    props.drupalNid ||
    props.nid ||
    props.node_id ||
    props.node ||
    props.NID_num ||
    null;

  if (type === "info-panel")
    return `<h3>Castello Taxlot (1660)</h3><hr><br><b>Taxlot: </b>${props.LOT2}<br><b>Property Type: </b>${props.tax_lots_1}<br><br><b>Encyclopedia Page: </b><br><a href="https://encyclopedia.nahc-mapping.org/lots/taxlot${props.LOT2}" target="_blank">https://encyclopedia.nahc-mapping.org/lots/taxlot${props.LOT2}</a>`;
  if (type === "popup")
    return `<div class='infoLayerCastelloPopUp'><b>Taxlot (1660):</b><br>${props.LOT2}</div>`;

  if (nid) {
    fetch(
      `https://encyclopedia.nahc-mapping.org/rendered-export-single?nid=${nid}`
    )
      .then((buffer) => buffer.json())
      .then((res) => {
        const html = res[0].rendered_entity;
        // Define the prefix
        var prefix = "https://encyclopedia.nahc-mapping.org";

        // Define the regular expression pattern
        var pattern = /(<a\s+href=")([^"]+)(")/g;
        var modifiedHtmlString = "";
        const addOnForLongIslandTribes = `
          <h3>Long Island Tribes</h3>
          <hr/>
          `
          // Uncomment this to see a styling for lots events
          // const addOnForLotEvents = `<h2>Lot:</h2>`
          if(sliderPopupName === "#infoLayerNativeGroups"){
            modifiedHtmlString += addOnForLongIslandTribes;
          }
          // Uncomment this to see a styling for lots events
          /* if(sliderPopupName === "#demoLayerInfo"){
            modifiedHtmlString += addOnForLotEvents;
          } */
        // Replace href attributes with the prefixed version
        modifiedHtmlString += html
          .replace(pattern, (_, p1, p2, p3) => {
            if (p2.slice(0, 4) === "http") {
              return p1 + p2 + p3;
            }
            return p1 + prefix + p2 + p3;
          })
          .replace(/(<a\s+[^>]*)(>)/g, (_, p1, p2) => {
            return p1 + ' target="_blank"' + p2;
          });
          
        $(sliderPopupName).html(modifiedHtmlString);
      });
  } else {
    let popup_html = "";
    if (typeof lots_info[props.Lot] === "undefined") {
      popup_html = `<h3>Dutch Grant</h3><hr>${props.name}<br><b>Dutch Grant Lot:</b> <a href='https://encyclopedia.nahc-mapping.org/grantlot/${props.Lot}' target='_blank'>${props.Lot}</a><br><br><b>Start:</b> <i>${props.day1} ${props.year1}</i><br><b>End:</b> <i>${props.day2} ${props.year2}</i><br><br><b>Description (partial):</b><br>${props.descriptio}<br><br>`;
    } else {
      let builds_imgs = "";
      if (lots_info[props.Lot].builds.length > 0) {
        for (let i = 0; i < lots_info[props.Lot].builds.length; i++) {
          builds_imgs += `<img src='https://encyclopedia.nahc-mapping.org${
            lots_info[props.Lot].builds[i]
          }' width='258' ><br><br>`;
        }
      }
      popup_html = `<h3>Dutch Grant</h3><hr><br><b>Dutch Grant Lot:</b> <a href='https://encyclopedia.nahc-mapping.org/lots/grantlot${props.Lot}' target='_blank'>${props.Lot}</a><br><br>`;
      if (lots_info[props.Lot].to_party_linked.length > 0) {
        popup_html += `<b>To Party:</b> <i>${
          lots_info[props.Lot].to_party_linked
        }</i><br><br>`;
      } else if (lots_info[props.Lot].to_party.length > 0) {
        popup_html += `<b>To Party:</b> <i>${
          lots_info[props.Lot].to_party
        }</i><br><br>`;
      }
      if (lots_info[props.Lot].from_party_linked.length > 0) {
        popup_html += `<b>From Party:</b> <i>${
          lots_info[props.Lot].from_party_linked
        }</i><br><br>`;
      } else if (lots_info[props.Lot].from_party.length > 0) {
        popup_html += `<b>From Party:</b> <i>${
          lots_info[props.Lot].from_party
        }</i><br><br>`;
      }
      if (lots_info[props.Lot].date_start.length > 0) {
        popup_html += `<b>Start:</b> <i>${
          lots_info[props.Lot].date_start
        }</i><br>`;
      }
      if (lots_info[props.Lot].date_end.length > 0) {
        popup_html += `<b>End:</b> <i>${
          lots_info[props.Lot].date_end
        }</i><br><br>`;
      }
      if (lots_info[props.Lot].descr.length > 0) {
        popup_html += `<b>Description:</b><br><i>${
          lots_info[props.Lot].descr
        }</i>`;
      }
      popup_html += `<br><br>${builds_imgs}`;
    }
    $("#infoLayerDutchGrants").html(popup_html);
  }
};
