"use client";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const MapWithDirections = ({ waypoints }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [145.213776, -37.826154],
      zoom: 12,
    });

    // Function to add navigation directions
    const addDirections = () => {
      // Add navigation control (the +/- zoom buttons)
      map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

      // Add directions
      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric",
        profile: "mapbox/driving",
        controls: {
          inputs: false,
          instructions: true,
          profileSwitcher: false,
        },
        interactive: false,
      });
      map.addControl(directions, "top-left");

      // Add waypoints
      directions.setOrigin(waypoints[0].coordinates);
      directions.setDestination(waypoints[waypoints.length - 1].coordinates);
      if (waypoints.length > 2) {
        waypoints.slice(1, waypoints.length - 1).forEach((waypoint) => {
          directions.addWaypoint(waypoint.coordinates);
        });
      }
    };

    // Add navigation directions
    if (map.loaded()) {
      addDirections();
    } else {
      map.on("load", addDirections);
    }

    return () => {
      map.remove();
    };
  }, [waypoints]);

  return <div ref={mapContainerRef} className="h-[750px] w-screen" />;
};

export default MapWithDirections;
