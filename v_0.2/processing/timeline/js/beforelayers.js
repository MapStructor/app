
//////////////////
// Dynamic Layers
//////////////////

function addBeforeLayers(yr, date) {



	/////////////////
	//NAHC POINTS MAP
	/////////////////

	//beforeMap.on('load', function () {
		
		//REMOVING TAX LOT POINTS IF EXIST
		if (beforeMap.getLayer("c7_dates-ajsksu-left")) beforeMap.removeLayer("c7_dates-ajsksu-left");
        if (beforeMap.getSource("c7_dates-ajsksu")) beforeMap.removeSource("c7_dates-ajsksu");
		if (beforeMap.getLayer("grants1-5sp9tb-left")) beforeMap.removeLayer("grants1-5sp9tb-left");
        if (beforeMap.getSource("grants1-5sp9tb")) beforeMap.removeSource("grants1-5sp9tb");
       
	   
	    //ADD GRANTS POLYGONS
        //*A#
        beforeMap.addLayer({
			//ID: CHANGE THIS, 1 OF 3
			id: "grants1-5sp9tb-left-highlighted",
			type: "fill",
			source: {
				type: "vector",
				//URL: CHANGE THIS, 2 OF 3
				url: "mapbox://nittyjee.b5bpfqeb"
			},
			layout: {
                visibility: document.getElementById('grants_layer').checked ? "visible" : "none",
            },
			"source-layer": "grants1-5sp9tb",
			paint: {
				"fill-color": "#e3ed58",
				"fill-opacity": [ 
					    'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.8,
                            0
                        ],
				"fill-outline-color": "#FF0000"

			},

			filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
		});


        beforeMap.addLayer({
			//ID: CHANGE THIS, 1 OF 3
			id: "grants1-5sp9tb-left",
			type: "fill",
			source: {
				type: "vector",
				//URL: CHANGE THIS, 2 OF 3
				url: "mapbox://nittyjee.b5bpfqeb"
			},
			layout: {
                visibility: document.getElementById('grants_layer').checked ? "visible" : "none",
            },
			"source-layer": "grants1-5sp9tb",
			paint: {
				"fill-color": "#e3ed58",
				"fill-opacity": [ 
					    'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.8,
                            0.5
                        ],
				"fill-outline-color": "#000000"

			},

			filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
		});
		
		
		//CURSOR ON HOVER
            //ON HOVER
			beforeMap.on('mouseenter', 'grants1-5sp9tb-left', function (e) {
                beforeMap.getCanvas().style.cursor = 'pointer';
				beforeMapDutchGrantPopUp.setLngLat(e.lngLat).addTo(beforeMap);
			});
			
            beforeMap.on('mousemove', 'grants1-5sp9tb-left', function (e) {
				if (e.features.length > 0) {
                    if (hoveredDutchGrantIdLeft) {
                        beforeMap.setFeatureState(
                            { source: 'grants1-5sp9tb-left', sourceLayer: 'grants1-5sp9tb', id: hoveredDutchGrantIdLeft},
                            { hover: false }
                        );
                    }
					//console.log(e.features[0]);
                    hoveredDutchGrantIdLeft = e.features[0].id;
                    beforeMap.setFeatureState(
                        { source: 'grants1-5sp9tb-left', sourceLayer: 'grants1-5sp9tb', id: hoveredDutchGrantIdLeft},
                        { hover: true }
                    );
					
					//console.log(e.lngLat.lng);
                 
                    var PopUpHTML = "";
					if( typeof dutch_grant_lots_info[e.features[0].properties.Lot] == "undefined" ) {
						PopUpHTML = "<div class='infoLayerDutchGrantsPopUp'>" + e.features[0].properties.name + "<br>";	
					} else {	
						PopUpHTML = "<div class='infoLayerDutchGrantsPopUp'>" + ( dutch_grant_lots_info[e.features[0].properties.Lot].name_txt.length > 0 ? dutch_grant_lots_info[e.features[0].properties.Lot].name_txt : e.features[0].properties.name ) + "<br>";
					}
					PopUpHTML += "<b>Dutch Grant Lot: </b>" + e.features[0].properties.Lot + "</div>";		
					
					
					coordinates = e.features[0].geometry.coordinates.slice();
                //var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }


                //BEFORE MAP POP UP CONTENTS
                beforeMapDutchGrantPopUp
                    .setLngLat(e.lngLat)
					.setHTML(
                        PopUpHTML
                    );
				
				}
				
            });

            //OFF HOVER
			beforeMap.on('mouseleave', 'grants1-5sp9tb-left', function () {
                beforeMap.getCanvas().style.cursor = '';
				if (hoveredDutchGrantIdLeft) {
                    beforeMap.setFeatureState(
                        { source: 'grants1-5sp9tb-left', sourceLayer: 'grants1-5sp9tb', id: hoveredDutchGrantIdLeft},
                        { hover: false }
                    );
                }
                hoveredDutchGrantIdLeft = null;		
				if(beforeMapDutchGrantPopUp.isOpen()) beforeMapDutchGrantPopUp.remove();
            });
			


		//ADD TAX LOT POINTS
		beforeMap.addLayer({
			//ID: CHANGE THIS, 1 OF 3
			id: "c7_dates-ajsksu-left",
			type: "circle",
			source: {
				type: "vector",
				//URL: CHANGE THIS, 2 OF 3
				url: "mapbox://nittyjee.8krf945a"
			},
			layout: {
                visibility: document.getElementById('circle_point').checked ? "visible" : "none",
            },
			"source-layer": "c7_dates-ajsksu",
			paint: {

				//CIRCLE COLOR
				'circle-color': {
					type: "categorical",
					property: "color",
					stops: [
						["6", "#0000ee"],
						["5", "#097911"],
						["4", "#0000ee"],
						["3", "#097911"],
						["2", "#0000ee"],
						["1", "#097911"]
					],
					default: "#FF0000"
				},

                    //CIRCLE OPACITY
                    'circle-opacity':  [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.5,
                            1
                        ],
					'circle-stroke-width': 2,
					'circle-stroke-color': {
					    type: "categorical",
					    property: "color",
					    stops: [
						    ["6", "#0000ee"],
						    ["5", "#097911"],
						    ["4", "#0000ee"],
						    ["3", "#097911"],
						    ["2", "#0000ee"],
						    ["1", "#097911"]
					    ],
					    default: "#FF0000"
				    },
					'circle-stroke-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            1,
                            0
                        ],


				//CIRCLE RADIUS
				"circle-radius": {
					type: "categorical",
					property: "TAXLOT",
					stops: [
						["C7", 9]
					]
				}

			},
			filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
		});



		//TAX LOT POPUP
		// CLICK AND OPEN POPUP
        //*A



		// CHANGE TO CURSOR WHEN HOVERING
		beforeMap.on('mouseenter', 'c7_dates-ajsksu-left', function (e) {
			beforeMap.getCanvas().style.cursor = 'pointer';
			        //*A console.log(e.features[0].id);
					//*A console.log(e.features[0]);
					
			        if (hoveredStateIdLeftCircle) {
                        beforeMap.setFeatureState(
                            { source: 'c7_dates-ajsksu-left', sourceLayer: 'c7_dates-ajsksu', id: hoveredStateIdLeftCircle},
                            { hover: false }
                        );
                    }
                    hoveredStateIdLeftCircle = e.features[0].id;
                    beforeMap.setFeatureState(
                        { source: 'c7_dates-ajsksu-left', sourceLayer: 'c7_dates-ajsksu', id: hoveredStateIdLeftCircle},
                        { hover: true }
                    );
					
				coordinates = e.features[0].geometry.coordinates.slice();
                //var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
				
				        beforeMapPopUp
				            .setLngLat(coordinates)
							.setHTML("<div class='demoLayerInfoPopUp'><b><h2>Taxlot: <a href='https://encyclopedia.nahc-mapping.org/taxlot/c7' target='_blank'>C7</a></h2></b></div>")
                            .addTo(beforeMap);
					
		});

		// CHANGE TO POINTER WHEN NOT HOVERING
		beforeMap.on('mouseleave', 'c7_dates-ajsksu-left', function () {
			beforeMap.getCanvas().style.cursor = '';
			    if (hoveredStateIdLeftCircle) {
                    beforeMap.setFeatureState(
                        { source: 'c7_dates-ajsksu-left', sourceLayer: 'c7_dates-ajsksu', id: hoveredStateIdLeftCircle},
                        { hover: false }
                    );
                }
                hoveredStateIdLeftCircle = null;		
				if(beforeMapPopUp.isOpen()) beforeMapPopUp.remove();
		});
	//*A });
}




