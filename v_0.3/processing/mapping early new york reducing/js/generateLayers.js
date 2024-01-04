/**
 * @param {{
 *  id: string;
 * name?: string;
 * caretId?: string;
 * label: string;
 * iconColor?: string;
 * itemSelector?: string;
 * zoomTo?: string;
 * infoId: string;
 * type?: "group" | "lots-events" | "grants-lots" | "castello-points" | "current-buildings";
 * iconType?: "square"
 * }[]} layers
 * @returns {string}
 */
function renderManhattanLayers(layers) {
  const lastBitOfManhattanSectionTemplate = `
<div class="layer-list-row">
  <input
    type="checkbox"
    id="current_buildings_items"
    name="current_buildings_items"
  />
  <label for="current_buildings_items">
    <i class="fas fa-caret-down"></i> Current Buildings
    <div class="dummy-label-layer-space"></div
  ></label>
</div>

<div class="layer-list-row">
  <input
    type="checkbox"
    class="current_buildings"
    id="current_buildings"
    name="current_buildings"
  />
  <label for="current_buildings">
    <i class="fa fa-square" style="color: #ff7f50"></i> Current
    Buildings</label
  >
</div>
`; 
  let r = "";
  layers.forEach((layer) => {
    if (layer.type === "group") {
      r += renderLayerRow(layer);
    } else if (layer.type === "lots-events") {
      r += renderCirclePointLayerRow(layer);
    } else if (layer.type === "grants-lots") {
      r += renderGrantLotsLayerRow(layer);
    } else if (layer.type === "castello-points") {
      r += renderCastelloPointsLayerRow(layer);
    } else if (layer.type === "current-buildings"){
      r += lastBitOfManhattanSectionTemplate;
      r += `<div class="layer-list-row">
      <input
        type="checkbox"
        class="current_buildings"
        id="current_buildings_lines"
        name="current_buildings_lines"
      />
      <label for="current_buildings_lines">
        <i class="far fa-square" style="color: #0000ff"></i> Current
        Buildings
        <div class="dummy-label-layer-space"></div
      ></label>
      <div class="layer-buttons-block">
        <div class="layer-buttons-list">
          <i
            class="fa fa-crosshairs zoom-to-layer"
            onclick="zoomtocenter('NA')"
            title="Zoom to Layer"
          ></i>
          <i
            class="fa fa-info-circle layer-info trigger-popup"
            id="current-buildings-lines-info-layer"
            title="Layer Info"
          ></i>
        </div>
      </div>
    </div>`
    } else {
      r += renderManahattaLayerItem(layer);
    }
  });
  return r;
}

/**
 * @param {{
*  id: string;
* name?: string;
* caretId?: string;
* label: string;
* iconColor?: string;
* itemSelector?: string;
* zoomTo?: string;
* infoId: string;
* type?: "group" | "lots-events" | "grants-lots" | "castello-points" | "current-buildings" | "custom_indian_paths";
* iconType?: "square"
* }[]} layers
* @returns {string}
*/
function renderLongIslandLayers(layers){
  let r = ''
  const customIndianTemplate = `<div class="layer-list-row">
  <input type="checkbox" id="indian_paths" name="indian_paths" />
  <label for="indian_paths">
    <i class="fas fa-slash slash-icon" style="color: #ff0000"></i>
    1600-64 | Paths
    <div class="dummy-label-layer-space"></div
  ></label>
  <div class="layer-buttons-block">
    <div class="layer-buttons-list">
      <i
        class="fa fa-crosshairs zoom-to-layer"
        onclick="zoomtobounds('Brooklyn')"
        title="Zoom to Layer"
      ></i>
      <i
        class="fa fa-info-circle layer-info trigger-popup"
        id="indian-paths-info-layer"
        title="Layer Info"
      ></i>
    </div>
  </div>
</div>`
  layers.forEach(layer => {
    if(layer.type === "group"){
      r += renderLayerRow(layer, true);
    } else if(layer.type === "custom_indian_paths"){
      r+= customIndianTemplate;
    } else {
      r+= renderManahattaLayerItem(layer)
    }
  })
  return r;
}


