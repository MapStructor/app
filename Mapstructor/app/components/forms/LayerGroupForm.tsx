import { getFontawesomeIcon } from "@/app/helpers/font-awesome.helper";
import { FontAwesomeLayerIcons } from "@/app/models/font-awesome.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LayerGroup } from "@prisma/client";
import { useFormik } from "formik";
import { CSSProperties, useState } from "react";

type NewLayerGroupFormProps = {
    sectionLayerId: string;
    layerGroup?: LayerGroup;
    afterSubmit: () => void;
    authToken: string
}

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

  const labelStyling: CSSProperties = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333',
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

const NewLayerGroupForm = (props: NewLayerGroupFormProps) => {
    const [submitType, setSubmitType] = useState<"POST" | "UPDATE" | "DELETE">();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: props.layerGroup?.name ?? '',
            longitude: props.layerGroup?.longitude ?? '',
            latitude: props.layerGroup?.latitude ?? '',
            zoom: props.layerGroup?.zoom ?? '',
            bearing: props.layerGroup?.bearing ?? '',
        },
          
        onSubmit: async (values) => {
            if(values.name?.length > 0) {
                const resultingLayerGroup: LayerGroup = {
                    name: values.name,
                    layerSectionId: props.sectionLayerId,
                    longitude: values.longitude,
                    latitude: values.latitude,
                    zoom: values.zoom as number,
                    bearing: values.bearing as number,
                }
                if(submitType === "POST")
                    {
                      try 
                      {
                        await fetch('api/LayerGroup', {
                          method: 'POST',
                          headers: {
                            'authorization': props.authToken,
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify(resultingLayerGroup),
                        });
                        alert('Layer Group added successfully');
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
                      if(props.layerGroup)
                      {
                        try
                        {
                          await fetch('http://localhost:3000/api/LayerGroup/' + props.layerGroup.id, {
                            method: 'PUT',
                            headers: {
                                'authorization': props.authToken,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(resultingLayerGroup)
                          });
                          alert(`Layer Group Updated`);
                          props.afterSubmit();
                        }
                        catch (error: any)
                        {
                          alert(`Error: ${error.message}`);
                        }
                      }
                      else
                      {
                        alert(`Error: layerGroup unpopulated`);
                      }
                    }
                    else if(submitType === "DELETE")
                    {
                      if(props.layerGroup)
                        {
                          try
                          {
                            await fetch('http://localhost:3000/api/LayerGroup/' + props.layerGroup.id, {
                              method: 'DELETE',
                              headers: {
                                'authorization': props.authToken,
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify(resultingLayerGroup)
                            });
                            alert(`Layer Group Deleted`);
                            props.afterSubmit();
                          }
                          catch (error: any)
                          {
                            alert(`Error: ${error.message}`);
                          }
                        }
                        else
                        {
                          alert(`Error: layerGroup unpopulated`);
                        }
                    }
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ margin: '0 auto' }}>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="name" style={labelStyling}>Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    style={boxStyling}
                />
                </div>
                <div style={{ marginBottom: '15px' }}>
                <label htmlFor="longitude" style={labelStyling}>Longitude:</label>
                <input
                    type="text"
                    id="longitude"
                    name="longitude"
                    onChange={formik.handleChange}
                    value={formik.values.longitude}
                    style={boxStyling}
                />
                </div>
                <div style={{ marginBottom: '15px' }}>
                <label htmlFor="latitude" style={labelStyling}>Latitude:</label>
                <input
                    type="text"
                    id="latitude"
                    name="latitude"
                    onChange={formik.handleChange}
                    value={formik.values.latitude}
                    style={boxStyling}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="latitude" style={labelStyling}>Zoom:</label>
                <input
                    type="number"
                    id="zoom"
                    name="zoom"
                    onChange={formik.handleChange}
                    value={formik.values.zoom}
                    style={boxStyling}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="bearing" style={labelStyling}>Bearing:</label>
                <input
                    type="number"
                    id="bearing"
                    name="bearing"
                    onChange={formik.handleChange}
                    value={formik.values.bearing}
                    style={boxStyling}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: "center"}}>
          {props.layerGroup ? (
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
    )
}

export default NewLayerGroupForm;