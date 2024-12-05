function buildPopUpInfo(props) {
				var popup_html =

					///////
					//TITLE
					///////
					"<b><h2>Demo Taxlot: <a href='https://encyclopedia.nahc-mapping.org/taxlot/c7' target='_blank'>C7</a></h2></b>" +
                    // CAN'T GET THE TAXLOT LINK TO WORK: <a href='https://encyclopedia.nahc-mapping.org/taxlot/c7'>
					////////////////
					//PROPERTY TYPE
					////////////////
					"<b>Property Type: </b>" +
					"House" +


					//LINE
					"<hr>" +


					/////////////
					//DATE RANGE
					////////////

					//FROM
					//example: June 3, 1643
					"<b> FROM: </b>" +
					props.DATE1 +

					//TO
					//example: January 19, 1659
					"<br>" +
					"<b> TO: </b>" +
					props.DATE2 +



					/////////////////////////////////////////////////////////////////////////////////////////////
					//UNKNOWN (DISPLAY TITLE AND EXPLANATION WHERE UNKNOWN OR NOTHING, %nbsp)
					//example 1: <br><br><b>TAXLOT EVENTS UNKNOWN</b><br>Needs research beyond sources used.
					//example 2: &nbsp;
					//////////////////////////////////////////////////////////////////////////////////////////////
					props.Unknown +



					//LINE
					"<hr>" +




					//KEEP THIS AS ALTERNATIVE WAY OF LINKING:
					//'<a href="' + props.tax_lots_3 + '" target="_blank">' + props.tax_lots_3 + '</a>'



					//////////////////////////////////////////////////
					//NEXT
					//example 1: <b>OWNERSHIP:</b><br>
					//example 2: <b>NEXT KNOWN OWNERSHIP:</b><br>
					//////////////////////////////////////////////////
					props.Next +




					///////////////////////
					//OWNERS EXAMPLES:
					//////////////////////

					//NOTE: Not sure if NULLs are a problem, check in the future.

					//TAXLOT EVENT PARTY ROLE 1
					//TO_PAR1 / TO_PAR2 / FROM_PAR1 / FROM PAR2
					//example 1: /nahc/encyclopedia/node/1537 hreflang="en" target="_blank">Joint Owner</a>
					//example 2: NULL

					//FROM PARTY 1 (ANCESTOR)
					//TO_1 / T0_2 / FROM_1 / FROM_2
					//example 1: /nahc/encyclopedia/node/1536 hreflang="en" target="_blank">Signatory</a>
					//example 2: NULL

					//TAXLOT ENTITY DESCRIPTIONS 2
					//TO_ENT1 / TO_ENT2 / FROM_ENT1 / FROM_ENT2
					//example 1: /nahc/encyclopedia/node/1535 hreflang="en" target="_blank">Corporation</a>
					//example 2: NULL




					//////////////////////////////////////////
					//TO OWNERS
					//examples: See Above (OWNER EXAMPLES)
					//////////////////////////////////////////



					//OWNER 1
					'<a href=https://nahc-mapping.org/mappingNY' + props.TO_PAR1 + ": " +
					"<br>" +
					'<a href=https://nahc-mapping.org/mappingNY' + props.TO_1 +
					" (" + '<a href=https://nahc-mapping.org/mappingNY' + props.TO_ENT1 + ")" +
					"<br>" +
					"<br>" +

					//OWNER 2
					'<a href=https://nahc-mapping.org/mappingNY' + props.TO_PAR2 + ": " +
					"<br>" +
					'<a href=https://nahc-mapping.org/mappingNY' + props.TO_2 +
					" (" + '<a href=https://nahc-mapping.org/mappingNY' + props.TO_ENT2 + ")" +

					"<br>" +
					"<br>" +



					//////////////////
					//TAXLOT EVENT
					//////////////////

					//TAXLOT EVENT TITLE
					//example 1: <b>TAXLOT EVENT:</b>
					//example 2: <b>NEXT TAXLOT EVENT:</b>
					props.Tax_Event +

					"<br>" +


					//TAXLOT EVENT TYPE
					//example: /nahc/encyclopedia/node/1528 hreflang="en" target="_blank">Land Grant or Patent</a>
					'<a href=https://nahc-mapping.org/mappingNY' + props.EVENT1 +
					"<hr>" +


					//////////////////////////////
					//FROM OWNERS
					//examples: see above, OWNER EXAMPLES
					//////////////////////////////


					//FROM TITLE
					//example 1: <b>FROM:</b>
					//example 2: <b>PREVIOUS KNOWN FROM:</b>
					props.Previous +

					"<br>" +

					//FROM 1

					//TAXLOT EVENT PARTY ROLE 1
					'<a href=https://nahc-mapping.org/mappingNY' + props.FROM_PAR1 + ": " +
					"<br>" +
					//FROM PARTY 1 (ANCESTOR)
					'<a href=https://nahc-mapping.org/mappingNY' + props.FROM_1 +
					//TAXLOT ENTITY DESCRIPTIONS 2
					" (" + '<a href=https://nahc-mapping.org/mappingNY' + props.FROM_ENT1 + ")" +
					"<br>" +
					"<br>" +


					//FROM 2

					//TAXLOT EVENT PARTY ROLE 1
					'<a href=https://nahc-mapping.org/mappingNY' + props.FROM_PAR2 + ": " +
					"<br>" +
					//FROM PARTY 2 (ANCESTOR)
					'<a href=https://nahc-mapping.org/mappingNY' + props.FROM_2 +
					//TAXLOT ENTITY DESCRIPTIONS 2
					" (" + '<a href=https://nahc-mapping.org/mappingNY' + props.FROM_ENT2 + ")" +




					///////////////////////////
					//PREVIOUS TAXLOT EVENT (SHOWS UP IF TAXLOT EVENTS UNKNOWN, OTHERWISE BLANK, &nbsp;)
					//////////////////////////

					//TITLE: "PREVIOUS TAXLOT EVENT"
					//example 1: <br><br><b>PREVIOUS TAXLOT EVENT:</b><br>
					//example 2: &nbsp;
					props.Event +

					//PREVIOUS TAXLOT EVENT
					//example 1: /nahc/encyclopedia/node/1528 hreflang="en" target="_blank">Land Grant or Patent</a>
					//example 2: &nbsp;
					'<a href=https://nahc-mapping.org/mappingNY' + props.Prev_Event +






					//LINK TO ALL TAXLOT EVENTS: "SEE ALL TAXLOT EVENTS"
					"<br>" +
					"<hr>" +
					'<b> <h3><a href="https://encyclopedia.nahc-mapping.org/taxlot-events" target="_blank">SEE ALL TAXLOT EVENTS</a></h3></b>'

//NEED TO MAKE THIS OPEN IN SEPARATE TAB!!
;

//console.log(popup_html);
$("#demoLayerInfo").html(popup_html);

}



