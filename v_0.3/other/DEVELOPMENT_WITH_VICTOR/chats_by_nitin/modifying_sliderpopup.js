////sliderpopup.js

/* Trying to reduce and make simple arrays.
The first function didn't include html. It just omitted a bunch of stuff.
The second was dutch grants - that might work fine.
The third, native groups, is just as it was - what it was giving was overcomplicated.



Apparently it's changing for example this:

  popup_html += addFieldToPopup(
    taxlot_events_info[prop_nid].to_party_1_entity,
    "unlinked"
  );

or this, if a single line:

  popup_html += addFieldToPopup(taxlot_events_info[prop_nid].to_party_1_entity, "unlinked");


To this, which is great:

  'to_party_1_entity', { displayMode: 'unlinked' },


*/  

function extractTextFromHTML(htmlString) {
    return $("<div>").html(htmlString).text();
}

function addFieldToPopup(fieldContent, displayMode = "", addExtraBreak = "", defaultValue = "") {
    let content = fieldContent
        ? displayMode === "unlinked"
            ? extractTextFromHTML(fieldContent)
            : fieldContent
        : defaultValue;
    return content
        ? (addExtraBreak === "break" ? "<br>" : "") + content + "<br>"
        : "";
}



//THIS FUNCTION IS INCOMPLETE. SEE NOTES BENEATH.

function buildFields(popup_html, fields, nid, prefix = "") {
    fields.forEach(field => {
        const breakLine = field.addExtraBreak ? "break" : "";
        const displayMode = field.displayMode ? field.displayMode : "";
        const defaultValue = field.defaultValue ? field.defaultValue : "";
        popup_html += addFieldToPopup(taxlot_events_info[nid][prefix + field.name], displayMode, breakLine, defaultValue);
    });
    return popup_html;
}

function buildPopUpInfo(props) {
    const prop_nid = "" + props.nid + "";
    let popup_html = "<b><h2>Lot:<br>" + addFieldToPopup(taxlot_events_info[prop_nid].taxlot, true) + "</h2></b>";

    const fields = [
        { name: 'property_type', displayMode: 'unlinked' },
        { name: 'start', displayMode: 'unlinked', defaultValue: 'Unknown' },
        { name: 'to_party_1_role', displayMode: 'unlinked' },
        { name: 'to_party_1_text' },
        { name: 'to_party' },
        { name: 'to_party_1_entity', displayMode: 'unlinked' },
        { name: 'to_party_2_role', displayMode: 'unlinked', addExtraBreak: true },
        { name: 'to_party_2_text' },
        { name: 'to_party2' },
        { name: 'to_party_2_entity', displayMode: 'unlinked' },
        { name: 'taxlotevent', addExtraBreak: true },
        { name: 'from_party_1_role', displayMode: 'unlinked', addExtraBreak: true },
        { name: 'from_party_1_text' },
        { name: 'from_party' },
        { name: 'from_party_1_entity', displayMode: 'unlinked' },
        { name: 'from_party_2_role', displayMode: 'unlinked', addExtraBreak: true },
        { name: 'from_party_2_text' },
        { name: 'from_party2' },
        { name: 'from_party_2_entity', displayMode: 'unlinked' },
        { name: 'title', addExtraBreak: true }
    ];
  

    popup_html = buildFields(popup_html, fields, prop_nid);

    $("#demoLayerInfo").html(popup_html);
}


/* THE ABOVE CODED DID NOT DEAL WITH MORE STUFF.
Apparently it's complex with html, and you need that additional logic on the bottom.
Honestly I'm not sure what's going on here. I feel that it might be simpler than all of this. */

/*

const fields = [
    "<hr>",
    "<b>OWNERSHIP: </b><br>",
    'to_party_1_role', { displayMode: 'unlinked' },
    'to_party_1_text',
    'to_party',
    'to_party_1_entity', { displayMode: 'unlinked' },
    'to_party_2_role', { displayMode: 'unlinked', addExtraBreak: 'break' },
    'to_party_2_text',
    'to_party2',
    'to_party_2_entity', { displayMode: 'unlinked' },
    // ... additional fields ...
];



for (let i = 0; i < fields.length; i++) {
    if (typeof fields[i] === 'string') {
        if (fields[i].startsWith('<')) {  // If it's an HTML string
            popup_html += fields[i];
        } else {  // It's a field name
            let options = fields[i + 1];
            if (typeof options === 'object' && !options.startsWith('<')) {
                popup_html += addFieldToPopup(fields[i], options.displayMode || "", options.addExtraBreak || "", options.defaultValue || "");
                i++;  // Skip the next element as it's already processed
            } else {
                // No options provided for this field
                popup_html += addFieldToPopup(fields[i]);
            }
        }
    }
}

*/



function buildDutchGrantPopUpInfo(props) {
    var popup_html = "<h3>Dutch Grant</h3><hr>";

    if (typeof lots_info[props.Lot] == "undefined") {
        popup_html += props.name + "<br>" +
            "<b>Dutch Grant Lot:</b> <a href='https://encyclopedia.nahc-mapping.org/grantlot/" +
            props.Lot + "' target='_blank'>" + props.Lot + "</a><br><br>" +
            "<b>Start:</b> <i>" + props.day1 + " " + props.year1 + "</i><br>" +
            "<b>End:</b> <i>" + props.day2 + " " + props.year2 + "</i><br><br>" +
            "<b>Description (partial):</b><br>" + props.descriptio + "<br><br>";
    } else {
        popup_html += "<b>Dutch Grant Lot:</b> <a href='https://encyclopedia.nahc-mapping.org/lots/grantlot" +
            props.Lot + "' target='_blank'>" + props.Lot + "</a><br><br>";

        // Optional fields
        const optionalFields = ['to_party_linked', 'from_party_linked', 'date_start', 'date_end', 'descr'];
        optionalFields.forEach(field => {
            if (lots_info[props.Lot][field] && lots_info[props.Lot][field].length > 0) {
                const label = field.replace('_', ' ').replace('linked', '').charAt(0).toUpperCase() + field.slice(1);
                popup_html += `<b>${label}:</b> <i>${lots_info[props.Lot][field]}</i><br>`;
            }
        });

        // Image gallery
        if (lots_info[props.Lot].builds && lots_info[props.Lot].builds.length > 0) {
            lots_info[props.Lot].builds.forEach(build => {
                popup_html += `<img src='https://encyclopedia.nahc-mapping.org${build}' width='258'><br><br>`;
            });
        }
    }

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
  
  