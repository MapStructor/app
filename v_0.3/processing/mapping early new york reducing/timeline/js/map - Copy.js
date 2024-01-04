mapboxgl.accessToken =
	"pk.eyJ1Ijoibml0dHlqZWUiLCJhIjoid1RmLXpycyJ9.NFk875-Fe6hoRCkGciG8yQ";

//ADD MAP CONTAINER
const mapboxConfig = {
	container: "map",
	style: "mapbox://styles/nittyjee/ck2f3s0ks0u8o1cpfruf0qne6",
	hash: true,
	center: [-74.01229, 40.70545],
	zoom: 16.7,
	pitchWithRotate: false
}

var map = new mapboxgl.Map(mapboxConfig);

//ADD NAVIGATION CONTROL (ZOOM IN AND OUT)

var nav = new mapboxgl.NavigationControl();
map.addControl(nav, "top-left");

urlHash = window.location.hash;

map.on("load", function () {
	console.log("load");
	var sliderVal = $("#date").val();
	var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
	var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));

	$("#linkButton").on("click", function () {
		document.location.href = "raster-version.html" + urlHash;
	});
});

map.on("error", function (e) {
	// Hide those annoying non-error errors
	if (e && e.error !== "Error") console.log(e);
});

//TIME LAYER FILTERING. NOT SURE HOW WORKS.

function changeDate(unixDate) {
	var year = parseInt(moment.unix(unixDate).format("YYYY"));
	var date = parseInt(moment.unix(unixDate).format("YYYYMMDD"));

	var sv = $("#year");
	if (year < 1700) {
		sv
			.removeClass("y1700")
			.removeClass("y1800")
			.removeClass("y1850")
			.removeClass("y1900")
			.removeClass("y1950")
			.removeClass("y2000")
			.addClass("y1600");
	}
	if (year >= 1700 && year < 1800) {
		sv
			.removeClass("y1600")
			.removeClass("y1800")
			.removeClass("y1850")
			.removeClass("y1900")
			.removeClass("y1950")
			.removeClass("y2000")
			.addClass("y1700");
	}
	if (year >= 1800 && year < 1850) {
		sv
			.removeClass("y1700")
			.removeClass("y1600")
			.removeClass("y1850")
			.removeClass("y1900")
			.removeClass("y1950")
			.removeClass("y2000")
			.addClass("y1800");
	}
	if (year >= 1850 && year < 1900) {
		sv
			.removeClass("y1700")
			.removeClass("y1800")
			.removeClass("y1600")
			.removeClass("y1900")
			.removeClass("y1950")
			.removeClass("y2000")
			.addClass("y1850");
	}
	if (year >= 1900 && year < 1950) {
		sv
			.removeClass("y1700")
			.removeClass("y1800")
			.removeClass("y1850")
			.removeClass("y1600")
			.removeClass("y1950")
			.removeClass("y2000")
			.addClass("y1900");
	}
	if (year >= 1950 && year < 2000) {
		sv
			.removeClass("y1700")
			.removeClass("y1800")
			.removeClass("y1850")
			.removeClass("y1900")
			.removeClass("y1600")
			.removeClass("y2000")
			.addClass("y1950");
	}
	if (year >= 2000) {
		sv
			.removeClass("y1700")
			.removeClass("y1800")
			.removeClass("y1850")
			.removeClass("y1900")
			.removeClass("y1950")
			.removeClass("y1600")
			.addClass("y2000");
	}
	var dateFilter = ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]];

	//LAYERS FOR FILTERING

	//NAHC
	map.setFilter("c7_dates-ajsksu", dateFilter);
}

//LAYERS AND LEGEND