/**
 * 
 * @param {{
*  id: string;
* name?: string;
* caretId?: string;
* label: string;
* iconColor?: string;
* itemSelector?: string;
* zoomTo?: string;
* infoId: string;
* type?: "group" | "lots-events" | "grants-lots" | "castello-points" | "current-buildings";
* iconType?: "square";
* isSolid?: boolean;
* }} layerData 
 * @returns {string}
 */
function renderLayerRow(layerData, isMinus=false) {
  const html = `
      <div class="layer-list-row">
        <input
          type="checkbox"
          class="manahatta_items"
          id="${layerData.id || "manahatta_items"}"
          name="${layerData.name || "manahatta_items"}"
        />
        <i
          class="fas fa-${isMinus? "minus" : "plus"}-square compress-expand-icon"
          id="${layerData.caretId || "manahatta-layer-caret"}"
          onclick="itemsCompressExpand('${layerData.itemSelector || ""}','#${
    layerData.caretId || ""
  }')"
        ></i>
        <label for="${layerData.id || "manahatta_items"}">
          ${layerData.label || ""}
          <div class="dummy-label-layer-space"></div>
        </label>
        <div class="layer-buttons-block">
          <div class="layer-buttons-list">
            <i
              class="fa fa-crosshairs zoom-to-layer"
              onclick="${(layerData.id === "current_lots_items" || layerData.id === "grants_layer_items")? "zoomtocenter('NA')" :(layerData.id === "farms_layer_items"? `zoomtocenter('${layerData.zoomTo}')`:`zoomtobounds('${layerData.zoomTo || ""}')`)}"
              title="Zoom to Layer"
            ></i>
            <i
              class="fa fa-info-circle layer-info trigger-popup"
              id="${layerData.infoId || "manahatta-info"}"
              title="Layer Info"
            ></i>
          </div>
        </div>
      </div>
    `;
  return html;
}
/**
 * 
 * @param {{
 *  id: string;
* name?: string;
* caretId?: string;
* label: string;
* iconColor?: string;
* itemSelector?: string;
* zoomTo?: string;
* infoId: string;
* type?: "group" | "lots-events" | "grants-lots" | "castello-points" | "current-buildings";
* iconType?: "square";
* isSolid?: boolean;
* }} layerData 
 * @returns {string}
 */
function renderManahattaLayerItem(layerData) {
  const html = `
      <div class="layer-list-row ${layerData.topLayerClass}_item">
        &nbsp; &nbsp; &nbsp;
        <input
          type="checkbox"
          class="${layerData.className}"
          id="${layerData.id || "lenape_trails"}"
          name="${layerData.name || "lenape_trails"}"
        />
        <label for="${layerData.id || "lenape_trails"}">
          <i class="${layerData.isSolid? "fas" : "far"} fa-${layerData.iconType || "slash"} ${["square", "circle", "comment-dots"].includes(layerData.iconType)? "" : "slash-icon"}" style="color: ${
            layerData.iconColor || "#ff0000"
          }"></i>
          ${layerData.label || "Lenape Trails"}
        </label>
      </div>
    `;

  return html;
}

/**
 * 
 * @param {{
*  id: string;
* name?: string;
* caretId?: string;
* label: string;
* iconColor?: string;
* itemSelector?: string;
* zoomTo?: string;
* infoId: string;
* type?: "group" | "lots-events" | "grants-lots" | "castello-points" | "current-buildings";
* iconType?: "square"
* }} layerData 
 * @returns {string}
 */