function buildGrantLotsPopUpInfo(props) {
				var popup_html =
				    "<h3>Grant Lot Division</h3><hr>" +
					"<br>" +
					"<b>Original Dutch Grant: </b>" + props.Lot +
					"<br>" +
					"<b>Lot Division: </b>" + props.dutchlot +
				    "<br>" +
					"<b>Castello Taxlot (1660): </b>" + props.castello +
					"<br>" +
				    "<br>" +
				    "<b>Ownership:</b> " + props.name + "<br>" +
				    "<b>From:</b> " + props.from +
					"<br>" +
				    "<br>" +
					"<b>Start:</b> " + props.day1 + ", " + props.year1 + "<br>" +
					"<b>End:</b> " + props.day2 + ", " + props.year2 + "<br>" +
				    "<br>" +
				    "<b>Description:</b> " + "<br>" +
					props.descriptio + "<br><br>"
				;
				//console.log(props);
    
	$("#infoLayerGrantLots").html(popup_html);

}



function buildDutchGrantPopUpInfo(props) {
	        var popup_html = "";
			//console.log(props);
	        //console.log(dutch_grant_lots_info[props.Lot]);
			if( typeof dutch_grant_lots_info[props.Lot] == "undefined" ) {
			    popup_html = 
				    "<h3>Dutch Grant</h3><hr>" +
				    props.name + "<br>" +
				    "<b>Dutch Grant Lot:</b> <a href='https://encyclopedia.nahc-mapping.org/grantlot/" + props.Lot + "' target='_blank'>" + props.Lot + "</a><br>" +
					"<br>" +
					"<b>Start:</b> <i>" + props.day1 + " " + props.year1 + "</i><br>" +
					"<b>End:</b> <i>" + props.day2 + " " + props.year2 + "</i><br>" +
					"<br>" +
					"<b>Description (partial):</b>" +
					"<br>" +
					props.descriptio + "<br><br>"
				;
			} else {
				var builds_imgs = "";
				if(dutch_grant_lots_info[props.Lot].builds.length > 0) {
					for(let i = 0; i < dutch_grant_lots_info[props.Lot].builds.length; i++){
						//builds_imgs += "<img src='" + dutch_grant_lots_info[props.Lot].builds[i].url + "'  width='258' alt='" + dutch_grant_lots_info[props.Lot].builds[i].alt  + "' title='" + dutch_grant_lots_info[props.Lot].builds[i].title  + "'><br><br>";
					        builds_imgs += "<img src='https://nahc-mapping.org" + dutch_grant_lots_info[props.Lot].builds[i] + "'  width='258' ><br><br>";
					}
				}
				popup_html = 
				    "<h3>Dutch Grant</h3><hr>" +
				    "<br>" +
				    "<b>Dutch Grant Lot:</b> <a href='https://encyclopedia.nahc-mapping.org/grantlot/" + props.Lot + "' target='_blank'>" + props.Lot + "</a><br>" +
					"<br>" +
					"<b>To Party:</b>" + ( dutch_grant_lots_info[props.Lot].to_party.length > 0 ? "<br>" : "" ) + "<i>" + dutch_grant_lots_info[props.Lot].to_party + "</i><br>" +
					"<br>" +
					"<b>From Party:</b>" + ( dutch_grant_lots_info[props.Lot].from_party.length > 0 ? "<br>" : "" ) + "<i>" + dutch_grant_lots_info[props.Lot].from_party + "</i><br>" +
					"<br>" +
					"<b>Start:</b> <i>" + dutch_grant_lots_info[props.Lot].start + "</i><br>" +
					"<b>End:</b> <i>" + dutch_grant_lots_info[props.Lot].end + "</i><br>" +
					"<br>" +
					"<b>Description:</b>" +
					"<br>" +
					"<i>" + dutch_grant_lots_info[props.Lot].descr + "</i><br><br>" +
                                        builds_imgs
				        ;
			}
				
    
	$("#infoLayerDutchGrants").html(popup_html);

}