function setLayers() {
	//TOGGLE LAYERS
	var toggleableLayerIds = [
		"buildings",
		"netherlands_buildings-6wkgma",
		"US_Major_Boundaries_Lines-2706lh",
		"US_Minor_Boundaries-1lyzcs",
		"Indian_Subcontinent_Major_Bou-dpiee3",
		"us_major_boundary_labels",
		"Indian_Subcontinent_Major_Bou-5gq491",
		"population"
	];

	//LEGEND?
	var legend = document.getElementById("legend");
	while (legend.hasChildNodes()) {
		legend.removeChild(legend.lastChild);
	}

	//TOGGLING
	for (var i = 0; i < toggleableLayerIds.length; i++) {
		//use closure to deal with scoping
		(function () {
			var id = toggleableLayerIds[i];

			//ADD CHECKBOX
			var input = document.createElement("input");
			input.type = "checkbox";
			input.id = id;
			input.checked = true;

			//ADD LABEL
			var label = document.createElement("label");
			label.setAttribute("for", id);
			label.textContent = id;

			//CHECKBOX CHANGING (CHECKED VS. UNCHECKED)
			input.addEventListener("change", function (e) {
				map.setLayoutProperty(
					id,
					"visibility",
					e.target.checked ? "visible" : "none"
				);
			});

			//NOTE?
			var layers = document.getElementById("legend");
			layers.appendChild(input);
			layers.appendChild(label);
			layers.appendChild(document.createElement("br"));
		})();
	}
}

//LAYER CHANGING

//BASEMAP SWITCHING
map.on('style.load', function () {
	//on the 'style.load' event, switch "basemaps" and then re-add layers
	//this is necessary because basemaps aren't a concept in Mapbox, all layers are added via the same primitives
	console.log("style change")
	switchStyle();
	var sliderVal = $("#date").val();
	var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
	var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));
	console.log(sliderVal)
	console.log(yr)
	console.log(date)
	setLayers();
	addLayers(yr, date);
});

//LAYER SWITCHING
function switchStyle() {
	var basemaps = document.getElementById('styleSwitcher');
	var inputs = basemaps.getElementsByTagName('input');
	console.log(inputs)
	console.log(inputs.length)
	function switchLayer(layer) {
		var layerId = layer.target.id;
		if (layerId == 'hidden') {
			map.setStyle('mapbox://styles/nittyjee/ck2f3s0ks0u8o1cpfruf0qne6');
		}
		else {
			map.setStyle('mapbox://styles/mapbox/' + layerId + '-v9');
		}
	}

	for (var i = 0; i < inputs.length; i++) {
		inputs[i].onclick = switchLayer;
	}
}

//MAP LAYERS