function renderCirclePointLayerRow(layerData) {
  const html = `
      <div class="layer-list-row">
        <input
          type="checkbox"
          id="${layerData.id || "circle_point"}"
          name="${layerData.name || "circle_point"}"
          ${layerData.checked ? 'checked="checked"' : ""}
        />
  
        <label for="${layerData.id || "circle_point"}">
          <i class="fa fa-play-circle" style="color: ${
            layerData.iconColor || "#097911"
          }"></i>${layerData.label || "1643-75 | Lot Events"}
          <div class="dummy-label-layer-space"></div>
        </label>
        <div class="layer-buttons-block">
          <div class="layer-buttons-list">
            <i
              class="fa fa-crosshairs zoom-to-layer"
              onclick="zoomtocenter('${layerData.zoomTo || "NA"}')"
              title="Zoom to Layer"
            ></i>
            <i
              class="fa fa-info-circle layer-info trigger-popup"
              id="${layerData.infoId || "demo-taxlot-info-layer"}"
              title="Layer Info"
            ></i>
          </div>
        </div>
      </div>
    `;

  return html;
}

/**
 * 
 * @param {{
*  id: string;
* name?: string;
* caretId?: string;
* label: string;
* iconColor?: string;
* itemSelector?: string;
* zoomTo?: string;
* infoId: string;
* type?: "group" | "lots-events" | "grants-lots" | "castello-points" | "current-buildings";
* iconType?: "square"
* }} layerData 
 * @returns {string}
 */
function renderGrantLotsLayerRow(layerData) {
  const html = `
      <div class="layer-list-row">
        <input
          type="checkbox"
          id="${layerData.id || "grant_lots"}"
          name="${layerData.name || "grant_lots"}"
        />
        <label for="${layerData.id || "grant_lots"}">
          <i class="fa fa-square" style="color: ${
            layerData.iconColor || "#008888"
          }"></i>${layerData.label || "1643-67 | Demo Grant Divisions: C7"}
          <div class="dummy-label-layer-space"></div>
        </label>
        <div class="layer-buttons-block">
          <div class="layer-buttons-list">
            <i
              class="fa fa-crosshairs zoom-to-layer"
              onclick="zoomtocenter('${layerData.zoomTo || "NA"}')"
              title="Zoom to Layer"
            ></i>
            <i
              class="fa fa-info-circle layer-info trigger-popup"
              id="${layerData.infoId || "demo-grant-info-layer"}"
              title="Layer Info"
            ></i>
          </div>
        </div>
      </div>
    `;

  return html;
}

/**
 * 
 * @param {{
*  id: string;
* name?: string;
* caretId?: string;
* label: string;
* iconColor?: string;
* itemSelector?: string;
* zoomTo?: string;
* infoId: string;
* type?: "group" | "lots-events" | "grants-lots" | "castello-points" | "current-buildings";
* iconType?: "square"
* }} layerData 
 * @returns {string}
 */
function renderCastelloPointsLayerRow(layerData) {
  const html = `
      <div class="layer-list-row">
        <input
          type="checkbox"
          id="${layerData.id || "castello_points"}"
          name="${layerData.name || "castello_points"}"
        />
        <label for="${layerData.id || "castello_points"}">
          <i class="fa fa-circle" style="color: ${
            layerData.iconColor || "#ff0000"
          }"></i>${layerData.label || "1660 | Castello Taxlots"}
          <div class="dummy-label-layer-space"></div>
        </label>
        <div class="layer-buttons-block">
          <div class="layer-buttons-list">
            <i
              class="fa fa-crosshairs zoom-to-layer"
              onclick="zoomtocenter('${layerData.zoomTo || "NA"}')"
              title="Zoom to Layer"
            ></i>
            <i
              class="fa fa-info-circle layer-info trigger-popup"
              id="${layerData.infoId || "castello-info-layer"}"
              title="Layer Info"
            ></i>
          </div>
        </div>
      </div>
    `;

  return html;
}



try{
$("#long-island-section-layers").html(renderLongIslandLayers(longIslandLayerSections))
$("#manahatta-section-layers").html(
  renderManhattanLayers(manhattanLayerSections)
);
}catch(error){
  console.log(error)
}
console.log("generateLayer script ran successfully :)");
