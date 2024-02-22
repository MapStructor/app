//retrieveLayersInfo.js

/*GPT:

Many functions were separated in the beginning.
The functions for the layers changed so that all we have
 are simple pairs, on the top of each, like so:

     const keyMapping = {
        name_txt: 'to_party_unlinked',
        to_party: 'to_party',
        ETC...
    };

GPT didn't complete each layer function, so will need
 to add the remaining pairs and corresponding logic in each.

One downside of the code: the urls (eg: "https://encyclopedia.nahc-mapping.org/grant-lots-export-properly")
 are in lines outside the functions. Would be nice to find a way to have them combined again. I like
 to keep everything together in one place.




*/



function handleAjaxError(xhr, textStatus) {
    console.warn("jQuery AJAX request ERROR !!!");
    console.log("Response Text: ", xhr.responseText);
    console.log("Status: ", textStatus);
}

function ajaxGetData(url, processDataFunction) {
    $.ajax({
        url: url,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        type: "get",
        dataType: "json"
    })
    .done(processDataFunction)
    .fail(handleAjaxError);
}


function replaceHrefWithAbsoluteUrl(inputString) {
    const baseUrl = "https://nahc-mapping.org/mappingNY/encyclopedia";
    return inputString.replace("href=\u0022", `target=\u0022_blank\u0022 href=\u0022${baseUrl}`);
}


// Example usage:
ajaxGetData("https://encyclopedia.nahc-mapping.org/grant-lots-export-properly", processDutchGrantsInfo);
// Repeat for other data types with corresponding URLs and processing functions



function processDutchGrants(data) {
    const keyMapping = {
        name_txt: 'to_party_unlinked',
        to_party: 'to_party',
        from_party: 'from_party',
        start: 'start',
        end: 'end',
        notes: 'note',
        descr: 'description',
        builds: 'images' // Assuming this field is a comma-separated string that needs splitting
    };

    var dutch_grant_lots_info = {};
    var dutch_grant_lots_info_length = 0;

    data.forEach((item) => {
        if (item.title) {
            let data_info_index = item.title.replace(/\s+/g, "").replace(/FortAmsterdam/, "Fort Amsterdam");

            dutch_grant_lots_info[data_info_index] = {};

            for (let key in keyMapping) {
                if (keyMapping.hasOwnProperty(key)) {
                    let value = item[keyMapping[key]];

                    // Transform URLs
                    if (key === 'to_party' || key === 'from_party') {
                        value = replaceHrefWithAbsoluteUrl(value);
                    }

                    // Split 'builds' into an array
                    if (key === 'builds') {
                        value = value.length > 0 ? value.split(", ") : [];
                    }

                    dutch_grant_lots_info[data_info_index][key] = value;
                }
            }

            dutch_grant_lots_info_length++;
        }
    });

    return dutch_grant_lots_info;
}


function getSettlementsInfo() {
    ajaxGetData("https://encyclopedia.nahc-mapping.org/places-list-export", processSettlements);
}

function processSettlements(data) {
    const keyMapping = {
        // Define key mappings here, adjust based on your actual data structure
        name: 'title',
        current_location: 'field_current_location_text_',
        // ... other mappings ...
    };

    var settlements_info = {};
    var settlements_info_length = 0;

    data.forEach((item) => {
        if (item.nid && item.nid[0] && item.nid[0].value) {
            let data_info_index = "" + item.nid[0].value;

            settlements_info[data_info_index] = {};

            for (let key in keyMapping) {
                if (keyMapping.hasOwnProperty(key)) {
                    let value = item[keyMapping[key]];

                    // Apply transformations if needed
                    // if (key === 'current_location' || /* other conditions if any */) {
                    //     value = someTransformationFunction(value);
                    // }

                    settlements_info[data_info_index][key] = value;
                }
            }

            settlements_info_length++;
        }
    });

    return settlements_info;
}


function getTaxlotEventEntitiesDescrInfo() {
    ajaxGetData("https://encyclopedia.nahc-mapping.org/taxlot-entities-export", processTaxlotEventEntitiesDescrInfo);
}