function addLayers(_, date) {
	//NAHC POINTS MAP

	map.on('load', function () {

		//ADD TAX LOT POINTS

		map.addLayer({
			//ID: CHANGE THIS, 1 OF 3
			id: "c7_dates-ajsksu",
			type: "circle",
			source: {
				type: "vector",
				//URL: CHANGE THIS, 2 OF 3
				url: "mapbox://nittyjee.8krf945a"
			},
			"source-layer": "c7_dates",
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

		// CLICK AND OPEN POPUP
		map.on('click', 'c7_dates-ajsksu', function (e) {
			var coordinates = e.features[0].geometry.coordinates.slice();
			var description = e.features[0].properties.description;

			// Ensure that if the map is zoomed out such that multiple
			// copies of the feature are visible, the popup appears
			// over the copy being pointed to.
			while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
				coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
			}

			//POPUP CONTENTS
			new mapboxgl.Popup()
				.setLngLat(coordinates)

				.setHTML(

					///////
					//TITLE
					///////
					"<b><h2>Taxlot: C7</h2></b>" +

					//PROPERTY TYPE
					"<b>House</b>" +
					"<hr>" +

					//FROM
					//example: June 3, 1643
					"<b> FROM: </b>" +
					e.features[0].properties.DATE1 +

					//TO
					//example: January 19, 1659
					"<br>" +
					"<b> TO: </b>" +
					e.features[0].properties.DATE2 +

					//UNKNOWN (DISPLAY TITLE AND EXPLANATION WHERE UNKNOWN OR NOTHING, %nbsp)
					//example 1: <br><br><b>TAXLOT EVENTS UNKNOWN</b><br>Needs research beyond sources used.
					//example 2: &nbsp;
					e.features[0].properties.Unknown +

					//LINE
					"<hr>" +

					//NEXT
					//example 1: <b>OWNERSHIP:</b><br>
					//example 2: <b>NEXT KNOWN OWNERSHIP:</b><br>
					e.features[0].properties.Next +

					//OWNER 1
					'<a href=http://thenittygritty.org' + e.features[0].properties.TO_PAR1 + ": " +
					"<br>" +
					'<a href=http://thenittygritty.org' + e.features[0].properties.TO_1 +
					" (" + '<a href=http://thenittygritty.org' + e.features[0].properties.TO_ENT1 + ")" +
					"<br>" +
					"<br>" +

					//OWNER 2
					'<a href=http://thenittygritty.org' + e.features[0].properties.TO_PAR2 + ": " +
					"<br>" +
					'<a href=http://thenittygritty.org' + e.features[0].properties.TO_2 +
					" (" + '<a href=http://thenittygritty.org' + e.features[0].properties.TO_ENT2 + ")" +

					"<br>" +
					"<br>" +

					//TAXLOT EVENT TITLE
					//example 1: <b>TAXLOT EVENT:</b>
					//example 2: <b>NEXT TAXLOT EVENT:</b>
					e.features[0].properties.Tax_Event +

					"<br>" +


					//TAXLOT EVENT TYPE
					//example: /nahc/encyclopedia/node/1528 hreflang="en" target="_blank">Land Grant or Patent</a>
					'<a href=http://thenittygritty.org' + e.features[0].properties.EVENT1 +
					"<hr>" +

					//FROM TITLE
					//example 1: <b>FROM:</b>
					//example 2: <b>PREVIOUS KNOWN FROM:</b>
					e.features[0].properties.Previous +
					"<br>" +

					//FROM 1

					//TAXLOT EVENT PARTY ROLE 1
					'<a href=http://thenittygritty.org' + e.features[0].properties.FROM_PAR1 + ": " +
					"<br>" +
					//FROM PARTY 1 (ANCESTOR)
					'<a href=http://thenittygritty.org' + e.features[0].properties.FROM_1 +
					//TAXLOT ENTITY DESCRIPTIONS 2
					" (" + '<a href=http://thenittygritty.org' + e.features[0].properties.FROM_ENT1 + ")" +
					"<br>" +
					"<br>" +

					//FROM 2

					//TAXLOT EVENT PARTY ROLE 1
					'<a href=http://thenittygritty.org' + e.features[0].properties.FROM_PAR2 + ": " +
					"<br>" +
					//FROM PARTY 2 (ANCESTOR)
					'<a href=http://thenittygritty.org' + e.features[0].properties.FROM_2 +
					//TAXLOT ENTITY DESCRIPTIONS 2
					" (" + '<a href=http://thenittygritty.org' + e.features[0].properties.FROM_ENT2 + ")" +

					//PREVIOUS TAXLOT EVENT (SHOWS UP IF TAXLOT EVENTS UNKNOWN, OTHERWISE BLANK, &nbsp;)

					//TITLE: "PREVIOUS TAXLOT EVENT"
					//example 1: <br><br><b>PREVIOUS TAXLOT EVENT:</b><br>
					//example 2: &nbsp;
					e.features[0].properties.Event +

					//PREVIOUS TAXLOT EVENT
					//example 1: /nahc/encyclopedia/node/1528 hreflang="en" target="_blank">Land Grant or Patent</a>
					//example 2: &nbsp;
					'<a href=http://thenittygritty.org' + e.features[0].properties.Prev_Event +

					//LINK TO ALL TAXLOT EVENTS: "SEE ALL TAXLOT EVENTS"
					"<br>" +
					"<hr>" +
					"<b> <h3><a href=http://thenittygritty.org/nahc/encyclopedia/taxlot-events>SEE ALL TAXLOT EVENTS</a></h3></b>"

				)
				.addTo(map);
		});

		// CHANGE TO CURSOR WHEN HOVERING
		map.on('mouseenter', 'c7_dates-ajsksu', function () {
			map.getCanvas().style.cursor = 'pointer';
		});

		// CHANGE TO POINTER WHEN NOT HOVERING
		map.on('mouseleave', 'c7_dates-ajsksu', function () {
			map.getCanvas().style.cursor = '';
		});
	});
}