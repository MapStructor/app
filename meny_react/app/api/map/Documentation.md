# MENY Map API
 An API for storing and retreiving maps for the MENY interface.

## REST API

### GET
**Purpose:** To get all the maps in the database
	- Inputs: none
	- Outputs: gives a JSON object of all the maps

###  POST
**Purpose:** To create a new map record in the database
	- Inputs: JSON with id:Int, name:String, checked:Boolean, infoId:String, and zoomFunction:String
	- Outputs: Sends the newly generated id
**Exsample:** what to send to the sever
``` 
{ 
"name":  "My Map",
"checked":  true,
"infoId":  "info-id-456",
"zoomFunction":  "zoomLevelFunction"
} 
```
### DELETE
**Purpose:** To delete a map record in the database
	- Inputs: JSON with id:int, name:String, checked:Boolean, infoId:String, and zoomFunction:String
	- Outputs: gives a JSON object of the new map that was send
**Exsample:** what to send to the sever
``` 
{ 
"id":  121
} 
```
### PUT
**Purpose:** To delete a map record in the database
	- Inputs: JSON with id:Int, name?:String, checked?:Boolean, infoId?:String, and zoomFunction?:String
	- Outputs: gives a JSON object of the new map that was saved
**Exsample:** what to send to the sever
``` 
{ 
"id":  121,
"name": "new name for map"
} 
```