function processTaxlotEventEntitiesDescrInfo(data) {
    const keyMapping = {
        name: 'title',
        name_html: 'path', // Assuming this needs special handling for HTML link creation
        description: 'field_description14'
    };

    var taxlot_event_entities_info = {};
    var taxlot_entities_info_length = 0;

    data.forEach((item) => {
        if (item.nid && item.nid[0] && item.nid[0].value) {
            let data_info_index = "" + item.nid[0].value;

            taxlot_event_entities_info[data_info_index] = {};

            for (let key in keyMapping) {
                if (keyMapping.hasOwnProperty(key)) {
                    let value = item[keyMapping[key]];

                    if (key === 'name_html' && Array.isArray(value) && value.length > 0) {
                        // Create an HTML link
                        value = `<a href='https://encyclopedia.nahc-mapping.org/node/${data_info_index}' target='_blank'>${item.title[0].value}</a>`;
                    } else {
                        value = Array.isArray(value) && value.length > 0 ? value[0].value : '';
                    }

                    taxlot_event_entities_info[data_info_index][key] = value;
                }
            }

            taxlot_entities_info_length++;
        }
    });

    return taxlot_event_entities_info;
}


function getTaxlotEventsInfo() {
    ajaxGetData("https://encyclopedia.nahc-mapping.org/taxlot-events-export", processTaxlotEventsInfo);
}

