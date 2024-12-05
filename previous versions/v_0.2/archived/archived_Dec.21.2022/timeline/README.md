# MapStory Local: How to Make Changes to the Map
## Current Version: 1.2

Below are the basic steps to make changes to MapStory Local. At the moment, it is not possible to edit the map directly, but data can be appended or replaced. If you have some data you'd like to add to the map, or replace existing data with, these are the instructions to follow. More thorough instructions will come soon.


### Data Preparation

(1) Prepare data attributes.
- Necessary time data fields: DateStart, DateEnd
- Format: YYYYMMDD

(2) Project data.
- Web Mercator, EPSG: 3857

(3) Save as geojson.

(4) Use tippecanoe to generate tileset (MBTiles) from geojson file.
- Instructions are in separate pdf


### Append Data to Map

(5) Upload tileset (MBTiles) to mapbox.
- This requires access to MapBox account

(6) Change javascript file (map.js) to include new tileset, with any styling.
- Detailed instructions are separate

(7) Demo the changes (v1.2.html).
- Note: May take time for tileset to process on server and be seen.

(8) Upload geojson file to central data repository, and add link as a comment in the map.js file: []

(9) Push changes to map.js file, map will update.
- This requires access to server

