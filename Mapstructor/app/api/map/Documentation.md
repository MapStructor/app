  

# MENY Map API

  

An API for storing and retreiving maps for the MENY interface.

  

  

## REST API

  

  

### GET

  

**Purpose:** To get all the maps in the database

  

- Inputs: None

  

- Outputs: gives a JSON object of all the groups
  

### POST

  

**Purpose:** To create a new map record in the database

  

#### Inputs: JSON

{

- groupName: String,

  

- label: String,

  

- mapId: String,

  

- maps: Map[

  

- longitude: Float,

  

- latitude: Float,

  

- mapName: String,

  

- zoom: Float,

  

- bearing: Float,

  

- styleId: String

  

]

  

- MapFilterItems: [

  

- itemName: String,

  

- label: String,

- ItemId: String, 

- defaultCheckedForBeforeMap: Boolean,

  

- defaultCheckedForAfterMap: Boolean,

  

- showInfoButton: Boolean,

  

- showZoomButton: Boolean

  

]

}

- Outputs: Sends the newly generated id: String

  

**Exsample:** what to send to the sever

  

```

  

{
	
	  

	"groupName": "Example Group",

	  

	"label": "Example Label",

	  

	"mapId": "unique-map-id-111",

	  

	"maps": [

	  

	{

	  

	"longitude": 34.0522,

	"mapId" : "334",

	  

	"latitude": -118.2437,

	  

	"mapName": "Los Angeles Map",

	  

	"zoom": 10.0,

	  

	"bearing": 0.0,

	  

	"styleId": "style-id-789"

	  

	}

	  

	],

	  

	"MapFilterItems": [

	  

	{

	  

	"itemName": "Filter Item 1",

	  

	"label": "Label 1",

	"itemId": "item1",

	  

	"defaultCheckedForBeforeMap": true,

	  

	"defaultCheckedForAfterMap": false,

	  

	"showInfoButton": true,

	  

	"showZoomButton": false

	  

	},

	  

	{

	  

	"itemName": "Filter Item 2",

	  

	"label": "Label 2",

	"itemId": "item 2",

	  

	"defaultCheckedForBeforeMap": false,

	  

	"defaultCheckedForAfterMap": true,

	  

	"showInfoButton": false,
	
	  

	"showZoomButton": true }

	  

	]
}
```

  

###  DELETE 

  

**Purpose:** To delete a group, map, or item record in the database

  

- Inputs: JSON 
  

- Outputs: gives a JSON object of the  thing that was deteled

  

**Exsample:** what to send to the sever

  

```
{

"groupId":  "unique-groupId-id-111", //just put group id if group

"mapId":  "33324"  //deleting a map
or
"itemId":  "item 1" //deleting a item

}
```

  

### PUT

  

**Purpose:** To delete a map record in the database

  

- Inputs: JSON 

  

- Outputs: gives a JSON object of the new map that was saved

  

**Exsample:** what to send to the sever

  
#### update a group 
```
{

"groupId":  "unique-groupId-id-111",

"groupName":  "Example g",

"label":  "Example l"

}
```
#### update a map 
```
{

"groupId":  "unique-groupId-id-111",

"mapId":  "33324",

"longitude":  34,

"latitude":  11,

"mapName":  "Map",

"zoom":  11,

"bearing":  255,

"styleId":  "style-id-211"

}
```
#### update a item 
```
{

"itemName":  "Filter Item 1222",

"label":  "Label 113213",

"itemId":  "meme1",

"defaultCheckedForBeforeMap":  true,

"defaultCheckedForAfterMap":  true,

"showInfoButton":  true,

"showZoomButton":  true,

"groupId":  "unique-groupId-id-111"

}
```