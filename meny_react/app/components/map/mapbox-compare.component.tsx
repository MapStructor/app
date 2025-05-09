"use client";
import mapboxgl, { Map } from 'mapbox-gl'; 
import { RefObject, useEffect, useRef, useState } from "react";
import { addBeforeLayers } from '../maps/beforemap';  
import '../../compare.css';  
import { MapItem } from '@/app/models/maps/map.model';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwbnkiLCJhIjoiY2xtMG93amk4MnBrZTNnczUzY2VvYjg0ciJ9.MDMHYBlVbG14TJD120t6NQ';

interface MapboxCompareWrapperProps {
  comparisonContainerRef: RefObject<HTMLDivElement>;
  beforeMapContainerRef: RefObject<HTMLDivElement>;
  afterMapContainerRef: RefObject<HTMLDivElement>;
  afterMap: MapItem,
  beforeMap: MapItem,
  beforeMapRef: RefObject<Map | null>,
  afterMapRef: RefObject<Map | null>,
}

export default function MapboxCompareWrapper(props: MapboxCompareWrapperProps) {
  const footerHeight = 74;

  // Zoom controls for both before and after maps
  const handleZoomIn = () => {
    props.beforeMapRef.current?.zoomIn();
    props.afterMapRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    props.beforeMapRef.current?.zoomOut();
    props.afterMapRef.current?.zoomOut();
  };

  const handleResetNorth = () => {
    props.beforeMapRef.current?.resetNorth();
    props.afterMapRef.current?.resetNorth();
  };

  return (
    <div
      id="comparison-container"
      ref={props.comparisonContainerRef}
      style={{ height: `calc(100vh - ${footerHeight}px)`, width: '100vw', position: 'relative' }} 
    >
      {/* Before and After Maps */}
      <div id="before" ref={props.beforeMapContainerRef} className="map-style"></div>
      <div id="after" ref={props.afterMapContainerRef} className="map-style"></div>

      {/* Compare Swiper */}
      <div className="compare-swiper"></div>

      {/* Zoom and North Reset Controls */}
      <div className="map-controls">
        <button className="zoom-btn" onClick={handleZoomIn}>+</button>
        <button className="zoom-btn" onClick={handleZoomOut}>-</button>
        <button className="north-btn" onClick={handleResetNorth}>⭮</button>
      </div>
    </div>
  );
}
