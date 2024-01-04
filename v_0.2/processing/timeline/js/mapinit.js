var grant_lots_view_id = null,
    dgrants_layer_view_id = null,
	native_group_layer_view_id = null,
    grant_lots_view_flag = false,
    demo_layer_view_flag = false,
	dgrants_layer_view_flag = false,
	native_group_layer_view_flag = false;
	
$("#infoLayerGrantLots").slideUp();
$("#infoLayerDutchGrants").slideUp();
$("#demoLayerInfo").slideUp();
$("#infoLayerNativeGroups").slideUp();

// world bounds
const WorldBounds = [

	
	/*
	//For Sidebar Closed
	//Less of Greenland shown
	//Most ideal but Western third of North America cut off when sidebar open
    [-160,-61], // [west, south]
    [163,74]  // [east, north]
	*/
	

	/*
	//For Sidebar Open
	//Western portion beyond lower United States is cut off but Bering Strait seen
    [-179,-60], // [west, south]
    [146,75]  // [east, north]
	*/
	

	/*
	//For Sidebar Open
	//All Eurasia and North America visible
	//Shows too much of Greenland which is projected too large
    [-156,-69], // [west, south]
    [55,82]  // [east, north]
	*/

	
	//CURRENT CHOSEN:
	//For Sidebar Open
	//Alaska and Eastern most tip of Russia cut off
	//Shows less but still too much of Greenland which is projected too large
    [-179,-59], // [west, south]
    [135,77]  // [east, north]
	
	

];

// area bounds
	var LongIslandBounds = [[-74.0419692,40.5419011],[-71.8562705,41.161155]],
        ManhattanBounds = [[-74.04772962697074,40.682916945445164],[-73.90665099539478,40.879038046804695]],
		NYCbounds = [[-74.25559136315213,40.496133987611834],[-73.7000090638712,40.91553277650267]],
		BronxBounds = [[-73.93360592036706,40.785356620508495],[-73.76533243995276,40.91553277650267]],
		BrooklynBounds = [[-74.04189660705046,40.56952999398417],[-73.8335592388046,40.73912795313439]],
		QueensBounds = [[-73.96262015898652,40.54183396045311],[-73.7000090638712,40.80101146781903]],
		StatenIslandBounds = [[-74.25559136315213,40.496133987611834],[-74.04923629842045,40.648925552276076]],
		NewNLbounds = [[-75.5588888888889,39.5483333333333],[-71.6483333333333,42.64485]],
		NewEnglandBounds = [[-73.6468505859375, 41.017210578228436],[-69.708251953125,43.97700467496408]];

/////////////////////////////
//ACCESS TOKEN
/////////////////////////////

mapboxgl.accessToken =
	"pk.eyJ1Ijoibml0dHlqZWUiLCJhIjoid1RmLXpycyJ9.NFk875-Fe6hoRCkGciG8yQ";




