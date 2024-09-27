"use client";
import mapboxgl, { Map } from 'mapbox-gl'; 
import { useEffect, useRef, useState } from "react";
import { addBeforeLayers } from '../maps/beforemap';  
import '../../compare.css';  

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwbnkiLCJhIjoiY2xtMG93amk4MnBrZTNnczUzY2VvYjg0ciJ9.MDMHYBlVbG14TJD120t6NQ';

interface MapboxCompareWrapperProps {
  someProp?: string; 
}

export default function MapboxCompareWrapper(props: MapboxCompareWrapperProps) {
  const [MapboxCompare, setMapboxCompare] = useState<any>(null);
  const beforeMapContainerRef = useRef<HTMLDivElement>(null);
  const afterMapContainerRef = useRef<HTMLDivElement>(null);
  const comparisonContainerRef = useRef<HTMLDivElement>(null);
  const footerHeight = 74;

  useEffect(() => {
    import('mapbox-gl-compare').then((mod) => {
      setMapboxCompare(() => mod.default);
    });
  }, []);

  useEffect(() => {
    if (!MapboxCompare || !comparisonContainerRef.current) return;

    const beforeMap: Map = new mapboxgl.Map({
      container: beforeMapContainerRef.current as HTMLElement,
      style: 'mapbox://styles/nittyjee/cjooubzup2kx52sqdf9zmmv2j',
      center: [-74.01454, 40.70024],
      zoom: 15.09,
      bearing: -51.3,
      attributionControl: false,
    });

    const afterMap: Map = new mapboxgl.Map({
      container: afterMapContainerRef.current as HTMLElement,
      style: 'mapbox://styles/nittyjee/cjowjzrig5pje2rmmnjb5b0y2',
      center: [-74.01454, 40.70024],
      zoom: 15.09,
      bearing: -51.3,
      attributionControl: false,
    });

    const mapboxCompare = new MapboxCompare(beforeMap, afterMap, comparisonContainerRef.current as HTMLElement);

    beforeMap.on('load', () => {
      addBeforeLayers(beforeMap, '2024-09-16');
    });

    const compareSwiper = document.querySelector('.compare-swiper') as HTMLElement;
    if (compareSwiper) {
      compareSwiper.innerHTML = ''; 

      const circleHandle = document.createElement('div');
      circleHandle.classList.add('compare-circle');  
      circleHandle.innerHTML = '<span>⏴⏵</span>';  

      compareSwiper.appendChild(circleHandle);

      circleHandle.onmousedown = function (e: MouseEvent) {
        e.preventDefault();

        const containerWidth = comparisonContainerRef.current?.offsetWidth || 1;

        document.onmousemove = function (e) {
          let newLeft = e.clientX;

          newLeft = Math.max(0, Math.min(newLeft, containerWidth));

          compareSwiper.style.left = `${newLeft}px`;

          const swiperPosition = newLeft / containerWidth;  
          mapboxCompare.setSlider(swiperPosition * containerWidth);  
        };

          document.onmouseup = function () {
          document.onmousemove = null;
        };
      };
    }
  }, [MapboxCompare]);

  return (
    <div
      id="comparison-container"
      ref={comparisonContainerRef}
      style={{ height: `calc(100vh - ${footerHeight}px)`, width: '100vw', position: 'relative' }} 
    >
      {/* Before and After Maps */}
      <div id="before" ref={beforeMapContainerRef} className="map-style"></div>
      <div id="after" ref={afterMapContainerRef} className="map-style"></div>

      {/* Compare Swiper */}
      <div className="compare-swiper"></div>
    </div>
  );
}