function processTaxlotEventsInfo(data) {
    const keyMapping = {
        title: 'title',
        start: 'field_daystart',
        end: 'end', // Placeholder if there is an end field
        taxlot: 'field_taxlot',
        taxlotevent: 'field_taxlotevent',
        to_party: 'field_to',
        to_party2: 'field_to_party_1',
        from_party: 'field_from',
        from_party2: 'field_from_party_1',
        property_type: 'field_pro',
        to_party_1_text: 'field_events_to_party_1_text_',
        to_party_1_role: 'field_party_role_in_transaction_',
        to_party_1_entity: 'field_entity_description_to_',
        to_party_2_text: 'field_asdf_to_party_2_text_',
        to_party_2_role: 'field_party_role3',
        to_party_2_entity: 'field_entity_description_to_part',
        from_party_1_text: 'field_from_party_1_text_',
        from_party_1_role: 'field_partyrole',
        from_party_1_entity: 'field_entity_desc',
        from_party_2_text: 'field_from_party_2_text_',
        from_party_2_role: 'field_party_role2',
        from_party_2_entity: 'field_entity_description_from_pa',
        // ... other mappings ...
    };

    var taxlot_events_info = {};
    var taxlot_events_info_length = 0;

    data.forEach((item) => {
        let data_info_index = item.title ? item.title.match(/\/node\/(.*?)\"/)[1] : null;
        if (data_info_index) {
            taxlot_events_info[data_info_index] = {};

            for (let key in keyMapping) {
                if (keyMapping.hasOwnProperty(key)) {
                    let value = item[keyMapping[key]];

                    // Apply transformations if needed, especially for URL fields
                    if (typeof value === 'string') {
                        value = replaceHrefWithAbsoluteUrl(value);
                    }

                    taxlot_events_info[data_info_index][key] = value;
                }
            }

            taxlot_events_info_length++;
        }
    });

    return taxlot_events_info;
}


function getInfosEntity() {
    ajaxGetData("https://encyclopedia.nahc-mapping.org/info-entities-export", processInfosEntity);
}

function processInfosEntity(data) {
    const keyMapping = {
        name: 'title',
        name_html: 'path', // Assuming this needs special handling for HTML link creation
        description: 'body'
        // ... other mappings as per your data structure ...
    };

    var infos_entity = {};
    var infos_entity_length = 0;

    data.forEach((item) => {
        if (item.nid && item.nid[0] && item.nid[0].value) {
            let data_info_index = "" + item.nid[0].value;

            infos_entity[data_info_index] = {};

            for (let key in keyMapping) {
                if (keyMapping.hasOwnProperty(key)) {
                    let value = item[keyMapping[key]];

                    // Apply transformations if needed
                    if (key === 'name_html' && Array.isArray(value) && value.length > 0) {
                        // Create an HTML link
                        value = `<a href='https://encyclopedia.nahc-mapping.org/node/${data_info_index}' target='_blank'>${item.title[0].value}</a>`;
                    } else {
                        value = Array.isArray(value) && value.length > 0 ? value[0].value : '';
                    }

                    infos_entity[data_info_index][key] = value;
                }
            }

            infos_entity_length++;
        }
    });

    return infos_entity;
}


function getBrooklynGrantsInfo() {
    ajaxGetData("https://encyclopedia.nahc-mapping.org/brooklyn-grant-ids-export", processBrooklynGrants);
}

function processBrooklynGrants(data) {
    const keyMapping = {
        name: 'title',
        date_start: 'field_start_date_',
        to_party: 'field_to_party_1_text_',
        to_party_linked: 'field_to_party_1222',
        to_party2: 'field_to_party_2_text222',
        to_party2_linked: 'field_to_party_2_text_',
        from_party: 'field_from_party_1222',
        from_party_linked: 'field_from_party_12222',
        indigenous_signatories: 'field_history_notes222',
        // ... other mappings as per your data structure ...
    };

    var brooklyn_grants_info = {};
    var brooklyn_grants_length = 0;

    data.forEach((item) => {
        if (item.nid && item.nid[0] && item.nid[0].value) {
            let data_info_index = "" + item.nid[0].value;

            brooklyn_grants_info[data_info_index] = {};

            for (let key in keyMapping) {
                if (keyMapping.hasOwnProperty(key)) {
                    let value = item[keyMapping[key]];

                    // Apply transformations if needed
                    if (key === 'to_party_linked' || key === 'to_party2_linked' || key === 'from_party_linked') {
                        value = replaceHrefWithAbsoluteUrl(value);
                    } else {
                        value = Array.isArray(value) && value.length > 0 ? value[0].value : '';
                    }

                    brooklyn_grants_info[data_info_index][key] = value;
                }
            }

            brooklyn_grants_length++;
        }
    });

    return brooklyn_grants_info;
}


function getLotsInfo() {
    ajaxGetData("https://encyclopedia.nahc-mapping.org/lots-export2", processLotsInfo);
}

function processLotsInfo(data) {
    const keyMapping = {
        name: 'field_content_type',
        title: 'field_old_title',
        title_linked: 'title', // Special handling will be needed for this field
        brooklyn_title: 'field_original_title_temp',
        to_party_linked: 'field_to_party_1222',
        from_party_linked: 'field_from_party',
        to_party: 'field_to_party_1_text_',
        from_party: 'field_from_party_text_',
        to_party2: 'field_to_party_2_text222',
        to_party2_linked: 'field_to_party_2_text_',
        date_start: 'field_date_start_text_',
        date_end: 'field_date_end_text_',
        indigenous_signatories: 'field_history_notes222',
        description: 'field_grant_description',
        builds: 'field_current_buildings_and_land',
        type: 'field_proptype',
        // ... other mappings ...
    };

    var lots_info = {};
    var lots_info_length = 0;

    data.forEach((item) => {
        let data_info_index = item.field_old_nid || item.field_content_type;
        if (data_info_index) {
            lots_info[data_info_index] = {};

            for (let key in keyMapping) {
                if (keyMapping.hasOwnProperty(key)) {
                    let value = item[keyMapping[key]];

                    // Apply transformations if needed
                    if (typeof value === 'string') {
                        value = replaceHrefWithAbsoluteUrl(value);
                    }

                    // Special handling for title_linked
                    if (key === 'title_linked') {
                        value = value.replace(/>[^<]+<\/a>/, ">" + item.field_old_title + "</a>");
                    }

                    lots_info[data_info_index][key] = value;
                }
            }

            lots_info_length++;
        }
    });

    return lots_info;
}