/////////////////////////////
//ADD MAP CONTAINER
/////////////////////////////

        var beforeMap = new mapboxgl.Map({
            container: 'before',
            style: 'mapbox://styles/nittyjee/cjooubzup2kx52sqdf9zmmv2j',
            center: [0, 0],
            hash: true,
            zoom: 0,
			attributionControl: false
        });

        var afterMap = new mapboxgl.Map({
            container: 'after',
            style: 'mapbox://styles/nittyjee/cjowjzrig5pje2rmmnjb5b0y2',
            center: [0, 0],
            hash: true,
            zoom: 0,
			attributionControl: false
        });

        var map = new mapboxgl.Compare(beforeMap, afterMap, {
            // Set this to enable comparing two maps by mouse movement:
            // mousemove: true
        });

        // Set the map's max bounds
		/*
		beforeMap.setMaxBounds(WorldBounds);
        afterMap.setMaxBounds(WorldBounds);
        */
        /////////////////////////////
        //ADD NAVIGATION CONTROLS (ZOOM IN AND OUT)
        /////////////////////////////
        //Before map
        var nav = new mapboxgl.NavigationControl();
        beforeMap.addControl(nav, "bottom-right");
		
        //After map
        var nav = new mapboxgl.NavigationControl();
        afterMap.addControl(nav, "bottom-right");
		

		
		
		var init_bearing,
		    init_center,
			init_zoom;
			
		var na_bearing = -51.3,
		    na_center = [-74.01255, 40.704882],
			na_zoom = 16.34;

		

		function testZoom() {
            var current_bearing = beforeMap.getBearing();
            var TestBounds = [-74.01507471506183, 40.70239266372983, -74.00734180289922, 40.709035402164524]; //dutch grants
            //[-74.0128690093802, 40.705887398291175, -73.9457283353804, 40.817639419566085]; //Farms Layer
            beforeMap.fitBounds(TestBounds, {bearing: current_bearing});
				afterMap.fitBounds(TestBounds, {bearing: current_bearing});
		}
		
        function zoomtobounds(boundsName){
			switch(boundsName){
				case 'LongIsland':
				if(windoWidth <= 637) {
					beforeMap.fitBounds(LongIslandBounds, {bearing: 0});
				    afterMap.fitBounds(LongIslandBounds, {bearing: 0});
				} else {
			        beforeMap.fitBounds(LongIslandBounds, {bearing: 0, padding: {top: 5, bottom:5, left: 350, right: 5}});
				    afterMap.fitBounds(LongIslandBounds, {bearing: 0, padding: {top: 5, bottom:5, left: 350, right: 5}});
				}
				break;
				case 'Brooklyn':
			    beforeMap.fitBounds(BrooklynBounds, {bearing: 0});
				afterMap.fitBounds(BrooklynBounds, {bearing: 0});
				break;
				case 'NYC':
			    beforeMap.fitBounds(NYCbounds, {bearing: 0});
				afterMap.fitBounds(NYCbounds, {bearing: 0});
				break;
				case 'NewNL':
			    beforeMap.fitBounds(NewNLbounds, {bearing: 0});
				afterMap.fitBounds(NewNLbounds, {bearing: 0});
				break;
				case 'NewEngland':
			    beforeMap.fitBounds(NewEnglandBounds, {bearing: 0});
				afterMap.fitBounds(NewEnglandBounds, {bearing: 0});
				break;
				case 'Manhattan':
			    beforeMap.fitBounds(ManhattanBounds, {bearing: na_bearing});
				afterMap.fitBounds(ManhattanBounds, {bearing: na_bearing});
				break;
				case 'World':
			    beforeMap.fitBounds(WorldBounds, {bearing: 0});
				afterMap.fitBounds(WorldBounds, {bearing: 0});
				break;
			}
		}
		
		function zoomtocenter(centerName){
			switch(centerName){
				case 'NA':
			    beforeMap.easeTo({center: na_center, zoom: na_zoom, bearing: na_bearing, pitch: 0});
			    afterMap.easeTo({center: na_center, zoom: na_zoom, bearing: na_bearing, pitch: 0});
				break;
				case 'Manatus Map':
			    beforeMap.easeTo({center: [-73.9512,40.4999], zoom: 9, bearing: -89.7, pitch: 0});
			    afterMap.easeTo({center: [-73.9512,40.4999], zoom: 9, bearing: -89.7, pitch: 0});
				break;
				case 'Original Grants':
			    beforeMap.easeTo({center: [-73.9759,40.7628], zoom: 12, bearing: -51.3, pitch: 0});
			    afterMap.easeTo({center: [-73.9759,40.7628], zoom: 12, bearing: -51.3, pitch: 0});
				break;
				case 'NYC plan':
			    beforeMap.easeTo({center: [-74.01046,40.70713], zoom: 15, bearing: -51.3, pitch: 0});
			    afterMap.easeTo({center: [-74.01046,40.70713], zoom: 15, bearing: -51.3, pitch: 0});
				break;
				case 'Ratzer Map':
			    beforeMap.easeTo({center: [-74.00282,40.69929], zoom: 12, bearing: -6.5, pitch: 0});
			    afterMap.easeTo({center: [-74.00282,40.69929], zoom: 12, bearing: -6.5, pitch: 0});
				break;
				case 'Long Island':
			    beforeMap.easeTo({center: [-73.094,41.1], zoom: 8, bearing: 0, pitch: 0});
			    afterMap.easeTo({center: [-73.094,41.1], zoom: 8, bearing: 0, pitch: 0});
				break;
				case 'NY Bay':
			    beforeMap.easeTo({center: [-73.9998,40.6662], zoom: 11, bearing: 0, pitch: 0});
			    afterMap.easeTo({center: [-73.9998,40.6662], zoom: 11, bearing: 0, pitch: 0});
				break;
				case 'Gravesend Map':
			    beforeMap.easeTo({center: [-73.97629,40.60105], zoom: 13, bearing: 0, pitch: 0});
			    afterMap.easeTo({center: [-73.97629,40.60105], zoom: 13, bearing: 0, pitch: 0});
				break;
				case 'Long Island 1873':
			    beforeMap.easeTo({center: [-73.2739,40.876], zoom: 8.6, bearing: 0, pitch: 0});
			    afterMap.easeTo({center: [-73.2739,40.876], zoom: 8.6, bearing: 0, pitch: 0});
				break;
				case 'Belgii Novi':
			    beforeMap.easeTo({center: [-74.39,40.911], zoom: 5.7, bearing: -7.2, pitch: 0});
			    afterMap.easeTo({center: [-74.39,40.911], zoom: 5.7, bearing: -7.2, pitch: 0});
				break;
				case 'New England':
			    beforeMap.easeTo({center: [-72.898,42.015], zoom: 7, bearing: 0, pitch: 0});
			    afterMap.easeTo({center: [-72.898,42.015], zoom: 7, bearing: 0, pitch: 0});
				break;
			}
		}

        /////////////////////////////
        //BASEMAP MENU SWITCHING FUNCTIONALITY
		/////////////////////////////


		//RIGHT MENU
        var rightInputs = document.getElementsByName('rtoggle');
		
        function switchRightLayer(layer) {
            var rightLayerClass = layer.target.className; //*A layer.target.id;
            afterMap.setStyle('mapbox://styles/nittyjee/' + rightLayerClass);
        }

        for (var i = 0; i < rightInputs.length; i++) {
            rightInputs[i].onclick = switchRightLayer;
		}


		//LEFT MENU
		var leftInputs = document.getElementsByName('ltoggle');
		
        function switchLeftLayer(layer) {
            var leftLayerClass = layer.target.className; //*A layer.target.id;
            beforeMap.setStyle('mapbox://styles/nittyjee/' + leftLayerClass);
        }

        for (var i = 0; i < leftInputs.length; i++) {
            leftInputs[i].onclick = switchLeftLayer;
		}







