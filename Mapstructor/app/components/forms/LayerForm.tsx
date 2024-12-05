import { FieldArray, FormikProvider, useFormik } from 'formik';
import { CSSProperties, useState } from 'react';
import ColorPickerButton from './color-picker/color-picker-button.component';
import { LayerData as PrismaLayer } from '@prisma/client';
import PreviewIcon from './preview-icon.component';

type LayerType = 'symbol' | 'fill' | 'line' | 'circle' | 'heatmap' | 'fill-extrusion' | 'raster' | 'raster-particle' | 'hillshade' | 'model' | 'background' | 'sky' | 'slot' | 'clip';
type SourceType = 'vector' | 'raster' | 'raster-dem' | 'raster-array' | 'geojson' | 'video' | 'image' | 'model' | 'batched-model';

type LayerFormProps = {
  groupName: string;
  sectionName: string;
  layerConfig?: PrismaLayer;
  afterSubmit: () => void;
  authToken: string
}

export default function LayerForm(props: LayerFormProps) {
  const [submitType, setSubmitType] = useState<"POST" | "UPDATE" | "DELETE">();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: props.layerConfig?.name ?? '',
      iconColor: props.layerConfig?.iconColor ?? '',
      iconType: props.layerConfig?.iconType ?? '',
      label: props.layerConfig?.label ?? '',
      longitude: props.layerConfig?.longitude ?? 0,
      latitude: props.layerConfig?.latitude ?? 0,
      zoom: props.layerConfig?.zoom ?? 0,
      bearing: props.layerConfig?.bearing ?? 0,
      topLayerClass: props.groupName,
      infoId: props.layerConfig?.infoId ?? '',
      type: props.layerConfig?.type ?? '' as LayerType,
      sourceType: props.layerConfig?.sourceType ?? '' as SourceType,
      sourceUrl: props.layerConfig?.sourceUrl ?? '',
      sourceId: props.layerConfig?.sourceId ?? '',
      paint: props.layerConfig?.paint ?? '',
      sourceLayer: props.layerConfig?.sourceLayer ?? '',
      hover: props.layerConfig?.hover ?? false,
      click: props.layerConfig?.click ?? false,
      time: props.layerConfig?.time ?? false,
      hoverStyle: props.layerConfig?.hoverStyle ?? '',
      clickStyle: props.layerConfig?.clickStyle ?? '',
      clickHeader: props.layerConfig?.clickHeader ?? '',
      hoverContent: props.layerConfig?.hoverContent ?? [{label: "", type: ""}],
    },
    
    onSubmit: async (values) => {
      if(submitType === "POST")
      {
        try 
        {
          await fetch('api/LayerData', {
            method: 'POST',
            headers: {
              'authorization': props.authToken ?? '',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
          alert('Layer added successfully');
          formik.resetForm();
          props.afterSubmit();
        } 
        catch (error: any) 
        {
          alert(`Error: ${error.message}`);
        }
      }
      else if(submitType === "UPDATE")
      {
        if(props.layerConfig)
        {
          try
          {
            await fetch('http://localhost:3000/api/LayerData/' + props.layerConfig.id, {
              method: 'PUT',
              headers: {
                  'authorization': props.authToken,
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(values)
            });
            alert(`Layer Updated`);
            props.afterSubmit();
          }
          catch (error: any)
          {
            alert(`Error: ${error.message}`);
          }
        }
        else
        {
          alert(`Error: layerConfig unpopulated`);
        }
      }
      else if(submitType === "DELETE")
      {
        if(props.layerConfig)
          {
            try
            {
              await fetch('http://localhost:3000/api/LayerData/' + props.layerConfig.id, {
                method: 'DELETE',
                headers: {
                    'authorization': props.authToken ?? '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
              });
              alert(`Layer Deleted`);
              props.afterSubmit();
            }
            catch (error: any)
            {
              alert(`Error: ${error.message}`);
            }
          }
          else
          {
            alert(`Error: layerConfig unpopulated`);
          }
      }
    },
  });

  const boxStyling: CSSProperties = {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '10px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
  };

  const checkboxStyling: CSSProperties = {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '20%',
    height: '25px',
    boxSizing: 'border-box',
    cursor: 'pointer',
  };

  const labelStyling: CSSProperties = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333',
    minWidth: '70px',
  };

  const buttonStyling: CSSProperties = {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
  };

  const buttonHoverStyling: CSSProperties = {
    backgroundColor: '#0056b3',
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h2 style={{ paddingBottom: '8px', color: '#333', textAlign: 'center' }}>
          {props.layerConfig ? (<strong>Edit {props.layerConfig.label}</strong>) : (<strong>Add New Layer</strong>)}
        </h2>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="name" style={labelStyling}>Name:</label>
        <input type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} style={boxStyling} />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="label" style={labelStyling}>Label:</label>
        <input type="text" id="label" name="label" onChange={formik.handleChange} value={formik.values.label} style={boxStyling} />
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
        <label htmlFor="zoom" style={labelStyling}>Zoom:</label>
        <input type="number" id="zoom" name="zoom" onChange={formik.handleChange} value={formik.values.zoom} style={boxStyling} />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="bearing" style={labelStyling}>Bearing:</label>
        <input type="number" id="bearing" name="bearing" onChange={formik.handleChange} value={formik.values.bearing} style={boxStyling} />
      </div>

      {/* Got rid of this cause I don't think we need to show this
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="topLayerClass" style={labelStyling}>Top Layer Class:</label>
        <input disabled type="text" id="topLayerClass" name="topLayerClass" onChange={formik.handleChange} value={formik.values.topLayerClass} style={boxStyling} />
      </div> */}

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="infoId" style={labelStyling}>Info ID:</label>
        <input type="text" id="infoId" name="infoId" onChange={formik.handleChange} value={formik.values.infoId} style={boxStyling} />
      </div>

        {/* Dropdown for Type */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="type" style={labelStyling}>Type:</label>
          <select
            id="type"
            name="type"
            onChange={formik.handleChange}
            value={formik.values.type}
            style={boxStyling}
          >
            <option value="">Select Type</option>
            <option value="symbol">Symbol</option>
            <option value="fill">Fill</option>
            <option value="line">Line</option>
            <option value="circle">Circle</option>
            <option value="heatmap">Heatmap</option>
            <option value="fill-extrusion">Fill-Extrusion</option>
            <option value="raster">Raster</option>
            <option value="raster-particle">Raster-Particle</option>
            <option value="hillshade">Hillshade</option>
            <option value="model">Model</option>
            <option value="background">Background</option>
            <option value="sky">Sky</option>
            <option value="slot">Slot</option>
            <option value="clip">Clip</option>
          </select>
        </div>

      {/* Dropdown for Source Type */}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="sourceType" style={labelStyling}>Source Type:</label>
        <select
          id="sourceType"
          name="sourceType"
          onChange={formik.handleChange}
          value={formik.values.sourceType}
          style={boxStyling}
        >
          <option value="">Select Source Type</option>
          <option value="vector">Vector</option>
          <option value="raster">Raster</option>
          <option value="raster-dem">Raster-DEM</option>
          <option value="raster-array">Raster-Array</option>
          <option value="geojson">GeoJSON</option>
          <option value="video">Video</option>
          <option value="image">Image</option>
          <option value="model">Model</option>
          <option value="batched-model">Batched-Model</option>
        </select>
      </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="sourceUrl" style={labelStyling}>Source URL:</label>
          <input
            type="text"
            id="sourceUrl"
            name="sourceUrl"
            onChange={formik.handleChange}
            value={formik.values.sourceUrl}
            style={boxStyling}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="sourceId" style={labelStyling}>Source ID:</label>
          <input
            type="text"
            id="sourceId"
            name="sourceId"
            onChange={formik.handleChange}
            value={formik.values.sourceId}
            style={boxStyling}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="sourceLayer" style={labelStyling}>Source Layer:</label>
          <input
            type="text"
            id="sourceLayer"
            name="sourceLayer"
            onChange={formik.handleChange}
            value={formik.values.sourceLayer}
            style={boxStyling}
          />
        </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="iconColor" style={labelStyling}>Icon Color:</label>
        <div
          id="sourceLayer"
        >
        <ColorPickerButton callback={(newColor: string) => {
          formik.setValues({
            ...formik.values,
            iconColor: newColor
          });
        }}></ColorPickerButton>
        </div>

        <label htmlFor="iconType" style={labelStyling}>Icon Type:</label>
        <select
          id="iconType"
          name="iconType"
          onChange={formik.handleChange}
          value={formik.values.iconType}
          style={boxStyling}
        >
          <option value="">Select Icon Type</option>
          <option value="dots">Dots</option>
          <option value="info-circle">Info Circle</option>
          <option value="line">Line</option>
          <option value="square">Square</option>
          <option value="plus-square">Plus Square</option>
          <option value="minus-square">Minus Square</option>
        </select>

          {
            formik.values.iconColor && formik.values.iconType && (
              <><p>Result: </p><PreviewIcon iconType={formik.values.iconType} color={formik.values.iconColor }></PreviewIcon></>
            )
          }
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label htmlFor="hover" style={labelStyling}>Hover:</label>
        <input
          type="checkbox"
          id="hover"
          name="hover"
          onChange={formik.handleChange}
          checked={formik.values.hover}
          style={checkboxStyling}
        />
      </div>

        {
          (formik.values.hover) && (
            <>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="newGroupLabel" style={labelStyling}>Hover Popup Style:</label>
                <select
                  id="hoverStyle"
                  name="hoverStyle"
                  onChange={formik.handleChange}
                  value={formik.values.hoverStyle}
                  style={boxStyling}
                >
                  <option value="">Select Color</option>
                  <option value="yellow">Yellow</option>
                  <option value="orange">Orange</option>
                  <option value="light-red">Light Red</option>
                  <option value="red">Red</option>
                  <option value="light-green">Light Green</option>
                  <option value="green">Green</option>
                  <option value="light-blue">Light Blue</option>
                  <option value="blue">Blue</option>
                  <option value="light-purple">Light Purple</option>
                  <option value="purple">Purple</option>
                  <option value="white">White</option>
                  <option value="light-grey">Light Grey</option>
                  <option value="grey">Grey</option>
                </select>
              </div>
              <FieldArray
                name="hoverContent"
                render={arrayHelpers => (
                  <div style={{ marginBottom: '15px' }}>
                    {formik.values.hoverContent.map((item, index) => (
                      <div key={index} style={{ display: 'flex', gap: '10px', alignItems: "center"}}>
                        <label htmlFor={`label${index}`} style={{display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333'}}>Label:</label>
                        <input
                          type="text"
                          id={`hoverContent.${index}.label`}
                          name={`hoverContent.${index}.label`}
                          onChange={formik.handleChange}
                          value={item.label}
                          style={boxStyling}
                        />
                        
                        <label htmlFor={`type${index}`} style={{display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333'}}>Type:</label>
                        <select
                          id={`hoverContent.${index}.type`}
                          name={`hoverContent.${index}.type`}
                          onChange={formik.handleChange}
                          value={item.type}
                          style={boxStyling}
                        >
                          <option value="">Select Type</option>
                          <option value="NAME">Name</option>
                          <option value="LOT">Lot</option>
                          <option value="DATE-START">Start Date</option>
                          <option value="DATE-END">End Date</option>
                          <option value="ADDRESS">Address</option>
                        </select>
                        
                        {/* Button to remove this item */}
                        <button 
                          type="button" 
                          onClick={() => arrayHelpers.remove(index)}
                          style={{ marginBottom: '10px',
                                   padding: '8px', 
                                   display: 'flex',
                                   backgroundColor: '#e22222', 
                                   color: 'white', 
                                   borderRadius: '4px', 
                                   fontSize: '30px',
                                   height: '40px',
                                   width: '40px',
                                   alignItems: 'center',
                                   justifyContent: 'center', }}>
                          &times;
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => arrayHelpers.push({ label: "", type: "" })}
                      style={{ padding: '8px', backgroundColor: '#008000', color: 'white', border: 'none', borderRadius: '4px', width: '100%', }}
                    >
                      New Popup Field
                    </button>
                  </div>
                )}
              />
            </>
          )
        }

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label htmlFor="click" style={labelStyling}>Click:</label>
          <input
            type="checkbox"
            id="click"
            name="click"
            onChange={formik.handleChange}
            checked={formik.values.click}
            style={checkboxStyling}
          />
        </div>

        {
          (formik.values.click) && (
            <>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="newGroupLabel" style={labelStyling}>Click Popup Style:</label>
                <select
                  id="clickStyle"
                  name="clickStyle"
                  onChange={formik.handleChange}
                  value={formik.values.clickStyle}
                  style={boxStyling}
                >
                  <option value="">Select Color</option>
                  <option value="yellow">Yellow</option>
                  <option value="orange">Orange</option>
                  <option value="light-red">Light Red</option>
                  <option value="red">Red</option>
                  <option value="light-green">Light Green</option>
                  <option value="green">Green</option>
                  <option value="light-blue">Light Blue</option>
                  <option value="blue">Blue</option>
                  <option value="light-purple">Light Purple</option>
                  <option value="purple">Purple</option>
                  <option value="white">White</option>
                  <option value="light-grey">Light Grey</option>
                  <option value="grey">Grey</option>
                </select>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="newGroupName" style={labelStyling}>Click Popup Header Label:</label>
                <input type="text" id="clickHeader" name="clickHeader" onChange={formik.handleChange} value={formik.values.clickHeader} style={boxStyling} />
              </div>
            </>
          )
        }

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label htmlFor="time" style={labelStyling}>Time:</label>
            <input
              type="checkbox"
              id="time"
              name="time"
              onChange={formik.handleChange}
              checked={formik.values.time}
              style={checkboxStyling}
            />
        </div>

        {/* <div style={{ marginBottom: '15px' }}>
          <label htmlFor="paint" style={labelStyling}>Paint:</label>
          <input
            type="text"
            id="paint"
            name="paint"
            onChange={formik.handleChange}
            value={formik.values.paint}
            style={boxStyling}
          />
        </div> */}
        <div style={{ display: 'flex', gap: '10px', alignItems: "center"}}>
          {props.layerConfig ? (
            <>
              <button
                style={buttonStyling}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyling.backgroundColor!)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonStyling.backgroundColor!)}
                onClick={async (e) => {
                  e.preventDefault();
                  setSubmitType("UPDATE");
                  await formik.submitForm();
                }}
              >
                Update
              </button>
              <button
                style={{
                  backgroundColor: '#a40000',
                  color: 'white',
                  padding: '10px 15px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '14px'}}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#850000')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#a40000')}
                onClick={async (e) => {
                  e.preventDefault();
                  setSubmitType("DELETE");
                  await formik.submitForm();
                }}
              >
                Delete Layer
              </button>
            </>
          ) : (
            <>
              <button
                style={buttonStyling}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyling.backgroundColor!)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonStyling.backgroundColor!)}
                onClick={async (e) => {
                  e.preventDefault();
                  setSubmitType("POST");
                  await formik.submitForm();
                }}
              >
                Submit
              </button>
            </>
          )}
        </div>
      </form>
    </FormikProvider>
  );
}