function addGrantLotsLinesBeforeLayers(date) {
	
	//REMOVING TAX LOT POINTS IF EXIST
		if (beforeMap.getLayer("grant-lots-lines-left")) beforeMap.removeLayer("grant-lots-lines-left");
        if (beforeMap.getSource("dutch_grants_lines-1n0e0p")) beforeMap.removeSource("dutch_grants_lines-1n0e0p");
	
	
	// Add a layer showing the places.
	        beforeMap.addLayer({
                id: "grant-lots-lines-left",
                type: "line",
                source: {
                    type: "vector",
                    url: "mapbox://nittyjee.1j4u7q5k"
                },
				layout: {
                    visibility: document.getElementById('grants_layer_lines').checked ? "visible" : "none",
                },
                "source-layer": "dutch_grants_lines-1n0e0p",
                paint: {
                    "line-color": "#FF0000",
					"line-width": 3,
					"line-opacity": 0.8
                },
                filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
            });
			
}






function addLongIslandNativeGroupsBeforeLayers() {



    /* Long Island Indian Borders - 2 Versions: With Coastlines and Without coastlines */

    /* With Coastlines */

    /*

	        beforeMap.addLayer({
                id: "native-groups-lines-right",
                type: "line",
                source: {
                    type: "vector",
                    url: "mapbox://nittyjee.02m6t3qm"
                },
				layout: {
                    visibility: document.getElementById('native_groups_lines').checked ? "visible" : "none",
                },
                "source-layer": "long_island_indian_area_lines-b7m3lt",
                paint: {
                "line-color": "#FF0000",
                "line-width": 2,
                "line-opacity": 1.0
                }
			
            });
	*/	


    /* Without coastlines*/

    beforeMap.addLayer({
        id: "native-groups-lines-left",
        type: "line",
        source: {
            type: "vector",
            url: "mapbox://nittyjee.bxsaikea"
        },
        layout: {
            visibility: document.getElementById('native_groups_lines').checked ? "visible" : "none",
        },
        "source-layer": "simplified_indian_long_island-d223sy",
        paint: {
        //Light Blue:
        //"line-color": "#3a96f8",
        //Orange:
        "line-color": "#ff9900",
        //Red:
        //"line-color": "#FF0000",
        "line-width": 15,
        "line-blur" : 20,
        "line-opacity": 1.0
        }
    
    });



			
	beforeMap.addLayer({
                id: "native-groups-area-left",
                type: "fill",
                source: {
                    type: "vector",
                    url: "mapbox://nittyjee.9dmuvuk4"
                },
				layout: {
                    visibility: document.getElementById('native_groups_area').checked ? "visible" : "none",
                },
                "source-layer": "long_island_indian_areas-3o4hr7",
                paint: {
				"fill-color": "#FF1493",
				"fill-opacity": [ 
					    'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.5,
                            0.2
                        ],
				"fill-outline-color": "#FFD700"
                }
            });
			
			
	beforeMap.addLayer({
                id: "native-groups-area-left-highlighted",
                type: "fill",
                source: {
                    type: "vector",
                    url: "mapbox://nittyjee.9dmuvuk4"
                },
				layout: {
                    visibility: document.getElementById('native_groups_area').checked ? "visible" : "none",
                },
                "source-layer": "long_island_indian_areas-3o4hr7",
                paint: {
				"fill-color": "#FF1493",
				"fill-opacity": [ 
					    'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.3,
                            0
                        ],
				"fill-outline-color": "#FFD700"
                }
            });
			
			
	beforeMap.addLayer({
                id: "native-groups-labels-left",
                type: "symbol",
                source: {
                    type: "vector",
                    url: "mapbox://nittyjee.978p2v80"
                },
				layout: {
                    visibility: document.getElementById('native_groups_labels').checked ? "visible" : "none",
				"text-field": "{name}",
					"text-offset": [0,1],
                    "text-size": {
                    stops: [
                        [0, 4],
                        [22, 34]
                    ]
                    }
                },
                "source-layer": "indian_long_island_labels-483rzu",
                paint: {
                    "text-color": "#000080",
                    "text-halo-color": "#ffffff",
                    "text-halo-width": 5,
                    "text-halo-blur": 1,
                    "text-opacity": {
                        stops: [
                        [6, 0],
                        [7, 1]
                        ]
                    }
                }
            });

    /*
    beforeMap.on('click', 'native-groups-labels-left', function (e) {
		 console.warn("load natie groups labels");
		 console.log(e.features[0]);
	});
    */
	
	//CURSOR ON HOVER
            //ON HOVER
			beforeMap.on('mouseenter', 'native-groups-area-left', function (e) {
                beforeMap.getCanvas().style.cursor = 'pointer';
				beforeMapNativeGroupsPopUp.setLngLat(e.lngLat).addTo(beforeMap);
			});
			
            beforeMap.on('mousemove', 'native-groups-area-left', function (e) {
				if (e.features.length > 0) {
                    if (hoveredNativeGroupsIdLeft) {
                        beforeMap.setFeatureState(
                            { source: 'native-groups-area-left', sourceLayer: 'long_island_indian_areas-3o4hr7', id: hoveredNativeGroupsIdLeft},
                            { hover: false }
                        );
                    }
					//console.log(e.features[0]);
                    hoveredNativeGroupsIdLeft = e.features[0].id;
                    beforeMap.setFeatureState(
                        { source: 'native-groups-area-left', sourceLayer: 'long_island_indian_areas-3o4hr7', id: hoveredNativeGroupsIdLeft},
                        { hover: true }
                    );
					
					//console.log(e.lngLat.lng);
                    var PopUpHTML = "";
					if( (typeof taxlot_event_entities_info[e.features[0].properties.nid] == "undefined") || (e.features[0].properties.nid == "") ) {
						PopUpHTML = "<div class='infoLayerCastelloPopUp'><b>Name : </b>" + e.features[0].properties.name + "</div>";	
					} else {	
						PopUpHTML = "<div class='infoLayerCastelloPopUp'><b>Name : </b>" + ( taxlot_event_entities_info[e.features[0].properties.nid].name.length > 0 ? taxlot_event_entities_info[e.features[0].properties.nid].name : e.features[0].properties.name ) + "</div>";
					}
					//PopUpHTML += "<div class='infoLayerCastelloPopUp'><b>Name : </b>" + e.features[0].properties.name + "</div>";
					
					coordinates = e.features[0].geometry.coordinates.slice();
                //var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }


                //AFTER MAP POP UP CONTENTS
                beforeMapNativeGroupsPopUp
                    .setLngLat(e.lngLat)
					.setHTML(
                        PopUpHTML
                    );
				
				}
				
            });

            //OFF HOVER
			beforeMap.on('mouseleave', 'native-groups-area-left', function () {
                beforeMap.getCanvas().style.cursor = '';
				if (hoveredNativeGroupsIdLeft) {
                    beforeMap.setFeatureState(
                        { source: 'native-groups-area-left', sourceLayer: 'long_island_indian_areas-3o4hr7', id: hoveredNativeGroupsIdLeft},
                        { hover: false }
                    );
                }
                hoveredNativeGroupsIdLeft = null;		
				if(beforeMapNativeGroupsPopUp.isOpen()) beforeMapNativeGroupsPopUp.remove();
            });
}


