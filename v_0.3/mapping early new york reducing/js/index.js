//#region Variable Declarations
// Arrays to store various types of information

var dutch_grant_lots_info = [],
  farms_grants_info = [],
  settlements_info = [],
  infos_entity = [],
  settlements_linked_location = [],
  brooklyn_grants_info = [],
  taxlot_events_info = [],
  taxlot_event_entities_info = [];
var dutch_grant_lots_info_length = 0,
  farms_grants_info_length = 0,
  settlements_info_length = 0,
  infos_entity_length = 0,
  brooklyn_grants_length = 0,
  taxlot_events_info_length = 0,
  taxlot_entities_info_length = 0;

//#endregion

//#region Layout Visibility Function
// Sets the visibility of a map layer for both the before and after maps

function setLayoutVisibilityForBothMaps(id, status){
  beforeMap.setLayoutProperty(id, "visibility", status)
  afterMap.setLayoutProperty(id, "visibility", status)
}

//#endregion


//#region Additional Variable Declarations
// More variables for storing information and flags

var lots_info = new Array();
var lots_info_length = 0;
getLotsInfo();
getSettlementsInfo();
getInfosEntity();
getTaxlotEventsInfo();
getTaxlotEventEntitiesDescrInfo();

var modal_header_text = [];
var modal_content_html = [];
getInfoText(modal_header_text, modal_content_html);

var layer_view_flag = true;
var timeline_pointer_flag = true;
var windoWidth = 0;

var sliderStart = moment("01/01/1626").unix();
var sliderStartDrag = sliderStart;
var sliderEnd = moment("01/01/1700").unix();
var sliderEndDrag = sliderEnd;
var sliderMiddle = (sliderStart + sliderEnd) / 2;
var tooltiPos = -100;

var ruler_step = (sliderEnd - sliderStart) / 10,
  date_ruler1 = sliderStart + ruler_step,
  date_ruler2 = sliderStart + ruler_step * 3,
  date_ruler4 = sliderStart + ruler_step * 7,
  date_ruler5 = sliderStart + ruler_step * 9;

//#endregion



