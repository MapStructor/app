function addAllLayers(yr, date) {
  ["", ""].forEach((position,index) => {
    const map = index === 0 ? beforeMap : afterMap;
    const popupMap = index === 0 ? "beforeMap" : "afterMap";

    //#region - Lot events and dutch grants
    removeMapSourceLayer(map, [
      { type: "layer", id: `lot_events-bf43eb${index !== 1 ? "-left" : "-right"}` },
      { type: "source", id: "lot_events-bf43eb" },
      { type: "layer", id: `dutch_grants-5ehfqe` },
      { type: "source", id: "dutch_grants-5ehfqe" },
      { type: "layer", id: `grant-lots-lines` },
      { type: "source", id: "dutch_grants_lines-0y4gkx" },
    ]);
    addMapLayers(
      map,
      [
        { id: `dutch_grants-5ehfqe-highlighted` },
        { id: `dutch_grants-5ehfqe` },
        { id: `lot_events-bf43eb${index !== 1 ? "-left" : "-right"}` },
        { id: `grant-lots-lines` },
        { id: `grant-lots` },
      ],
      date
    );
    setupLayerEvents(map, [
      {
        id: `dutch_grants-5ehfqe`,
        popup: `${popupMap}DutchGrantPopUp`,
        sourceId: "dutch_grants-5ehfqe",
      },
      {
        id: `lot_events-bf43eb${index !== 1 ? "-left" : "-right"}`,
        popup: `${popupMap}PopUp`,
        sourceId: "lot_events-bf43eb",
      },
    ]);
    // #endregion

    // #region - Castello Tax Lots
    addMapLayer(map, getLayer(`places`));

    setupLayerEvents(map, [
      {
        id: `places`,
        popup: `${popupMap}PlacesPopUp`,
        sourceId: "taxlots-cpwvol",
      },
    ]);
    //#endregion

    // #region - Long Island Tribes
    addMapLayer(map, getLayer(`native-groups-lines`));
    addMapLayer(map, getLayer(`native-groups-area`));
    addMapLayer(
      map,
      getLayer(`native-groups-area-highlighted`)
    );
    addMapLayer(map, getLayer(`native-groups-labels`));

    setupLayerEvents(map, [
      {
        id: `native-groups-area`,
        popup: `${popupMap}NativeGroupsPopUp`,
        sourceId: "indian_areas_long_island-50h2dj",
      },
    ]);
    //#endregion
  });
}