/////////////////////////////
// on Map events
/////////////////////////////

var grant_lots_click_ev = false,
	demo_taxlot_click_ev = false,
	dutch_grant_click_ev = false,
	native_groups_click_ev = false;

var afterMapPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false }),
    beforeMapPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });

var coordinates = [];
var places_popup_html = "",
    settlements_popup_html = "";

var afterMapPlacesPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false }),
    beforeMapPlacesPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });
	
var afterHighCastelloPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false }),
    beforeHighCastelloPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });

var afterHighDemoPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false }),
    beforeHighDemoPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });
	
var afterHighGrantLotsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeHighGrantLotsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });
	
var afterHighCurrLotsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeHighCurrLotsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });
	
var afterMapGrantLotPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeMapGrantLotPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });

var afterHighMapGrantLotPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeHighMapGrantLotPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });

var afterMapDutchGrantPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeMapDutchGrantPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });
	
	
/* REPLACE THIS */
var afterMapGravesendPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeMapGravesendPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });

var afterHighMapGravesendPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeHighMapGravesendPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });

var afterMapGravesendTwoPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeMapGravesendTwoPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });
/* REPLACE THIS */


var afterMapNativeGroupsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeMapNativeGroupsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });

var afterHighMapNativeGroupsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeHighMapNativeGroupsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });


var afterMapKarlPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeMapKarlPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });

var afterHighMapKarlPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeHighMapKarlPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });

var afterMapKarlTwoPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeMapKarlTwoPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });
	

var afterHighFarmPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeHighFarmPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });

var afterMapFarmPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeMapFarmPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });

var afterMapCurrLotsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeMapCurrLotsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });
	
var afterMapSettlementsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false }),
    beforeMapSettlementsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });
	
var afterHighMapSettlementsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false }),
    beforeHighMapSettlementsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });

var hoveredStateIdRight = null,
    hoveredStateIdLeft = null,
	hoveredStateIdRightCircle = null,
    hoveredStateIdLeftCircle = null,
	hoveredGrantStateIdRight = null,
	hoveredGrantStateIdLeft = null,
	hoveredGrantLotIdRight = null,
	hoveredGrantLotIdLeft = null,
	hoveredDutchGrantIdRight = null,
	hoveredDutchGrantIdLeft = null,
	hoveredNativeGroupsIdRight = null,
	hoveredNativeGroupsIdLeft = null,
	hoveredKarlIdRight = null,
	hoveredKarlIdLeft = null,
	hoveredFarmsIdRight = null,
	hoveredFarmsIdLeft = null,
	hoveredCurrLotsIdRight = null,
	hoveredCurrLotsIdLeft = null,
	hoveredSettlementsIdRight = null,
	hoveredSettlementsIdLeft = null;
	
var clickedStateId = null,
    clickedSettlementsId = null;
	
var demo_layer_features = null;

beforeMap.on("load", function () {
	console.log("load");
	/*
	console.log(beforeMap.getBearing());
	console.log(beforeMap.getZoom());
	console.log(beforeMap.getCenter());
	*/
	init_zoom = beforeMap.getZoom();
	init_bearing = beforeMap.getBearing();
	init_center = beforeMap.getCenter();

	var sliderVal = moment($("#date").val()).unix();
	var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
	var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));
    
	
		// CLICK AND OPEN POPUP
		beforeMap.on('click', 'c7_dates-ajsksu-left', function (e) {
		          
            DemoClickHandle(e);
				  
		}).on('click', 'grant-lots-left' , function (e) {
				        
            GrantLotsHandle(e);
						
		}).on('click', 'grants1-5sp9tb-left' , function (e) {
				        
			DutchGrantsClickHandle(e);
						
		}).on('click', 'native-groups-area-left' , function (e) {
					
		    NativeGroupsClickHandle(e);
						
		}).on('click', function () {
					
			DefaultHandle();
					
		});
	
	
});

