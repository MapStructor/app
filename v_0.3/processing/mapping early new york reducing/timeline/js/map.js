function handleLayerClick(popupId, flag, buildPopupInfo) {
  return function (e) {
    if (layerViewFlag()) {
      if (currentViewId === e.features[0].id) {
        togglePopup(flag, popupId);
      } else {
        buildPopupInfo(e.features[0].properties);
        togglePopup(flag, popupId);
      }
      currentViewId = e.features[0].id;
    } else {
      buildPopupInfo(e.features[0].properties);
      togglePopup(flag, popupId);
      toggleLayerPanel();
      currentViewId = null;
    }
    resetClickFlags();
  };
}

function handleClickEvent(popupId, flag, buildPopupInfo) {
  return function (e) {
    if (layerViewFlag()) {
      if (currentViewId === e.features[0].id) {
        togglePopup(flag, popupId);
      } else {
        buildPopupInfo(e.features[0].properties);
        togglePopup(flag, popupId);
      }
      currentViewId = e.features[0].id;
    } else {
      buildPopupInfo(e.features[0].properties);
      togglePopup(flag, popupId);
      toggleLayerPanel();
      currentViewId = null;
    }
    resetClickFlags();
  };
}

function handleMapClick() {
  if (!anyLayerClickEvent()) {
    if (windoWidth > 555) toggleLayerPanel();
  }
  resetClickFlags();
}

function resetClickFlags() {
  demoTaxlotClickEv = false;
  castelloClickEv = false;
  grantLotsClickEv = false;
  dutchGrantClickEv = false;
}

function layerViewFlag() {
  return layerViewFlag;
}

function anyLayerClickEvent() {
  return demoTaxlotClickEv || castelloClickEv || grantLotsClickEv || dutchGrantClickEv;
}

function togglePopup(flag, popupId) {
  if (flag) {
    $(`#${popupId}`).slideUp();
    flag = false;
  } else {
    $(`#${popupId}`).slideDown();
    flag = true;
  }
}

function toggleLayerPanel() {
  $("#view-hide-layer-panel").trigger("click");
}
