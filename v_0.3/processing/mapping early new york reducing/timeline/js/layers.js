function addAllLayers(yr, date) {
  ["-left", ""].forEach((position,index) => {
    const map = position === "-left" ? beforeMap : afterMap;
    const popupMap = position === "-left" ? "beforeMap" : "afterMap";
    const retrieveLayer = position === "-left" ? getBeforeLayer : getLayer;

    //#region - Lot events and dutch grants
    removeTaxPoints(map, [
      { type: "layer", id: `lot_events-bf43eb${index !== 1 ? position : "-right"}` },
      { type: "source", id: "lot_events-bf43eb" },
      { type: "layer", id: `dutch_grants-5ehfqe${position}` },
      { type: "source", id: "dutch_grants-5ehfqe" },
      { type: "layer", id: `grant-lots-lines${position}` },
      { type: "source", id: "dutch_grants_lines-0y4gkx" },
    ]);
    addMapLayers(
      map,
      [
        { id: `dutch_grants-5ehfqe${position}-highlighted` },
        { id: `dutch_grants-5ehfqe${position}` },
        { id: `lot_events-bf43eb${index !== 1 ? position : "-right"}` },
        { id: `grant-lots-lines${position}` },
        { id: `grant-lots${position}` },
      ],
      date
    );
    setupLayerEvents(map, [
      {
        id: `dutch_grants-5ehfqe${position}`,
        popup: `${popupMap}DutchGrantPopUp`,
        sourceId: "dutch_grants-5ehfqe",
      },
      {
        id: `lot_events-bf43eb${index !== 1 ? position : "-right"}`,
        popup: `${popupMap}PopUp`,
        sourceId: "lot_events-bf43eb",
      },
    ]);
    // #endregion

    // #region - Castello Tax Lots
    addMapLayer(map, retrieveLayer(`places${position}`));

    setupLayerEvents(map, [
      {
        id: `places${position}`,
        popup: `${popupMap}PlacesPopUp`,
        sourceId: "taxlots-cpwvol",
      },
    ]);
    //#endregion

    // #region - Long Island Tribes
    addMapLayer(map, retrieveLayer(`native-groups-lines${position}`));
    addMapLayer(map, retrieveLayer(`native-groups-area${position}`));
    addMapLayer(
      map,
      retrieveLayer(`native-groups-area${position}-highlighted`)
    );
    addMapLayer(map, retrieveLayer(`native-groups-labels${position}`));

    setupLayerEvents(map, [
      {
        id: `native-groups-area${position}`,
        popup: `${popupMap}NativeGroupsPopUp`,
        sourceId: "indian_areas_long_island-50h2dj",
      },
    ]);
    //#endregion
  });
}
