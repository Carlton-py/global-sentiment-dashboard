import React, { useMemo, useCallback } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleOrdinal } from "d3-scale";

const sentimentColors = scaleOrdinal(
  [0, 1, 2],
  ["#D32F2F", "#FBC02D", "#388E3C"]
);

const GEO_URL = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

export default function MapChart({ data, onCountryClick }) {
  const dataMap = useMemo(() => {
    const m = new Map();
    data.forEach(({ country, value }) => {
      m.set(country.toLowerCase(), value);
    });
    return m;
  }, [data]);

  const getValue = useCallback(
    (geoName) => {
      if (!geoName) return null;
      const lc = geoName.toLowerCase();
      for (let [country, val] of dataMap) {
        if (lc.includes(country)) return val;
      }
      return null;
    },
    [dataMap]
  );

  return (
    <ComposableMap projection="geoMercator" className="shadow-lg">
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const name = geo.properties.name || "Unknown";
            const val = getValue(name);
            const fillColor = val != null ? sentimentColors(val) : "#EEE";
            const isClickable = val != null;

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                // put your visuals into the style object
                style={{
                  default: {
                    fill: fillColor,
                    stroke: "#AAA",
                    outline: "none",
                    cursor: isClickable ? "pointer" : "default",
                  },
                  hover: {
                    fill: isClickable ? "#4444ff" : "#DDD",
                    outline: "none",
                    cursor: isClickable ? "pointer" : "default",
                  },
                  pressed: {},
                }}
                onClick={() => {
                  console.log("🖱️ MapChart click:", name, val);
                  if (isClickable) onCountryClick(name, val);
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
}





/*import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleOrdinal } from "d3-scale";
import React, { useMemo, useCallback } from "react";

const sentimentColors = scaleOrdinal([0, 1, 2], ["#D32F2F", "#FBC02D", "#388E3C"]);
const GEO_URL = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

export default function MapChart({ data, selectedView, onCountryClick }) {
  // Build a lowercase map for fast lookups
  const dataMap = useMemo(() => {
    return data.reduce((map, { country, value }) => {
      map.set(country.toLowerCase(), value);
      return map;
    }, new Map());
  }, [data]);

  // Safely match geoName → value
  const getValue = useCallback(
    geoName => {
      if (!geoName) return null;           // ← guard
      const nameLC = geoName.toLowerCase();
      for (let [c, v] of dataMap) {
        if (nameLC.includes(c)) return v;
      }
      return null;
    },
    [dataMap]
  );

  return (
    <ComposableMap projection="geoMercator" className="shadow-lg">
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map(geo => {
            const countryName = geo.properties.NAME || "";
            const val = getValue(countryName);

            const showFill =
              val !== null &&
              (selectedView === "overall" ||
                selectedView === ["negative", "neutral", "positive"][val]);

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={showFill ? sentimentColors(val) : "#EEE"}
                stroke="#AAA"
                onClick={() => {
                  if (val !== null) onCountryClick(countryName, val);
                }}
                style={{
                  hover: {
                    fill: val !== null ? "#4444ff" : "#DDD",
                    outline: "none",
                  },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
}
*/