afterMap.on("load", function () {
	console.log("load");
	//*A var sliderVal = $("#date").val();
	var sliderVal = moment($("#date").val()).unix();
	var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
	var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));
    
	
		// CLICK AND OPEN POPUP
		afterMap.on('click', 'c7_dates-ajsksu-right', function (e) {
			
            DemoClickHandle(e);
			
		}).on('click', 'grant-lots-right' , function (e) {
				        
            GrantLotsHandle(e);
						
		}).on('click', 'grants1-5sp9tb-right' , function (e) {
					
		    DutchGrantsClickHandle(e);
						
		}).on('click', 'native-groups-area-right' , function (e) {
					
		    NativeGroupsClickHandle(e);
						
		}).on('click', function () {
			        
			DefaultHandle();
					
		});

	
});

beforeMap.on("error", function (e) {
	// Hide those annoying non-error errors
	if (e && e.error !== "Error") console.log(e);
});

afterMap.on("error", function (e) {
	// Hide those annoying non-error errors
	if (e && e.error !== "Error") console.log(e);
});


//////////////////////////////////////////////
// ===== Layers click event functions ======
//////////////////////////////////////////////
	    
		function DefaultHandle() {
		
		            if(!demo_taxlot_click_ev && !grant_lots_click_ev && !dutch_grant_click_ev && !native_groups_click_ev ) {
                        if(windoWidth > 637)
			                $('#view-hide-layer-panel').trigger('click');
					}
					
					demo_taxlot_click_ev = false;
					grant_lots_click_ev = false;
					dutch_grant_click_ev = false;
					native_groups_click_ev = false;
		
		}

			 

        function GrantLotsHandle(event) { 
		            
					var highPopUpHTML = "<div class='infoLayerGrantLotsPopUp'>" +
									    event.features[0].properties.name + "<br>" +
										"<b>Start:</b> " + event.features[0].properties.day1 + ", " + event.features[0].properties.year1 + "<br>" +
										"<b>End:</b> " + event.features[0].properties.day2 + ", " + event.features[0].properties.year2 + "<br>" +
										//"<br>" +
										"<b>Lot Division: </b>" + event.features[0].properties.dutchlot +
									    "</div>";
		
						if(layer_view_flag) {
							if(grant_lots_view_id == event.features[0].id) {
								if(grant_lots_view_flag) {
							        $("#infoLayerGrantLots").slideUp(); 
									grant_lots_view_flag = false;
									if(afterHighGrantLotsPopUp.isOpen()) afterHighGrantLotsPopUp.remove();
									if(beforeHighGrantLotsPopUp.isOpen()) beforeHighGrantLotsPopUp.remove();
								} else {
									if(windoWidth > 637) {
									    //$("#infoLayerGrantLots").html(event.features[0].properties.name).slideDown();
									    buildGrantLotsPopUpInfo(event.features[0].properties);
									    console.log($(".infoLayerElem").first().attr("id"));
									    if($(".infoLayerElem").first().attr("id") != "infoLayerGrantLots")
									        $("#infoLayerGrantLots").insertBefore($(".infoLayerElem").first());
							            $("#infoLayerGrantLots").slideDown();
								    }
								    grant_lots_view_flag = true;
									afterHighGrantLotsPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
									if(!afterHighGrantLotsPopUp.isOpen()) afterHighGrantLotsPopUp.addTo(afterMap);
									beforeHighGrantLotsPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
									if(!beforeHighGrantLotsPopUp.isOpen()) beforeHighGrantLotsPopUp.addTo(beforeMap);
								}
							} else {
								if(windoWidth > 637) {
			                        //$("#infoLayerGrantLots").html(event.features[0].properties.name).slideDown();
								    buildGrantLotsPopUpInfo(event.features[0].properties);
								    console.log($(".infoLayerElem").first().attr("id") );
								    if($(".infoLayerElem").first().attr("id") != "infoLayerGrantLots")
								        $("#infoLayerGrantLots").insertBefore($(".infoLayerElem").first()); //($("#rightInfoBar"));
							        $("#infoLayerGrantLots").slideDown();
								}
								grant_lots_view_flag = true;
								afterHighGrantLotsPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
								if(!afterHighGrantLotsPopUp.isOpen()) afterHighGrantLotsPopUp.addTo(afterMap);
								beforeHighGrantLotsPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
								if(!beforeHighGrantLotsPopUp.isOpen()) beforeHighGrantLotsPopUp.addTo(beforeMap);
							}
							grant_lots_view_id = event.features[0].id;
						} else {
							//$("#infoLayerGrantLots").html(event.features[0].properties.name).slideDown();
							if(windoWidth > 637) {
							    buildGrantLotsPopUpInfo(event.features[0].properties);
							    console.log($(".infoLayerElem").first().attr("id") );
							    if($(".infoLayerElem").first().attr("id") != "infoLayerGrantLots")
							        $("#infoLayerGrantLots").insertBefore($(".infoLayerElem").first());
							    $("#infoLayerGrantLots").slideDown();
							    $('#view-hide-layer-panel').trigger('click');
							}
							grant_lots_view_id = null;
							afterHighGrantLotsPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
							if(!afterHighGrantLotsPopUp.isOpen()) afterHighGrantLotsPopUp.addTo(afterMap);
							beforeHighGrantLotsPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
							if(!beforeHighGrantLotsPopUp.isOpen()) beforeHighGrantLotsPopUp.addTo(beforeMap);
					    } 
						
						grant_lots_click_ev = true;
        }
		
			 
        function DemoClickHandle(event) { 
					if(demo_layer_view_flag) {
				        $("#demoLayerInfo").slideUp();
						demo_layer_view_flag = false;
						//if(afterMapPopUp.isOpen()) afterMapPopUp.remove();
						if(afterHighDemoPopUp.isOpen()) afterHighDemoPopUp.remove();
						if(beforeHighDemoPopUp.isOpen()) beforeHighDemoPopUp.remove();
					} else {
						if(windoWidth > 637) {
						    buildPopUpInfo(event.features[0].properties);
						    if($(".infoLayerElem").first().attr("id") != "demoLayerInfo")
						        $("#demoLayerInfo").insertBefore($(".infoLayerElem").first());
					        $("#demoLayerInfo").slideDown();
						    
						    if(!layer_view_flag) $('#view-hide-layer-panel').trigger('click');
						}
						
						demo_layer_view_flag = true;
						
						beforeHighDemoPopUp
                        .setLngLat(coordinates)
                        .setHTML("<div class='demoLayerInfoPopUp'><b><h2>Taxlot: <a href='https://encyclopedia.nahc-mapping.org/taxlot/c7' target='_blank'>C7</a></h2></b></div>");
					    if(!beforeHighDemoPopUp.isOpen()) beforeHighDemoPopUp.addTo(beforeMap);
					
					    afterHighDemoPopUp
                        .setLngLat(coordinates)
						.setHTML("<div class='demoLayerInfoPopUp'><b><h2>Taxlot: <a href='https://encyclopedia.nahc-mapping.org/taxlot/c7' target='_blank'>C7</a></h2></b></div>");
					    if(!afterHighDemoPopUp.isOpen()) afterHighDemoPopUp.addTo(afterMap);
					}
					demo_taxlot_click_ev = true;
        }
	
	
	
	function DutchGrantsClickHandle(event) {
	
			        var highPopUpHTML = "";
					if( typeof dutch_grant_lots_info[event.features[0].properties.Lot] == "undefined" ) {
						highPopUpHTML = "<div class='infoLayerDutchGrantsPopUp'>" + event.features[0].properties.name + "<br>";	
					} else {	
						highPopUpHTML = "<div class='infoLayerDutchGrantsPopUp'>" + ( dutch_grant_lots_info[event.features[0].properties.Lot].name_txt.length > 0 ? dutch_grant_lots_info[event.features[0].properties.Lot].name_txt : event.features[0].properties.name ) + "<br>";
					}
					highPopUpHTML += "<b>Dutch Grant Lot: </b>" + event.features[0].properties.Lot + "</div>";
						
						if(layer_view_flag) {
							if(dgrants_layer_view_id == event.features[0].id) {
								if(dgrants_layer_view_flag) {
							        $("#infoLayerDutchGrants").slideUp(); 
									dgrants_layer_view_flag = false;
									//*A#
							        afterMap.setFeatureState(
                                        { source: 'grants1-5sp9tb-right-highlighted', sourceLayer: 'grants1-5sp9tb', id: dgrants_layer_view_id},
                                        { hover: false }
                                    );
									beforeMap.setFeatureState(
                                        { source: 'grants1-5sp9tb-left-highlighted', sourceLayer: 'grants1-5sp9tb', id: dgrants_layer_view_id},
                                        { hover: false }
                                    );
									if(afterHighMapGrantLotPopUp.isOpen()) afterHighMapGrantLotPopUp.remove();
									if(beforeHighMapGrantLotPopUp.isOpen()) beforeHighMapGrantLotPopUp.remove();
								} else {
									if(windoWidth > 637) {
									    buildDutchGrantPopUpInfo(event.features[0].properties);
									    if($(".infoLayerElem").first().attr("id") != "infoLayerDutchGrants")
									        $("#infoLayerDutchGrants").insertBefore($(".infoLayerElem").first());
							            $("#infoLayerDutchGrants").slideDown();
								    }
								    dgrants_layer_view_flag = true;
									//*A#
									afterMap.setFeatureState(
                                       { source: 'grants1-5sp9tb-right-highlighted', sourceLayer: 'grants1-5sp9tb', id: dgrants_layer_view_id},
                                       { hover: true }
                                    );
									beforeMap.setFeatureState(
                                       { source: 'grants1-5sp9tb-left-highlighted', sourceLayer: 'grants1-5sp9tb', id: dgrants_layer_view_id},
                                       { hover: true }
                                    );
									afterHighMapGrantLotPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
									if(!afterHighMapGrantLotPopUp.isOpen()) afterHighMapGrantLotPopUp.addTo(afterMap);
									beforeHighMapGrantLotPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
									if(!beforeHighMapGrantLotPopUp.isOpen()) beforeHighMapGrantLotPopUp.addTo(beforeMap);
								}
							} else {
								if(windoWidth > 637) {
								    buildDutchGrantPopUpInfo(event.features[0].properties);
								    if($(".infoLayerElem").first().attr("id") != "infoLayerDutchGrants")
								        $("#infoLayerDutchGrants").insertBefore($(".infoLayerElem").first());
							        $("#infoLayerDutchGrants").slideDown();
								}
								dgrants_layer_view_flag = true;
								//*A#
								afterMap.setFeatureState(
                                    { source: 'grants1-5sp9tb-right-highlighted', sourceLayer: 'grants1-5sp9tb', id: dgrants_layer_view_id},
                                    { hover: false }
                                );
							    afterMap.setFeatureState(
                                    { source: 'grants1-5sp9tb-right-highlighted', sourceLayer: 'grants1-5sp9tb', id: event.features[0].id},
                                    { hover: true }
                                );
								beforeMap.setFeatureState(
                                    { source: 'grants1-5sp9tb-left-highlighted', sourceLayer: 'grants1-5sp9tb', id: dgrants_layer_view_id},
                                    { hover: false }
                                );
							    beforeMap.setFeatureState(
                                    { source: 'grants1-5sp9tb-left-highlighted', sourceLayer: 'grants1-5sp9tb', id: event.features[0].id},
                                    { hover: true }
                                );
                                afterHighMapGrantLotPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
								if(!afterHighMapGrantLotPopUp.isOpen()) afterHighMapGrantLotPopUp.addTo(afterMap);
								beforeHighMapGrantLotPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
							    if(!beforeHighMapGrantLotPopUp.isOpen()) beforeHighMapGrantLotPopUp.addTo(beforeMap);
							}
							dgrants_layer_view_id = event.features[0].id;
						} else {
							if(windoWidth > 637) {
							    buildDutchGrantPopUpInfo(event.features[0].properties);
							    if($(".infoLayerElem").first().attr("id") != "infoLayerDutchGrants")
							        $("#infoLayerDutchGrants").insertBefore($(".infoLayerElem").first());
							    $("#infoLayerDutchGrants").slideDown();
							    $('#view-hide-layer-panel').trigger('click');
							}
							//*A#
							afterMap.setFeatureState(
                                { source: 'grants1-5sp9tb-right-highlighted', sourceLayer: 'grants1-5sp9tb', id: dgrants_layer_view_id},
                                { hover: false }
                            );
							afterMap.setFeatureState(
                                { source: 'grants1-5sp9tb-right-highlighted', sourceLayer: 'grants1-5sp9tb', id: event.features[0].id},
                                { hover: true }
                            );
							beforeMap.setFeatureState(
                                { source: 'grants1-5sp9tb-left-highlighted', sourceLayer: 'grants1-5sp9tb', id: dgrants_layer_view_id},
                                { hover: false }
                            );
							beforeMap.setFeatureState(
                                { source: 'grants1-5sp9tb-left-highlighted', sourceLayer: 'grants1-5sp9tb', id: event.features[0].id},
                                { hover: true }
                            );
							afterHighMapGrantLotPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
							if(!afterHighMapGrantLotPopUp.isOpen()) afterHighMapGrantLotPopUp.addTo(afterMap);
							beforeHighMapGrantLotPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
							if(!beforeHighMapGrantLotPopUp.isOpen()) beforeHighMapGrantLotPopUp.addTo(beforeMap);
							dgrants_layer_view_id = event.features[0].id;
							//dgrants_layer_view_id = null;
					    } 
						
						dutch_grant_click_ev = true;
    }
	


    function NativeGroupsClickHandle(event) {
		var highPopUpHTML = "";
		    
			if( (typeof taxlot_event_entities_info[event.features[0].properties.nid] == "undefined") || (event.features[0].properties.nid == "") ) {
		        highPopUpHTML = "<div class='infoLayerCastelloPopUp'><b>Name : </b>" + event.features[0].properties.name + "</div>";
	        } else {
				highPopUpHTML = "<div class='infoLayerCastelloPopUp'><b>Name : </b>" + ( taxlot_event_entities_info[event.features[0].properties.nid].name.length > 0 ? taxlot_event_entities_info[event.features[0].properties.nid].name : event.features[0].properties.name ) + "</div>";
			}
			
						if(layer_view_flag) {
							if(native_group_layer_view_id == event.features[0].id) {
								if(native_group_layer_view_flag) {
							        $("#infoLayerNativeGroups").slideUp(); 
									native_group_layer_view_flag = false;
									//*A#
							        afterMap.setFeatureState(
                                        { source: 'native-groups-area-right-highlighted', sourceLayer: 'long_island_indian_areas-3o4hr7', id: native_group_layer_view_id},
                                        { hover: false }
                                    );
									beforeMap.setFeatureState(
                                        { source: 'native-groups-area-left-highlighted', sourceLayer: 'long_island_indian_areas-3o4hr7', id: native_group_layer_view_id},
                                        { hover: false }
                                    );
									if(afterHighMapNativeGroupsPopUp.isOpen()) afterHighMapNativeGroupsPopUp.remove();
									if(beforeHighMapNativeGroupsPopUp.isOpen()) beforeHighMapNativeGroupsPopUp.remove();
								} else {
									if(windoWidth > 637) {
									    buildNativeGroupPopUpInfo(event.features[0].properties);
									    if($(".infoLayerElem").first().attr("id") != "infoLayerNativeGroups")
									        $("#infoLayerNativeGroups").insertBefore($(".infoLayerElem").first());
							            $("#infoLayerNativeGroups").slideDown();
								    }
								    native_group_layer_view_flag = true;
									//*A#
									afterMap.setFeatureState(
                                       { source: 'native-groups-area-right-highlighted', sourceLayer: 'long_island_indian_areas-3o4hr7', id: native_group_layer_view_id},
                                       { hover: true }
                                    );
									beforeMap.setFeatureState(
                                       { source: 'native-groups-area-left-highlighted', sourceLayer: 'long_island_indian_areas-3o4hr7', id: native_group_layer_view_id},
                                       { hover: true }
                                    );
									afterHighMapNativeGroupsPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
									if(!afterHighMapNativeGroupsPopUp.isOpen()) afterHighMapNativeGroupsPopUp.addTo(afterMap);
									beforeHighMapNativeGroupsPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
									if(!beforeHighMapNativeGroupsPopUp.isOpen()) beforeHighMapNativeGroupsPopUp.addTo(beforeMap);
								}
							} else {
								if(windoWidth > 637) {
								    buildNativeGroupPopUpInfo(event.features[0].properties);
								    if($(".infoLayerElem").first().attr("id") != "infoLayerNativeGroups")
								        $("#infoLayerNativeGroups").insertBefore($(".infoLayerElem").first());
							        $("#infoLayerNativeGroups").slideDown();
							    }
								native_group_layer_view_flag = true;
								//*A#
								afterMap.setFeatureState(
                                    { source: 'native-groups-area-right-highlighted', sourceLayer: 'long_island_indian_areas-3o4hr7', id: native_group_layer_view_id},
                                    { hover: false }
                                );
							    afterMap.setFeatureState(
                                    { source: 'native-groups-area-right-highlighted', sourceLayer: 'long_island_indian_areas-3o4hr7', id: event.features[0].id},
                                    { hover: true }
                                );
								beforeMap.setFeatureState(
                                    { source: 'native-groups-area-left-highlighted', sourceLayer: 'long_island_indian_areas-3o4hr7', id: native_group_layer_view_id},
                                    { hover: false }
                                );
							    beforeMap.setFeatureState(
                                    { source: 'native-groups-area-left-highlighted', sourceLayer: 'long_island_indian_areas-3o4hr7', id: event.features[0].id},
                                    { hover: true }
                                );
                                afterHighMapNativeGroupsPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
								if(!afterHighMapNativeGroupsPopUp.isOpen()) afterHighMapNativeGroupsPopUp.addTo(afterMap);
								beforeHighMapNativeGroupsPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
							    if(!beforeHighMapNativeGroupsPopUp.isOpen()) beforeHighMapNativeGroupsPopUp.addTo(beforeMap);
							}
							native_group_layer_view_id = event.features[0].id;
						} else {
							if(windoWidth > 637) {
							    buildNativeGroupPopUpInfo(event.features[0].properties);
							    if($(".infoLayerElem").first().attr("id") != "infoLayerNativeGroups")
							        $("#infoLayerNativeGroups").insertBefore($(".infoLayerElem").first());
							    $("#infoLayerNativeGroups").slideDown();
							    $('#view-hide-layer-panel').trigger('click');
							}
							//*A#
							afterMap.setFeatureState(
                                { source: 'native-groups-area-right-highlighted', sourceLayer: 'long_island_indian_areas-3o4hr7', id: native_group_layer_view_id},
                                { hover: false }
                            );
							afterMap.setFeatureState(
                                { source: 'native-groups-area-right-highlighted', sourceLayer: 'long_island_indian_areas-3o4hr7', id: event.features[0].id},
                                { hover: true }
                            );
							beforeMap.setFeatureState(
                                { source: 'native-groups-area-left-highlighted', sourceLayer: 'long_island_indian_areas-3o4hr7', id: native_group_layer_view_id},
                                { hover: false }
                            );
							beforeMap.setFeatureState(
                                { source: 'native-groups-area-left-highlighted', sourceLayer: 'long_island_indian_areas-3o4hr7', id: event.features[0].id},
                                { hover: true }
                            );
							afterHighMapNativeGroupsPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
							if(!afterHighMapNativeGroupsPopUp.isOpen()) afterHighMapNativeGroupsPopUp.addTo(afterMap);
							beforeHighMapNativeGroupsPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
							if(!beforeHighMapNativeGroupsPopUp.isOpen()) beforeHighMapNativeGroupsPopUp.addTo(beforeMap);
							native_group_layer_view_id = event.features[0].id;
							//native_group_layer_view_id = null;
					    } 
						
						native_groups_click_ev = true;
    }