/*REPLACE THIS*/
function buildGravesendPopUpInfo(props) {
	        var popup_html = "";

			    popup_html = 
				    "<h3>Boundaries</h3><hr>" +
				    //"<b>Name:</b> <i>" + props.Name + "</i><br>" +
					"<b>" + props.Name + "</b>" +
					//"<a href = 'https://encyclopedia.nahc-mapping.org/place/gravesend' target='_blank'>Gravesend</a>" +
					"<br><br>" +
					"<b>Date:</b> <i>" + props['Date Text'] + "</i>" +
					"<br><br>" +
					"<i>" + props['Groups Dyl'] + "</i>" +
					"<br><br>"
				;



    
	$("#infoLayerGravesend").html(popup_html);

}
/*REPLACE THIS*/



function buildNativeGroupPopUpInfo(props) {
	        var popup_html = "<h3>Long Island Tribes</h3><hr>";
                
			if( (typeof taxlot_event_entities_info[props.nid] == "undefined") || (props.nid == "") ) {
			    popup_html += "<b>" + props.name + "</b>";
			} else {
				popup_html += "<b>" + ( taxlot_event_entities_info[props.nid].name_html.length > 0 ? taxlot_event_entities_info[props.nid].name_html : props.name ) + "</b>" +
				              "<br><br>" +
							  "<b>Description:</b>" +
					          "<br>" +
					          taxlot_event_entities_info[props.nid].descr + "<br><br>"
							  ;
			}
			
			popup_html += "<br><br>";
			
			console.log(props);

	$("#infoLayerNativeGroups").html(popup_html);

}




function buildKarlPopUpInfo(props) {
	        var popup_html = "";
            //var ref_name = props.Name.replace(/\s+/g, '');
			//var ref_name = props.enc_name.replace(/\s+/g, '');
			var node_id = props.node_id.replace(/\/node\//g, '');
			
			    popup_html = 
				    "<h3>Long Island Towns</h3><hr>";
				    //"<b>Name:</b> <i>" + props.Name + "</i><br>" 
					//if( typeof settlements_info[ref_name] == "undefined" ) {
					if( typeof settlements_info[node_id] == "undefined" ) {
						//popup_html += "<b>" + props.Name + "</b>";
						popup_html += "<b>" + props.enc_name + "</b>";
				    } else {
						//popup_html += "<b>" + settlements_info[ref_name].name + "</b>";
						popup_html += "<b>" + settlements_info[node_id].name + "</b><br>" +
						              "<b>Date:</b> <i>" + settlements_info[node_id].date + "</i>" +
									  "<br><br>" +
					                  "<b>Description:</b>" +
					                  "<br>" +
					                  "<i>" + settlements_info[node_id].descr + "</i>";
									  
					}
					
					
				popup_html +=	
					"<br>";
					// +
					//props.TownStart + "-" + props.TownEnd +
					//"<a href = 'https://encyclopedia.nahc-mapping.org/place/karl' target='_blank'>Karl</a>" +
					/*
					"<br><br>" +
					props.YearDisp +
					"<br>" +
					props.Event
					*/
				;

    console.log(props);

    
	$("#infoLayerKarl").html(popup_html);

}


function buildFarmsPopUpInfo(props) {
	        var popup_html = "";
			//console.log(props);

			    popup_html = 
				    "<h3>Original Grants &amp; Farms</h3><hr>" +
					"<br>" +
					"<b>To:</b> <i>" + props.To + "</i><br>" +
					"<b>Date:</b> <i>" + props.Date + "</i><br>" +
					"<br>" 
				;
				
			
				
    
	$("#infoLayerFarms").html(popup_html);

}


function buildCurrLotsPopUpInfo(props) {
				var popup_html = 
					"<h3>Current Lot</h3><hr>" +
					"<b>Owner:</b>" + "<br>" + props.OwnerName + "<br><br>" +
					"<b>Address:</b>" + "<br>" + props.Address + "<br><br>" +
					"<b>Lot:</b>" + "<br>" + props.BBL + "<br><br>"
				;




				//console.log(props);
    
	$("#infoLayerCurrLots").html(popup_html);

}




