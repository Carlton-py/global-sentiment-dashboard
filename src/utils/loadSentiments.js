import Papa from "papaparse";

export async function fetchSentiments() {
  try {
    // use import.meta.env.BASE_URL as the correct prefix
    const url = `${import.meta.env.BASE_URL}geo_sentiments.csv`;
    const res = await fetch(url);
    const raw = await res.text();
    console.log("📝 Raw CSV (first lines):", raw.split("\n").slice(0, 5));

    const { data } = Papa.parse(raw, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
      delimiter: ",",
    });
    console.log("⚙️ Papaparse rows:", data.slice(0, 5));

    const cleaned = data
      .filter(
        (d) =>
          d.Country?.trim() &&
          d.Region?.trim() &&
          d.RandomValue != null
      )
      .map((d) => ({
        country: d.Country.trim(),
        region: d.Region.trim(),
        value: Number(d.RandomValue),
      }));

    console.log("✅ Cleaned data:", cleaned.slice(0, 5));
    return cleaned;
  } catch (e) {
    console.error("❌ CSV fetch/parse error:", e);
    throw e;
  }
}


// src/utils/loadSentiments.js
/*import Papa from "papaparse";

/**
 * Fetches & parses geo_sentiments.csv, trimming headers so
 * Country,   Region,   RandomValue → { Country, Region, RandomValue }
 */
/*export async function fetchSentiments() {
  try {
    // 1) fetch the raw text
    const res = await fetch("/geo_sentiments.csv");
    const raw = await res.text();
    console.log("📝 Raw CSV (first lines):", raw.split("\n").slice(0, 5));

    // 2) parse it with trimmed headers
    const { data } = Papa.parse(raw, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),      // ← remove tabs & spaces
      delimiter: ",",                         // you can force comma delim
    });
    console.log("⚙️ Papaparse rows:", data.slice(0, 5));

    // 3) clean & return only valid rows
    const cleaned = data
      .filter(
        (d) =>
          d.Country?.trim() &&
          d.Region?.trim() &&
          d.RandomValue != null
      )
      .map((d) => ({
        country: d.Country.trim(),
        region: d.Region.trim(),
        value: Number(d.RandomValue),
      }));

    console.log("✅ Cleaned data:", cleaned.slice(0, 5));
    return cleaned;
  } catch (e) {
    console.error("❌ CSV fetch/parse error:", e);
    throw e;
  }
}
*/

/*import Papa from "papaparse";*/

/**
 * Fetches and parses the CSV into an array of objects:
 * [{ country, region, value }, …]
 */
/*export function fetchSentiments() {
  return new Promise((resolve, reject) => {
    Papa.parse("/geo_sentiments.csv", {
      header: true,
      download: true,
      skipEmptyLines: true,       // ← drop fully blank lines
      complete: ({ data }) => {
        const cleaned = data
          .filter(d => d.Country && d.Region && d.RandomValue != null)  // ← require all three
          .map(d => ({
            country: d.Country.trim(),
            region: d.Region.trim(),
            value: Number(d.RandomValue),
          }));
        resolve(cleaned);
      },
      error: err => reject(err),
    });
  });
}
*/