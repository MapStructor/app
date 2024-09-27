'use client'
import Image from "next/image";
import SectionLayersComponent from "./components/layers/section-layer-group.component";
import moment from 'moment';
import { useState } from "react";
import SliderWithDatePanel from "./components/slider/slider-with-date-panel.component";
import { SectionLayer, SectionLayerGroup, SectionLayerItem } from "./models/layers/layer.model";
import { IconColors } from "./models/colors.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import SectionLayerComponent from "./components/layers/section-layer.component";
import { FontAwesomeLayerIcons } from "./models/font-awesome.model";
import MapComparisonComponent from "./components/map/map-compare-container.component";

// Remove this when we have a way to get layers correctly

const manhattaLayerSections: SectionLayerItem[] = [
  {
    id: 0,
    iconColor: IconColors.YELLOW,
    label: "Information",
    iconType: FontAwesomeLayerIcons.SQUARE,
    isSolid: true,
  },
  {
    id: 1,
    iconColor: IconColors.RED,
    label: "Lines",
    iconType: FontAwesomeLayerIcons.SQUARE,
    isSolid: false,
  },
  {
    id: 2,
    label: "1643-75 | Lot Events",
    iconColor: IconColors.GREEN,
    iconType: FontAwesomeLayerIcons.SQUARE,
    isSolid: true
  },
  {
    id: 3,
    iconType: FontAwesomeLayerIcons.SQUARE,
    isSolid: true,
    label: "1660 | Castello Taxlots",
    iconColor: IconColors.RED,
  },
];

const manhattaSectionGroups: SectionLayerGroup[] = [
  {
    id: 0,
    label: "1609 | Manhatta",
    iconColor: IconColors.YELLOW,
    iconType: FontAwesomeLayerIcons.PLUS_SQUARE,
    isSolid: true,
    items: manhattaLayerSections
  }
]

const manhattaLayer: SectionLayer = {
  id: 0,
  label: "MANHATTAN",
  groups: manhattaSectionGroups
}

export default function Home() {
  const [currDate, setCurrDate] = useState<moment.Moment | null>(null)

  return (
    <>
      <input className="checker" type="checkbox" id="o" hidden />
      <div className="modal">
        <div className="modal-body">
          <div className="modal-header">
            <h1>ABOUT</h1>
            <label htmlFor="o" id="close" title="Close">&times;</label>
          </div>
          <div className="modal-content">
            New York City was founded by the Dutch in 1624 as
            <i>New Amsterdam</i>, the capital of New Netherland. The New Amsterdam
            History Center is devoted to documenting and mapping New Amsterdam,
            its diverse people, landscapes, institutions and global legacy today.
            <p>
              We’ve presented several versions of the <i>Castello Plan</i> and the
              <i>Dutch Grants Map</i> here. You can see the settlement of houses,
              farms, taverns and workshops, surrounded by walls. Over the three
              centuries that followed, the area became the Financial District. The
              east wall was torn down and named Wall Street. The canals were paved
              over and turned into streets and in between developed skysrapers,
              and the island was expanded with infill. Above ground, almost
              nothing remains of New Amsterdam except the original street pattern.
              Underground, archeologists have found evidence of the plots of
              houses and gardens, Amsterdam yellow brick, and pollen samples of
              plants.
            </p>
            You can swipe the map to compare the Castello Plan in 1660 to the
            present, and explore each lot, where it shows what was there and who
            lived there. Our next steps are to expand through the full history of
            New Amsterdam with a timeline from 1624 to 1664, when it was taken
            over by the English.
            <p>
              We need your help to make this work happen. Donate now to develop
              the map and expand the research.
            </p>
          </div>
        </div>
      </div>

      <div className="header">
        <a href="http://newamsterdamhistorycenter.org" className="logo">
          <img
            id="logo-img-wide"
            src="http://newamsterdamhistorycenter.org/wp-content/uploads/2018/02/cropped-cropped-sprite-1.png"
          />
          <img id="logo-img" src="icons/icon_57x57.png" />
        </a>

        <div id="header_text" className="headerText">
          <span id="headerTextSuffix">|</span> Mapping Early New York
        </div>

        <div className="header-right">
          <a
            className="encyclopedia"
            href="https://newamsterdamhistorycenter.org/full-3d-model/"
            target="_blank"
            >3D Map
            <img
              className="img2"
              height="18"
              src="https://encyclopedia.nahc-mapping.org/sites/default/files/inline-images/external_link_icon.png"
              width="18"
          /></a>
          <a
            className="encyclopedia"
            href="https://encyclopedia.nahc-mapping.org/"
            target="_blank"
            >Encyclopedia
            <img
              className="img2"
              height="18"
              src="https://encyclopedia.nahc-mapping.org/sites/default/files/inline-images/external_link_icon.png"
              width="18"
          /></a>

          <label htmlFor="o" id="open-popup" style={{display: "none"}}>Open PopUp</label>
          <label id="about" className="trigger-popup" title="Open">ABOUT</label>
          <i className="fa fa-2x fa-info-circle trigger-popup" id="info"></i>
        </div>
      </div>

      <button id="view-hide-layer-panel">
        <br />
        <span id="dir-txt">&#9204;</span> <br /><br />
      </button>
      <div id="rightInfoBar" className="rightInfoBarBorder">
        <div className="infoLayerElem" id="infoLayerGrantLots"></div>
        <div className="infoLayerElem" id="infoLayerDutchGrants"></div>
        <div className="infoLayerElem" id="infoLayerNativeGroups"></div>
        <div className="infoLayerElem" id="infoLayerCastello"></div>
        <div className="infoLayerElem" id="demoLayerInfo"></div>
      </div>

      <div id="studioMenu">
        <FontAwesomeIcon id="mobi-hide-sidebar" icon={faArrowCircleLeft} />
        <p className="title">LAYERS</p>
        <br />
        <SectionLayerComponent layersHeader={manhattaLayer.label} layer={manhattaLayer} />
      </div>

      <MapComparisonComponent></MapComparisonComponent>

      <div id="mobi-view-sidebar"><i className="fa fa-bars fa-2x"></i></div>

      <SliderWithDatePanel callback={(date: moment.Moment | null) => setCurrDate(date)}></SliderWithDatePanel>

      <div id="loading">
        <i className="fa fa-sync fa-10x fa-spin" id="loading-icon"></i>
      </div>
    </>
  );
}
