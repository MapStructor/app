function generateMapHTML(map) {
    return `
      <div class="layer-list-row">
        <input class="${map.id}" type="radio" name="ltoggle" value="${map.id}" />
        <input class="${map.id}" type="radio" name="rtoggle" value="${map.id}" ${map.checked ? 'checked="checked"' : ''}/>
        &nbsp;
        <label for="${map.id}">${map.name}<div class="dummy-label-layer-space"></div></label>
        <div class="layer-buttons-block">
          <div class="layer-buttons-list">
            <i class="fa fa-crosshairs zoom-to-layer" onclick="${map.zoomFunction}" title="Zoom to Layer"></i>
            <i class="fa fa-info-circle layer-info trigger-popup" id="${map.infoId}" title="Layer Info"></i>
          </div>
        </div>
      </div>
    `;
  }
  

const mapsHTML = castelloMaps.map(generateMapHTML).join('');

// Add the generated HTML to the #new-england-maps-section
document.getElementById('new-england-maps-section').innerHTML = newEnglandMapsData.map(generateMapHTML).join('');

// Add the generated HTML to the #manahatta-maps-section
document.getElementById('manahatta-maps-section').innerHTML  = manahattaMapsData.map(generateMapHTML).join('');
document.getElementById('long-island-maps-section').innerHTML = longIslandMapsData.map(generateMapHTML).join('');

// Add the generated HTML to the #castello-maps-section
document.getElementById('castello-maps-section').innerHTML = castelloMaps.map(generateMapHTML).join('');

document.getElementById('new-netherland-maps-section').innerHTML = newNetherlandMapsData.map(generateMapHTML).join('');