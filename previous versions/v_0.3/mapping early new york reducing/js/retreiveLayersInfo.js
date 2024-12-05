function handleAjaxError(xhr, textStatus) {
    // LOADING ERROR!
    console.warn("jQuery AJAX request  ERROR !!!");
    console.log(xhr.responseText);
    console.log(textStatus);
  }


// for test local host REST_API/grant-lots-export.json
// for test remote host https://lifecourse.xyz/upwork/test/ny/grant-lots-export.json
// REST API https://nahc-mapping.org/mappingNY/dev/grant-lots-export
// REST API https://encyclopedia.nahc-mapping.org/grant-lots-export
// REST API new https://encyclopedia.nahc-mapping.org/grant-lots-export-properly

function getDutchGrantsInfo() {
    var data_info_index = "";
    dutch_grant_lots_info_length = 0;
  
    $.ajax({
      url: "https://encyclopedia.nahc-mapping.org/grant-lots-export-properly",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      type: "get",
      dataType: "json",
      data: {},
    })
      .done(function (data) {
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].title != "") {
              data_info_index = data[i].title;
              data_info_index = data_info_index.replace(/\s+/g, "");
              if (/FortAmsterdam/.test(data_info_index)) {
                data_info_index = "Fort Amsterdam";
              }
              dutch_grant_lots_info[data_info_index] = {
                name_txt: data[i].to_party_unlinked,
                to_party: data[i].to_party.replace(
                  "href=\u0022",
                  "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                ),
                from_party: data[i].from_party.replace(
                  "href=\u0022",
                  "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                ),
                start: data[i].start,
                end: data[i].end,
                notes: data[i].note,
                descr: data[i].description,
                builds:
                  data[i].images.length > 0 ? data[i].images.split(", ") : [],
              };
  
              dutch_grant_lots_info_length += 1;
            }
          }
        }
      })
      .fail(handleAjaxError);
  }
  
  // for test local host REST_API/places-list-export.json
  // REST API https://encyclopedia.nahc-mapping.org/places-list-export
  
  function getSettlementsInfo() {
    var data_info_index = "";
    settlements_info_length = 0;
  
    $.ajax({
      url: "https://encyclopedia.nahc-mapping.org/places-list-export",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      type: "get",
      dataType: "json",
      data: {},
    })
      .done(function (data) {
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            if (typeof data[i].nid[0].value != "undefined") {
              data_info_index = "" + data[i].nid[0].value + "";
  
              settlements_info[data_info_index] = {
                name:
                  data[i].title.length > 0
                    ? (data[i].path.length > 0
                        ? "<a href='https://encyclopedia.nahc-mapping.org" +
                          data[i].path[0].alias +
                          "' target='_blank'>"
                        : "") +
                      data[i].title[0].value +
                      (data[i].path.length > 0 ? "</a>" : "")
                    : "",
                curr_loc:
                  data[i].field_current_location_text_.length > 0
                    ? (data[i].field_current_location_linked_.length > 0
                        ? "<a href='https://nahc-mapping.org" +
                          data[i].field_current_location_linked_[0].url +
                          "' target='_blank'>"
                        : "") +
                      data[i].field_current_location_text_[0].value +
                      (data[i].field_current_location_linked_.length > 0
                        ? "</a>"
                        : "")
                    : "",
                curr_loc_name:
                  data[i].field_current_location_text_.length > 0
                    ? data[i].field_current_location_text_[0].value
                    : "",
                curr_loc_url:
                  data[i].field_current_location_linked_.length > 0
                    ? data[i].field_current_location_linked_[0].url
                    : "",
                curr_loc_target:
                  data[i].field_current_location_linked_.length > 0
                    ? data[i].field_current_location_linked_[0].target_id
                    : "",
                date:
                  data[i].field_date_text_.length > 0
                    ? data[i].field_date_text_[0].value
                    : "",
                descr:
                  data[i].field_description10.length > 0
                    ? data[i].field_description10[0].value
                    : "",
                curr_loc_txt:
                  data[i].field_current_location_text_.length > 0
                    ? data[i].field_current_location_text_[0].value
                    : "",
                curr_loc_link:
                  data[i].field_current_location_linked_.length > 0
                    ? data[i].field_current_location_linked_[0].url
                    : "",
                img1:
                  data[i].field_image1_1.length > 0
                    ? data[i].field_image1_1[0].url
                    : "",
                img2:
                  data[i].field_image_2.length > 0
                    ? data[i].field_image_2[0].url
                    : "",
                img3:
                  data[i].field_image_3.length > 0
                    ? data[i].field_image_3[0].url
                    : "",
              };
  
              settlements_linked_location[data[i].nid[0].value] =
                data[i].title[0].value;
  
              settlements_info_length += 1;
            }
          }
        }
      })
      .fail(handleAjaxError);
  }
  
  // for test local host REST_API/taxlot-entities-export.json
  // REST API https://encyclopedia.nahc-mapping.org/taxlot-entities-export
  
  function getTaxlotEventEntitiesDescrInfo() {
    var data_info_index = "";
    taxlot_entities_info_length = 0;
  
    $.ajax({
      url: "https://encyclopedia.nahc-mapping.org/taxlot-entities-export",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      type: "get",
      dataType: "json",
      data: {},
    })
      .done(function (data) {
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            // old api
            if (typeof data[i].nid[0].value != "undefined") {
              data_info_index = "" + data[i].nid[0].value + "";
              taxlot_event_entities_info[data_info_index] = {
                name: data[i].title.length > 0 ? data[i].title[0].value : "",
                name_html:
                  data[i].title.length > 0
                    ? (data[i].path.length > 0
                        ? "<a href='https://encyclopedia.nahc-mapping.org/node/" +
                          data_info_index +
                          "' target='_blank'>"
                        : "") +
                      data[i].title[0].value +
                      (data[i].path.length > 0 ? "</a>" : "")
                    : "",
                descr:
                  data[i].field_description14.length > 0
                    ? data[i].field_description14[0].value
                    : "",
              };
  
              taxlot_entities_info_length += 1;
            }
          }
        }
      })
      .fail(handleAjaxError);
  }
  
  // for test local host REST_API/taxlot-events-export.json
  // REST API https://encyclopedia.nahc-mapping.org/taxlot-events-export
  
  function getTaxlotEventsInfo() {
    var data_info_index = "";
    taxlot_events_info_length = 0;
  
    $.ajax({
      url: "https://encyclopedia.nahc-mapping.org/taxlot-events-export",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      type: "get",
      dataType: "json",
      data: {},
    })
      .done(function (data) {
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            if (typeof data[i].title != "undefined") {
              data_info_index = data[i].title.match(/\/node\/(.*?)\"/)[1];
  
              if (data_info_index !== null) {
                taxlot_events_info[data_info_index] = {
                  //title: data[i].title,
                  title: data[i].title.replaceAll(
                    "href=\u0022",
                    "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                  ),
                  start: data[i].field_daystart,
                  end: "",
                  taxlot: data[i].field_taxlot.replaceAll(
                    "href=\u0022",
                    "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                  ),
                  taxlotevent: data[i].field_taxlotevent.replaceAll(
                    "href=\u0022",
                    "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                  ),
                  to_party: data[i].field_to.replace(
                    "href=\u0022",
                    "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                  ),
                  to_party2: data[i].field_to_party_1.replace(
                    "href=\u0022",
                    "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                  ),
                  from_party: data[i].field_from.replace(
                    "href=\u0022",
                    "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                  ),
                  from_party2: data[i].field_from_party_1.replace(
                    "href=\u0022",
                    "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                  ),
  
                  property_type: data[i].field_pro.replace(
                    "href=\u0022",
                    "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                  ),
                  to_party_1_text: data[i].field_events_to_party_1_text_.replace(
                    "href=\u0022",
                    "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                  ),
                  to_party_1_role: data[
                    i
                  ].field_party_role_in_transaction_.replace(
                    "href=\u0022",
                    "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                  ),
                  to_party_1_entity: data[i].field_entity_description_to_.replace(
                    "href=\u0022",
                    "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                  ),
                  to_party_2_text: data[i].field_asdf_to_party_2_text_.replace(
                    "href=\u0022",
                    "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                  ),
                  to_party_2_role: data[i].field_party_role3.replace(
                    "href=\u0022",
                    "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                  ),
                  to_party_2_entity: data[
                    i
                  ].field_entity_description_to_part.replace(
                    "href=\u0022",
                    "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                  ),
                  from_party_1_text: data[i].field_from_party_1_text_.replace(
                    "href=\u0022",
                    "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                  ),
                  from_party_1_role: data[i].field_partyrole.replace(
                    "href=\u0022",
                    "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                  ),
                  from_party_1_entity: data[i].field_entity_desc.replace(
                    "href=\u0022",
                    "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                  ),
                  from_party_2_text: data[i].field_from_party_2_text_.replace(
                    "href=\u0022",
                    "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                  ),
                  from_party_2_role: data[i].field_party_role2.replace(
                    "href=\u0022",
                    "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                  ),
                  from_party_2_entity: data[
                    i
                  ].field_entity_description_from_pa.replace(
                    "href=\u0022",
                    "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                  ),
                };
  
                taxlot_events_info_length += 1;
              }
            }
          }
        }
      })
      .fail(handleAjaxError);
  }
  
  // for test local host REST_API/info-entities-export.json
  // REST API https://encyclopedia.nahc-mapping.org/info-entities-export
  
  function getInfosEntity() {
    var data_info_index = "";
    infos_entity_length = 0;
  
    $.ajax({
      url: "https://encyclopedia.nahc-mapping.org/info-entities-export",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      type: "get",
      dataType: "json",
      data: {},
    })
      .done(function (data) {
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            // old api
            if (typeof data[i].nid[0].value != "undefined") {
              data_info_index = "" + data[i].nid[0].value + "";
  
              infos_entity[data_info_index] = {
                name: data[i].title.length > 0 ? data[i].title[0].value : "",
                name_html:
                  data[i].title.length > 0
                    ? (data[i].path.length > 0
                        ? "<a href='https://encyclopedia.nahc-mapping.org/node/" +
                          data_info_index +
                          "' target='_blank'>"
                        : "") +
                      data[i].title[0].value +
                      (data[i].path.length > 0 ? "</a>" : "")
                    : "",
                descr: data[i].body.length > 0 ? data[i].body[0].value : "",
              };
  
              infos_entity_length += 1;
            }
          }
        }
      })
      .fail(handleAjaxError);
  }
  
  // for test local host REST_API/brooklyn-grant-ids-export.json
  // REST API https://encyclopedia.nahc-mapping.org/brooklyn-grant-ids-export
  
  function getBrooklynGrantsInfo() {
    var data_info_index = "";
    brooklyn_grants_length = 0;
  
    $.ajax({
      url: "https://encyclopedia.nahc-mapping.org/brooklyn-grant-ids-export",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      type: "get",
      dataType: "json",
      data: {},
    })
      .done(function (data) {
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            if (typeof data[i].nid[0].value != "undefined") {
              data_info_index = "" + data[i].nid[0].value + "";
  
              brooklyn_grants_info[data_info_index] = {
                name: data[i].title.length > 0 ? data[i].title[0].value : "",
                date_start:
                  data[i].field_start_date_.length > 0
                    ? data[i].field_start_date_[0].value
                    : "",
  
                to_party:
                  data[i].field_to_party_1_text_.length > 0
                    ? data[i].field_to_party_1_text_[0].value.split("\n")[0]
                    : "",
                to_party_linked:
                  data[i].field_to_party_1222.length > 0
                    ? "https://nahc-mapping.org/mappingNY/encyclopedia" +
                      data[i].field_to_party_1222[0].url
                    : "",
  
                to_party2:
                  data[i].field_to_party_2_text222.length > 0
                    ? data[i].field_to_party_2_text222[0].value
                    : "",
                to_party2_linked:
                  data[i].field_to_party_2_text_.length > 0
                    ? "https://nahc-mapping.org/mappingNY/encyclopedia" +
                      data[i].field_to_party_2_text_[0].url
                    : "",
  
                from_party:
                  data[i].field_from_party_1222.length > 0
                    ? data[i].field_from_party_1222[0].value
                    : "",
                from_party_linked:
                  data[i].field_from_party_12222.length > 0
                    ? "https://nahc-mapping.org/mappingNY/encyclopedia" +
                      data[i].field_from_party_12222[0].url
                    : "",
  
                indigenous_signatories:
                  data[i].field_history_notes222.length > 0
                    ? data[i].field_history_notes222[0].value
                    : "",
              };
  
              brooklyn_grants_length += 1;
            }
          }
        }
      })
      .fail(handleAjaxError);
  }
  
  // for test local host REST_API/lots-export2.json
  // REST API https://encyclopedia.nahc-mapping.org/lots-export2
  
  function getLotsInfo() {
    var data_info_index = "";
    lots_info_length = 0;
  
    $.ajax({
      url: "https://encyclopedia.nahc-mapping.org/lots-export2",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      type: "get",
      dataType: "json",
      data: {},
    })
      .done(function (data) {
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            if (typeof data[i].field_old_nid != "undefined") {
              if (data[i].field_old_nid != "") {
                if (data[i].field_content_type == "Grant Lots") {
                  data_info_index = data[i].field_old_title;
                  data_info_index = data_info_index.replace(/\s+/g, "");
                  if (/FortAmsterdam/.test(data_info_index)) {
                    data_info_index = "Fort Amsterdam";
                  }
                } else {
                  data_info_index = "" + data[i].field_old_nid + "";
                }
  
                lots_info[data_info_index] = {
                  name: data[i].field_content_type,
                  title: data[i].field_old_title,
                  title_linked: data[i].title
                    .replace(
                      />[^<]+<\/a>/,
                      ">" + data[i].field_old_title + "</a>"
                    )
                    .replace(
                      "href=\u0022",
                      "target=\u0022_blank\u0022 href=\u0022https://encyclopedia.nahc-mapping.org/"
                    ),
                  brooklyn_title: data[i].field_original_title_temp,
                  to_party_linked: data[i].field_to_party_1222.replace(
                    "href=\u0022",
                    "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                  ),
                  from_party_linked: data[i].field_from_party.replace(
                    "href=\u0022",
                    "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                  ),
                  to_party: data[i].field_to_party_1_text_,
                  from_party: data[i].field_from_party_text_,
                  to_party2: data[i].field_to_party_2_text222,
                  to_party2_linked: data[i].field_to_party_2_text_.replace(
                    "href=\u0022",
                    "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                  ),
  
                  //ADDED FIELDS
                  to_party_linked2: data[i].field_name456
                  ? data[i].field_name456.replace(
                      "href=\"",
                      "target=\"_blank\" href=\"https://your-link-prefix/"
                    )
                  : "",
                  to_party_text2: data[i].field_name || "",
          
                  from_party_linked2: data[i].field_from_party_12222
                    ? data[i].field_from_party_12222.replace(
                        "href=\"",
                        "target=\"_blank\" href=\"https://your-link-prefix/"
                      )
                    : "",
                  from_party_text2: data[i].field_from_party_1222 || "",
                  //END ADDED FIELDS
  
                  date_start: data[i].field_date_start_text_,
                  date_end: data[i].field_date_end_text_,
                  indigenous_signatories: data[i].field_history_notes222,
                  notes: "", // ???
                  descr: data[i].field_grant_description,
                  builds:
                    data[i].field_current_buildings_and_land.length > 0
                      ? data[i].field_current_buildings_and_land.split(", ")
                      : [],
                  type: data[i].field_proptype.replace(
                    "href=\u0022",
                    "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
                  ),
                };
                lots_info_length += 1;
              }
            }
          }
        }
      })
      .fail(handleAjaxError);
  }
  