//#region Document Ready Function
// Initializes various UI elements and event handlers when the document is ready
$(document).ready(function () {

  //#region Browser Compatibility Check
  // Checks if the browser is Internet Explorer and displays a warning message if it is
  if (jQuery.browser.msie)
    alert(
      "Sorry, this application uses state of the art HTML5 techniques which are not (well) supported by Internet Explorer.\nUse Google Chrome or Mozilla Firefox to experience the full power of HTML5 and this application"
    );
  //#endregion

  //#region Tooltip Initialization
  // Initializes tooltips for layer info and zoom icons
  simple_tooltip("i.layer-info, i.zoom-to-layer", "tooltip");
  //#endregion

  //#region Window Size Adjustment
  // Adjusts the layout based on the window size
  windoWidth = $(window).width();
  if (windoWidth <= 637) {
    if (layer_view_flag) {
      $("#studioMenu").css({ "margin-left": "-111%" });
      $("#view-hide-layer-panel").css({ "margin-left": "-337px" });
      $("#mobi-hide-sidebar").css({ "margin-left": "-111%" });
      layer_view_flag = false;
      $("#dir-txt").html("&#9205;");
    }
  }

  $(window).resize(function () {
    windoWidth = $(window).width();
  });

  //#endregion

  //#region Layer Visibility Toggles
  // Toggles the visibility of various map layers
  $(".dutch_grants_layer_item").hide();
  $(".current_lots_layer_item").hide();
  $("#long-island-section-layers").slideUp();
  $("#info-section-layers").slideUp();
  $("#manahatta-maps-section").slideUp();
  $("#long-island-maps-section").slideUp();
  $("#long-island-maps-section1").slideUp();
    //#endregion

  //#region Date Display Initialization
  // Sets the text for date-related UI elements

  $("#ruler-date1").text(moment.unix(date_ruler1).format("YYYY"));
  $("#ruler-date2").text(moment.unix(date_ruler2).format("YYYY"));
  $("#ruler-date3").html(
    "&nbsp; &#8678; &nbsp; TIME &nbsp; &nbsp; &nbsp; &nbsp; SLIDE &nbsp; &#8680;"
  );
  $("#mobi-year").html(
    "&nbsp; &#8678; &nbsp; TIME &nbsp; &nbsp; &nbsp; &nbsp; SLIDE &nbsp; &#8680;"
  );
  $("#ruler-date4").text(moment.unix(date_ruler4).format("YYYY"));
  $("#ruler-date5").text(moment.unix(date_ruler5).format("YYYY"));

//#endregion

  //#region Slider Initialization
  // Initializes the time slider and its event handlers

  $("#slider").slider({
    min: sliderStart,
    max: sliderEnd,
    step: 86400,
    value: sliderMiddle,
    slide: function (event, ui) {
      tooltiPos = ui.value < sliderMiddle ? 30 : -100;

      if (timeline_pointer_flag) {
        $("#ruler-date3").text(moment.unix(sliderMiddle).format("YYYY"));
        $("#mobi-year").css("display", "none");
        $("#ruler-date1").css("display", "block");
        $("#ruler-date2").css("display", "block");
        $("#ruler-date3").css("display", "block");
        $("#ruler-date4").css("display", "block");
        $("#ruler-date5").css("display", "block");
        timeline_pointer_flag = false;
      }

      if (demo_layer_view_flag) {
        if (ui.value <= sliderStartDrag) {
          $(this).slider("value", sliderStartDrag);
          changeDate(sliderStartDrag);
          $("#date").text(moment.unix(sliderStartDrag).format("DD MMM YYYY"));
          return false;
        }
        if (ui.value >= sliderEndDrag) {
          $(this).slider("value", sliderEndDrag);
          changeDate(sliderEndDrag);
          $("#date").text(moment.unix(sliderEndDrag).format("DD MMM YYYY"));
          return false;
        }
        if (ui.value <= sliderEndDrag && ui.value >= sliderStartDrag) {
          changeDate(ui.value);
          $("#date").text(moment.unix(ui.value).format("DD MMM YYYY"));
        }
      } else {
        changeDate(ui.value);
        $("#date").text(moment.unix(ui.value).format("DD MMM YYYY"));
      }
    },
    create: function (event, ui) {
      var tooltip = $('<div class="ui-slider-tooltip" />')
        .css({
          position: "absolute",
          top: 32,
          left: tooltiPos,
          color: "red",
          width: "100px",
          size: "1",
        })
        .text(moment.unix(sliderMiddle).format("MM/DD/YYYY"));
    },
    change: function (event, ui) {},
  });
  $("#date").text(
    moment.unix($("#slider").slider("values", 0)).format("DD MMM YYYY")
  );

    //#endregion

  //#region Layer Checkbox Handlers
  // Event handlers for checkboxes that control layer visibility
  $("#castello_points").click(function () {
    if ($(this).prop("checked")) {
      setLayoutVisibilityForBothMaps("places", "visible")
    } else {
      setLayoutVisibilityForBothMaps("places", "none")
      if (castello_layer_view_flag) {
        closeCastelloInfo();
      }
    }
  });

  $("#grants_layer_items").change(function () {
    $(".grants_layer").prop("checked", this.checked);
    if ($(this).prop("checked")) {
      if (lots_info_length == 0) {
        getLotsInfo();
      }
      [
        "dutch_grants-5ehfqe",
        "dutch_grants-5ehfqe-highlighted",
        "grant-lots-lines",
      ].forEach((id) => {
        setLayoutVisibilityForBothMaps(id, "visible")
      });
    } else {
      [
        "dutch_grants-5ehfqe",
        "dutch_grants-5ehfqe-highlighted",
        "grant-lots-lines",
      ].forEach((id) => {
        setLayoutVisibilityForBothMaps(id, "none")
      });

      if (dgrants_layer_view_flag) {
        closeDutchGrantsInfo();
      }
    }
  });

  $(".grants_layer").change(function () {
    if ($(".grants_layer:checked").length == $(".grants_layer").length) {
      $("#grants_layer_items").prop("checked", "checked");
    } else {
      $("#grants_layer_items").prop("checked", false);
    }
  });

  $("#grants_layer").click(function () {
    if ($(this).prop("checked")) {
      if (lots_info_length == 0) {
        getLotsInfo();
      }
      ["dutch_grants-5ehfqe", "dutch_grants-5ehfqe-highlighted"].forEach(
        (id) => {
          setLayoutVisibilityForBothMaps(id, "visible")
        }
      );
    } else {
      ["dutch_grants-5ehfqe", "dutch_grants-5ehfqe-highlighted"].forEach(
        (id) => {
          setLayoutVisibilityForBothMaps(id, "none")
        }
      );
      if (dgrants_layer_view_flag) {
        closeDutchGrantsInfo();
      }
    }
  });

  $("#grants_layer_lines").click(function () {
    if ($(this).prop("checked")) {
      setLayoutVisibilityForBothMaps("grant-lots-lines", "visible")
    } else {
      setLayoutVisibilityForBothMaps("grant-lots-lines", "none")
    }
  });

  // Long Island Native Groups Layer Start
  $("#native_groups_layer_items").change(function () {
    $(".native_groups_layer").prop("checked", this.checked);
    if ($(this).prop("checked")) {
      [
        "native-groups-area",
        "native-groups-area-highlighted",
        "native-groups-lines",
        "native-groups-labels",
      ].forEach((id) => {
        setLayoutVisibilityForBothMaps(id, "visible")
      });
    } else {
      [
        "native-groups-area",
        "native-groups-area-highlighted",
        "native-groups-lines",
        "native-groups-labels",
      ].forEach((id) => {
        setLayoutVisibilityForBothMaps(id, "none")
      });
      if (native_group_layer_view_flag) {
        closeNativeGroupsInfo();
      }
    }
  });

  $(".native_groups_layer").change(function () {
    if (
      $(".native_groups_layer:checked").length ==
      $(".native_groups_layer").length
    ) {
      $("#native_groups_layer_items").prop("checked", "checked");
    } else {
      $("#native_groups_layer_items").prop("checked", false);
    }
  });

  $("#native_groups_area").click(function () {
    if ($(this).prop("checked")) {
      ["native-groups-area", "native-groups-area-highlighted"].forEach((id) => {
        setLayoutVisibilityForBothMaps(id, "visible")
      });
    } else {
      ["native-groups-area", "native-groups-area-highlighted"].forEach((id) => {
        setLayoutVisibilityForBothMaps(id, "none")
      });

      if (native_group_layer_view_flag) {
        closeNativeGroupsInfo();
      }
    }
  });

  $("#native_groups_labels").click(function () {
    if ($(this).prop("checked")) {
      setLayoutVisibilityForBothMaps("native-groups-labels", "visible");
    } else {
      setLayoutVisibilityForBothMaps("native-groups-labels", "none");
    }
  });

  $("#native_groups_lines").click(function () {
    if ($(this).prop("checked")) {
      setLayoutVisibilityForBothMaps("native-groups-lines", "visible")
    } else {
      setLayoutVisibilityForBothMaps("native-groups-lines", "none")
    }
  });

    //#endregion

  //#region UI Interaction Handlers
  // Event handlers for various UI interactions

  $(".footnote").click(function () {
    $("#footnotediv").toggle("slide");
  });
  
  $("#view-hide-layer-panel").click(function () {
    if (layer_view_flag) {
      $("#studioMenu").animate({ "margin-left": "-337px" }, 500);
      $(this).animate({ "margin-left": "-337px" }, 500);
      $("#mobi-hide-sidebar").animate({ "margin-left": "-337px" }, 500);
      layer_view_flag = false;
      $("#dir-txt").html("&#9205;");
      $("#rightInfoBar").slideUp();
    } else {
      $("#studioMenu").animate({ "margin-left": "0px" }, 500);
      $(this).animate({ "margin-left": "0px" }, 500);
      $("#mobi-hide-sidebar").animate({ "margin-left": "0px" }, 500);
      layer_view_flag = true;
      $("#dir-txt").html("&#9204;");
      if (windoWidth > 637) $("#rightInfoBar").slideDown();
    }
  });

  $("#mobi-view-sidebar").click(function () {
    if (!layer_view_flag) {
      $("#studioMenu").animate({ "margin-left": "0px" }, 500);
      $("#view-hide-layer-panel").animate({ "margin-left": "0px" }, 500);
      $("#mobi-hide-sidebar").animate({ "margin-left": "0px" }, 500);
      layer_view_flag = true;
      $("#dir-txt").html("&#9204;");
    }
  });

  $("#mobi-hide-sidebar").click(function () {
    if (layer_view_flag) {
      $("#studioMenu").animate({ "margin-left": "-111%" }, 500);
      $("#view-hide-layer-panel").animate({ "margin-left": "-337px" }, 500);
      $(this).animate({ "margin-left": "-111%" }, 500);
      layer_view_flag = false;
      $("#dir-txt").html("&#9205;");
    }
  });

  /* change timeline CSS property on mouseover & mouseout */
  $("div.timeline")
    .mouseover(function () {
      $("div.ui-widget-content").css("background-color", "#baddf9");
      $("a.ui-slider-handle").css("background", "red");
    })
    .mouseout(function () {
      $("div.ui-widget-content").css("background-color", "#d1ecff");
      $("a.ui-slider-handle").css("background", "");
    });

  $(".trigger-popup").click(function (e) {
    var popup_id =
      e.target.id == "info" || e.target.id == "about-info"
        ? "about"
        : e.target.id;
    if (modal_header_text[popup_id].length > 0) {
      $("div.modal-header h1").text(modal_header_text[e.target.id]);
      $("div.modal-content").html(modal_content_html[e.target.id]);
      $("label#open-popup").trigger("click");
    }
  });

  // close modal by click outside the box

  $("#circle_point").click(function () {
    if ($(this).prop("checked")) {
      if (taxlot_events_info_length == 0) {
        getTaxlotEventsInfo();
      }
      [0, 1].forEach((index) => {
        const position = index === 0 ? "left" : "right";
        if (index === 0)
          beforeMap.setLayoutProperty(
            `lot_events-bf43eb-${position}`,
            "visibility",
            "visible"
          );
        else
          afterMap.setLayoutProperty(
            `lot_events-bf43eb-${position}`,
            "visibility",
            "visible"
          );
      });
    } else {
      [0, 1].forEach((index) => {
        const position = index === 0 ? "left" : "right";
        if (index === 0)
          beforeMap.setLayoutProperty(
            `lot_events-bf43eb-${position}`,
            "visibility",
            "none"
          );
        else
          afterMap.setLayoutProperty(
            `lot_events-bf43eb-${position}`,
            "visibility",
            "none"
          );
      });
      if (demo_layer_view_flag) {
        closeDemoInfo();
      }
    }
  });

  $("div.modal-body").click(function (e) {
    e.stopPropagation();
  });

  $("div.modal").click(function () {
    $("label#close").trigger("click");
  });

  //#endregion

  //#region Loading Screen Timeout
  // Hides the loading screen after a timeout

  setTimeout(function () {
    $("div#loading").css("display", "none");
  }, 5000);

  //#endregion

});