//////////////////////////////////////////////
//TIME LAYER FILTERING. NOT SURE HOW WORKS.
//////////////////////////////////////////////


function changeDate(unixDate) {
	var year = parseInt(moment.unix(unixDate).format("YYYY"));
	var date = parseInt(moment.unix(unixDate).format("YYYYMMDD"));

	var yrFilter = ["all", ["<=", "YearStart", year], [">=", "YearEnd", year]];
	var dateFilter = ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]];


   
	///////////////////////////////
	//LAYERS FOR FILTERING
	///////////////////////////////


	//NAHC
	beforeMap.setFilter("grants1-5sp9tb-left", dateFilter);
    afterMap.setFilter("grants1-5sp9tb-right", dateFilter);
	
	beforeMap.setFilter("grants1-5sp9tb-left-highlighted", dateFilter);
	afterMap.setFilter("grants1-5sp9tb-right-highlighted", dateFilter);
	
	beforeMap.setFilter("c7_dates-ajsksu-left", dateFilter);
	afterMap.setFilter("c7_dates-ajsksu-right", dateFilter);
	
	beforeMap.setFilter("grant-lots-lines-left", dateFilter);
	afterMap.setFilter("grant-lots-lines-right", dateFilter);

	
    demo_layer_features = afterMap.queryRenderedFeatures({ layers: ['c7_dates-ajsksu-right'] });
	
	if(demo_layer_view_flag) {
		buildPopUpInfo(demo_layer_features[0].properties);
	}
	
	
}//end function changeDate





