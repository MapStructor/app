'use client';
import React, { DetailedHTMLProps, HTMLAttributes, RefObject, useEffect, useRef } from 'react';
import mapboxgl, { Map } from 'mapbox-gl'; 
import MapboxCompareWrapper from './mapbox-compare.component';
import { MapItem } from '@/app/models/maps/map.model';

const isClient = typeof window !== 'undefined'

type MapComparisonComponentProps = {
  comparisonContainerRef: RefObject<HTMLDivElement>,
  beforeMapContainerRef: RefObject<HTMLDivElement>,
  afterMapContainerRef: RefObject<HTMLDivElement>,
  afterMap: MapItem,
  beforeMap: MapItem,
  beforeMapRef: RefObject<Map | null>,
  afterMapRef: RefObject<Map | null>,
}

const MapComparisonComponent = (props: MapComparisonComponentProps) => {  
    return (
      <>
      <MapboxCompareWrapper 
      afterMap={props.afterMap} 
      beforeMap={props.beforeMap}
      comparisonContainerRef={props.comparisonContainerRef}
      beforeMapContainerRef={props.beforeMapContainerRef}
      afterMapContainerRef={props.afterMapContainerRef}
      beforeMapRef={props.beforeMapRef}
      afterMapRef={props.afterMapRef}
      ></MapboxCompareWrapper>
      </>
    );
}

export default MapComparisonComponent;