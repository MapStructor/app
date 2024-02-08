// #region Popups Initialization
// Initialize popups for displaying information on the maps without close buttons.

var afterHighDemoPopUp = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
}),
beforeHighDemoPopUp = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
});

// #endregion


// #region Popup Content Variables
// Initialize variables to hold HTML content for various popups. These variables will likely be updated dynamically based on user interactions or data queries.

var places_popup_html = "";

// #endregion




