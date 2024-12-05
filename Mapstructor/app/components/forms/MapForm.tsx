import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { CSSProperties } from 'react';
import { MapFilterGroup as PrismaMapFilterGroup } from '@prisma/client';

type POSTMapFormProps = {
  authToken?: string
}
const POSTMapForm = (props: POSTMapFormProps) => {
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showGroupSettings, setShowGroupSettings] = useState(false);
  const [existingGroups, setExistingGroups] = useState<PrismaMapFilterGroup[]>([]);

  const formik = useFormik({
    initialValues: {
      name:                    undefined,
      longitude:               0,
      latitude:                0,
      mapId:                   undefined,
      itemId:                  undefined,
      itemName:                undefined,
      itemLabel:               undefined,
      groupid:                 undefined,
      zoom:                    0,
      bearing:                 0,
      styleId:                 undefined,
      groupValue:              undefined,
      newGroupName:            undefined,
      newGroupLabel:           undefined
    },
    
    onSubmit: async (values) => {

      let map;
      let item;

      if(values.mapId){ //to add more maps then appen to map and make struct or some idk
        map = [{
          longitude: values.longitude,
          groupId: `unique-map-id-${values.newGroupName}-${values.name}`,
          latitude: values.latitude,
          mapName: values.name,
          mapId: values.mapId,
          zoom: values.zoom,
          bearing: values.bearing,
          styleId: values.styleId
        }]
      }
      if(values.itemId){
        item = [{
          itemName: values.itemName, 
          groupId: `unique-map-id-${values.newGroupName}-${values.name}`,
          label: values.itemLabel, 
          itemId: values.itemId, 
          defaultCheckedForBeforeMap: true, //change
          defaultCheckedForAfterMap: false, //change
          showInfoButton: true, //change
          showZoomButton: false //change
        }]
      }

      try {
        // If we are creating a new group, need to hit a different endpoint

        if(values.groupValue === 'newGroup') {
          const serializedBody = {
            groupName: values.newGroupName,
            label: values.newGroupLabel,
            groupId: `unique-map-id-${values.newGroupName}-${values.name}`,
            mapfilteritems: item,
            maps: map
          }

          const response = await fetch('api/map', {
            method: 'POST',
            headers: {
              'authorization': props.authToken ?? '',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(serializedBody),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setResponseMessage(`Success - map ID: ${data.message}`); 
          formik.resetForm(); 
        } 
        
        else {//fix to send whole group to be updated

          const serializedBody = {
            mapName: values.name,
            groupId: values.groupValue,
            longitude: values.longitude,
            latitude: values.latitude,
            mapId: values.mapId,
            zoom: values.zoom,
            bearing: values.bearing,
            styleId: values.styleId,
            itemName: values.itemName, 
            label: values.itemLabel, 
            itemId: values.itemId, 
            defaultCheckedForBeforeMap: true, //change
            defaultCheckedForAfterMap: false, //change
            showInfoButton: true, //change
            showZoomButton: false //change
          }

          const response = await fetch('api/map', {
            method: 'PUT',
            headers: {
              'authorization': props.authToken ?? '',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(serializedBody),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setResponseMessage(`Success - map ID: ${data.message}`); 
          formik.resetForm(); 
        }
      } catch (error) {
        setErrorMessage(`Error: ${error}`);
        setResponseMessage('');
      }
    },
  });

  const getMaps = () => {
    fetch('http://localhost:3000/api/map', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
    }).then(maps => {
        maps.json()?.then(parsed => {
          if(!!parsed && !!parsed.groups && parsed.groups.length) {
            let groups: PrismaMapFilterGroup[] = parsed.groups;

            setExistingGroups(groups)
          }
        }).catch(err => {
          console.error('failed to convert to json: ', err)
        })
    }).catch(err => {
      console.error(err);
    })
  }

  useEffect(() => {
    getMaps();
  }, [])

  const boxStyling: CSSProperties = {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '10px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px'
};

const labelStyling: CSSProperties = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333'
};

const buttonStyling: CSSProperties = {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px'
};

const buttonHoverStyling: CSSProperties = {
    backgroundColor: '#0056b3'
};

return (
    <form onSubmit={formik.handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h2 style={{ paddingBottom: '8px', color: '#333', textAlign: 'center' }}><strong>Add New Map</strong></h2>
        
        <div style={{ marginBottom: '15px' }}>
            <label htmlFor="name" style={labelStyling}>Name:</label>
            <input type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} style={boxStyling} />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
            <label htmlFor="longitude" style={labelStyling}>Longitude:</label>
            <input type="number" id="longitude" name="longitude" onChange={formik.handleChange} value={formik.values.longitude} style={boxStyling} />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
            <label htmlFor="latitude" style={labelStyling}>Latitude:</label>
            <input type="number" id="latitude" name="latitude" onChange={formik.handleChange} value={formik.values.latitude} style={boxStyling} />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
            <label htmlFor="mapId" style={labelStyling}>Map ID:</label>
            <input type="text" id="mapId" name="mapId" onChange={formik.handleChange} value={formik.values.mapId} style={boxStyling} />
        </div>

        <div style={{ marginBottom: '15px' }}>
            <label htmlFor="zoom" style={labelStyling}>Zoom:</label>
            <input type="number" id="zoom" name="zoom" onChange={formik.handleChange} value={formik.values.zoom} style={boxStyling} />
        </div>

        <div style={{ marginBottom: '15px' }}>
            <label htmlFor="bearing" style={labelStyling}>Bearing:</label>
            <input type="number" id="bearing" name="bearing" onChange={formik.handleChange} value={formik.values.bearing} style={boxStyling} />
        </div>

        <div style={{ marginBottom: '15px' }}>
            <label htmlFor="styleId" style={labelStyling}>StyleId:</label>
            <input type="text" id="styleId" name="styleId" onChange={formik.handleChange} value={formik.values.styleId} style={boxStyling} />
        </div>


        <div style={{ marginBottom: '15px' }}>
            <label htmlFor="itemId" style={labelStyling}>Item ID:</label>
            <input type="text" id="itemId" name="itemId" onChange={formik.handleChange} value={formik.values.itemId} style={boxStyling} />
        </div>

        <div style={{ marginBottom: '15px' }}>
            <label htmlFor="itemName" style={labelStyling}>Item name:</label>
            <input type="text" id="itemName" name="itemName" onChange={formik.handleChange} value={formik.values.itemName} style={boxStyling} />
        </div>

        <div style={{ marginBottom: '15px' }}>
            <label htmlFor="itemLabel" style={labelStyling}>Item label:</label>
            <input type="text" id="itemLabel" name="itemLabel" onChange={formik.handleChange} value={formik.values.itemLabel} style={boxStyling} />
        </div>



              {/* Dropdown for Type */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="groupValue" style={labelStyling}>Group:</label>
          <select
            id="groupValue"
            name="groupValue"
            onChange={formik.handleChange}
            value={formik.values.groupValue ?? ''}
            style={boxStyling}
          >
            <option value="">Select Type</option>
            <option value="newGroup">Create New Group</ option>
            {
              (existingGroups ?? []).map(grp => (
                <>
                  <option key={grp.groupId} value={grp.groupId}>{grp.groupName}</ option>
                </>
              ))
            }
          </select>
        </div>

      {
        ((formik.values.groupValue ?? undefined) === 'newGroup') && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="newGroupName" style={labelStyling}>New Group Name:</label>
              <input type="text" id="newGroupName" name="newGroupName" onChange={formik.handleChange} value={formik.values.newGroupName} style={boxStyling} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="newGroupLabel" style={labelStyling}>New Group Label:</label>
              <input type="text" id="newGroupLabel" name="newGroupLabel" onChange={formik.handleChange} value={formik.values.newGroupLabel} style={boxStyling} />
            </div>
          </>
        )
      }
        
        <button style={buttonStyling} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyling.backgroundColor!}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyling.backgroundColor!}
            type="submit">
            Submit
        </button>
    </form>
);
};

export default POSTMapForm;
