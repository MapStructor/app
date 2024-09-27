'use client';
import React, { DetailedHTMLProps, HTMLAttributes, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxCompareWrapper from './mapbox-compare.component';

const isClient = typeof window !== 'undefined'
const MapComparisonComponent = () => {  
    return (
      <>
      <MapboxCompareWrapper></MapboxCompareWrapper>
      </>
    );
}

export default MapComparisonComponent;