/////////////////////////////
//LAYER CHANGING
/////////////////////////////

//BASEMAP SWITCHING
beforeMap.on('style.load', function () {
	//on the 'style.load' event, switch "basemaps" and then re-add layers
	//this is necessary because basemaps aren't a concept in Mapbox, all layers are added via the same primitives
	console.log("style change")
	//switchBeforeStyle();
	//*A var sliderVal = $("#date").val();
	//*A var sliderVal = moment($("#date").val()).unix();
	var sliderVal = moment($("#date").text()).unix();
	var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
	var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));
	console.log(sliderVal)
	console.log(yr)
	console.log(date)

	addBeforeLayers(yr, date);
	addGrantLotsLinesBeforeLayers(date);
	addLongIslandNativeGroupsBeforeLayers();
});

//BASEMAP SWITCHING
afterMap.on('style.load', function () {
	//on the 'style.load' event, switch "basemaps" and then re-add layers
	//this is necessary because basemaps aren't a concept in Mapbox, all layers are added via the same primitives
	console.log("style change after")
	//switchStyle();
	//*A var sliderVal = $("#date").val();
	//*A var sliderVal = moment($("#date").val()).unix();
	var sliderVal = moment($("#date").text()).unix();
	var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
	var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));
	console.log(sliderVal)
	console.log(yr)
	console.log(date)

	addAfterLayers(yr, date);
	addGrantLotsLinesAfterLayers(date);
	addLongIslandNativeGroupsAfterLayers();
});

