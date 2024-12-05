import { getFontawesomeIcon } from "@/app/helpers/font-awesome.helper";
import { FontAwesomeLayerIcons } from "@/app/models/font-awesome.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import {LayerSection} from "@prisma/client";
import { useState } from "react";

type NewLayerSectionFormProps = {
    afterSubmit: () => void,
    afterCancel: () => void,
    layerSection?: LayerSection,
    authToken: string
}

const NewLayerSectionForm = (props: NewLayerSectionFormProps) => {
    const [submitType, setSubmitType] = useState<"POST" | "UPDATE" | "DELETE">();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: props.layerSection?.name ?? ''
        },
          
        onSubmit: async (values) => {
            if(values.name?.length > 0) {
                if(submitType === "POST")
                    {
                      try 
                      {
                        await fetch('api/LayerSection', {
                          method: 'POST',
                          headers: {
                            'authorization': props.authToken ?? '',
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify(values),
                        });
                        alert('Layer Section added successfully');
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
                      if(props.layerSection)
                      {
                        try
                        {
                          await fetch('http://localhost:3000/api/LayerSection/' + props.layerSection.id, {
                            method: 'PUT',
                            headers: {
                                'authorization': props.authToken,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(values)
                          });
                          alert(`Layer Section Updated`);
                          props.afterSubmit();
                        }
                        catch (error: any)
                        {
                          alert(`Error: ${error.message}`);
                        }
                      }
                      else
                      {
                        alert(`Error: layerSection unpopulated`);
                      }
                    }
                    else if(submitType === "DELETE")
                    {
                      if(props.layerSection)
                        {
                          try
                          {
                            await fetch('http://localhost:3000/api/LayerSection/' + props.layerSection.id, {
                              method: 'DELETE',
                              headers: {
                                'authorization': props.authToken,
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify(values)
                            });
                            alert(`Layer Section Deleted`);
                            props.afterSubmit();
                          }
                          catch (error: any)
                          {
                            alert(`Error: ${error.message}`);
                          }
                        }
                        else
                        {
                          alert(`Error: layerSection unpopulated`);
                        }
                    }
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '10px' }}>
                <label htmlFor="layerName">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    style={{ flex: '1', border: '1px solid black', width: '150px' }}
                />
                {props.layerSection ? (
                    <>
                        <button 
                        style={{ padding: '1px 6px', borderRadius: '5px', backgroundColor: '#007BFF', color: 'white'}}
                        onClick={async (e) => {
                            e.preventDefault();
                            setSubmitType("UPDATE");
                            await formik.submitForm();
                        }}>
                            <FontAwesomeIcon icon={getFontawesomeIcon(FontAwesomeLayerIcons.CHECKMARK, false)}></FontAwesomeIcon>
                        </button>
                        <button 
                        style={{ padding: '1px 6px', borderRadius: '5px', backgroundColor: '#a40000', color: 'white' }}
                        onClick={async (e) => {
                            e.preventDefault();
                            setSubmitType("DELETE");
                            await formik.submitForm();
                        }}>
                            <FontAwesomeIcon icon={getFontawesomeIcon(FontAwesomeLayerIcons.TRASHCAN)}></FontAwesomeIcon>
                        </button>
                    </>
                ) : (
                <>
                    <button 
                    style={{ padding: '1px 6px', borderRadius: '5px', backgroundColor: '#007BFF', color: 'white'}}
                    onClick={async (e) => {
                        e.preventDefault();
                        setSubmitType("POST");
                        await formik.submitForm();
                    }}>
                        <FontAwesomeIcon icon={getFontawesomeIcon(FontAwesomeLayerIcons.CHECKMARK, false)}></FontAwesomeIcon>
                    </button>
                    <button 
                    style={{ padding: '1px 6px', borderRadius: '5px', backgroundColor: '#a40000', color: 'white' }}
                    onClick={() => props.afterCancel()}>
                        <FontAwesomeIcon icon={getFontawesomeIcon(FontAwesomeLayerIcons.XMARK)}></FontAwesomeIcon>
                    </button>
                </>
                )

                }
            </div>
        </form>
    )
}

export default NewLayerSectionForm;