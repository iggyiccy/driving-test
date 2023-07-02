"use client";
import MapWithDirections from "@/components/MapWithDirections";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const waypoints1 = [
    { name: "Waypoint A", coordinates: [145.213776, -37.826154] },
    { name: "Waypoint B", coordinates: [145.194773, -37.823723] },
    // Add more waypoints as needed
  ];

  const waypoints2 = [
    { name: "Waypoint X", coordinates: [145.213776, -37.826154] },
    { name: "Waypoint Y", coordinates: [145.123049, -37.790282] },
    // Add more waypoints as needed
  ];

  // handle route selection
  const [route, setRoute] = useState(waypoints1);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col items-center justify-center pt-10">
        <h1 className="text-6xl font-bold text-center">
          Ringwood Driving Test
        </h1>
        <p className="text-2xl text-center pt-4">
          A driving test route map for VicRoad Ringwood test centre
        </p>
        <select
          className="text-2xl font-bold text-center py-8 bg-black"
          onChange={(e) =>
            setRoute(e.target.value === "1" ? waypoints1 : waypoints2)
          }
        >
          <option value="1">Route 1 - Simpson Street</option>
          <option value="2">Route 2</option>
        </select>
      </div>
      <MapWithDirections waypoints={route} />
      <footer className="flex flex-col items-center justify-center p-4">
        <p className="text-center">
          Made with ❤️ by{" "}
          <a
            href="
        rchow.dev"
            className="text-blue-500"
          >
            Regina Chow
          </a>
        </p>
      </footer>
    </main>
  );
}
