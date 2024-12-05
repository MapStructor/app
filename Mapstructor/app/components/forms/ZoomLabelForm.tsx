import { ZoomLabel } from "@/app/models/zoom-layer.model";
import { useFormik } from "formik";
import { ZoomLabel as PrismaZoomLabel } from "@prisma/client";
import { CSSProperties, useEffect, useState } from "react";


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

  type ZoomLabelFormProps = {
    authToken: string
  }

const ZoomLabelForm = (props: ZoomLabelFormProps) => {
    const [currLabelsToBeAdded, setCurrLabelsToBeAdded] = useState<ZoomLabel[]>();
    const [newLabelFormOpen, setNewLabelFormOpen] = useState<boolean>();
    const [existingLabels, setExistingLabels] = useState<PrismaZoomLabel[]>([]);
    const [selectedLabel, setSelectedLabel] = useState<PrismaZoomLabel | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>();

    useEffect(() => {
        fetch('http://localhost:3000/api/ZoomLabel', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
        }).then((labels) => {
            labels?.json().then((parsed: { zoomLabel: PrismaZoomLabel[]}) => {
                setExistingLabels(parsed.zoomLabel);
            });
        })
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            await fetch('http://localhost:3000/api/ZoomLabel')
            .then((response) => {
            response.json()?.then(parsed => {
                setExistingLabels(parsed.zoomLabel);
            })
        });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const editLabel = (label: PrismaZoomLabel) => {
        setSelectedLabel(label);
        formik.resetForm();
        setNewLabelFormOpen(true);
    }

    const deleteLabel = async (label: PrismaZoomLabel) => {
        try {
            await fetch('http://localhost:3000/api/ZoomLabel/' + label.id, {
                method: 'DELETE',
                headers: {
                    'authorization': props.authToken,
                    'Content-Type': 'application/json',
                }
            })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            fetchData();
            setSelectedLabel(null);
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: selectedLabel?.title ?? '',
            centerLong: selectedLabel?.centerLongitude ?? 0,
            centerLat: selectedLabel?.centerLatitude ?? 0,
            boundsWest: selectedLabel?.topLeftBoundLongitude ?? 0,
            boundsSouth: selectedLabel?.bottomRightBoundLatitude ?? 0,
            boundsEast: selectedLabel?.bottomRightBoundLongitude ?? 0,
            boundsNorth: selectedLabel?.topLeftBoundLatitude ?? 0,
            minZoom: selectedLabel?.minZoom ?? 0,
            zoom: selectedLabel?.zoom ?? 0,
            bearing: selectedLabel?.bearing ?? 0,
            zoomToBounds: selectedLabel?.zoomToBounds ? '0' : '',
            useTextSizeZoomStyling: selectedLabel?.useTextSizeZoomStyling ? '0' : '',
            textSizeDefault: selectedLabel?.textSizeDefault ?? 18,
            textSizeStopsZoom1: selectedLabel?.textSizeStopsZoom1 ?? 6,
            textSizeStopsVal1: selectedLabel?.textSizeStopsVal1 ?? 16,
            textSizeStopsZoom2: selectedLabel?.textSizeStopsZoom2 ?? 6.5,
            textSizeStopsVal2: selectedLabel?.textSizeStopsVal2 ?? 18,
            useTextColorZoomStyling: selectedLabel?.useTextColorZoomStyling ? '0' : '',
            textColorDefault: selectedLabel?.textColorDefault ?? '#000000',
            textColorStopsZoom1: selectedLabel?.textColorStopsZoom1 ?? 6,
            textColorStopsVal1: selectedLabel?.textColorStopsVal1 ?? '#000000',
            textColorStopsZoom2: selectedLabel?.textColorStopsZoom2 ?? 6.5,
            textColorStopsVal2: selectedLabel?.textColorStopsVal2 ?? '#000000',
            useTextHaloWidthZoomStyling: selectedLabel?.useTextHaloWidthZoomStyling ? '0' : '',
            textHaloWidthDefault: selectedLabel?.textHaloWidthDefault ?? 3,
            textHaloWidthStopsZoom1: selectedLabel?.textHaloWidthStopsZoom1 ?? 6,
            textHaloWidthStopsVal1: selectedLabel?.textHaloWidthStopsVal1 ?? 3,
            textHaloWidthStopsZoom2: selectedLabel?.textHaloWidthStopsZoom2 ?? 6.5,
            textHaloWidthStopsVal2: selectedLabel?.textHaloWidthStopsVal2 ?? 3,
            useTextHaloBlurZoomStyling: selectedLabel?.useTextHaloBlurZoomStyling ? '0' : '',
            textHaloBlurDefault: selectedLabel?.textHaloBlurDefault ?? 2,
            textHaloBlurStopsZoom1: selectedLabel?.textHaloBlurStopsZoom1 ?? 6,
            textHaloBlurStopsVal1: selectedLabel?.textHaloBlurStopsVal1 ?? 2,
            textHaloBlurStopsZoom2: selectedLabel?.textHaloBlurStopsZoom2 ?? 6.5,
            textHaloBlurStopsVal2: selectedLabel?.textHaloBlurStopsVal2 ?? 2,
            useTextHaloColorZoomStyling: selectedLabel?.useTextHaloColorZoomStyling ? '0' : '',
            textHaloColorDefault: selectedLabel?.textHaloColorDefault ?? '#ffffff',
            textHaloColorStopsZoom1: selectedLabel?.textHaloColorStopsZoom1 ?? 6,
            textHaloColorStopsVal1: selectedLabel?.textHaloColorStopsVal1 ?? '#ffffff',
            textHaloColorStopsZoom2: selectedLabel?.textHaloColorStopsZoom2 ?? 6.5,
            textHaloColorStopsVal2: selectedLabel?.textHaloColorStopsVal2 ?? '#ffffff',
            useTextOpacityZoomStyling: selectedLabel?.useTextOpacityZoomStyling ? '0' : '',
            textOpacityDefault: selectedLabel?.textOpacityDefault ?? 1,
            textOpacityStopsZoom1: selectedLabel?.textOpacityStopsZoom1 ?? 6,
            textOpacityStopsVal1: selectedLabel?.textOpacityStopsVal1 ?? 0,
            textOpacityStopsZoom2: selectedLabel?.textOpacityStopsZoom2 ?? 6.5,
            textOpacityStopsVal2: selectedLabel?.textOpacityStopsVal2 ?? 1
        },
          
        onSubmit: async (values) => {
            if(values.title?.length > 0) {
                let zoomLabelDBEntry: PrismaZoomLabel = {
                    title: values.title,
                    centerLongitude: +values.centerLong,
                    centerLatitude: +values.centerLat,
                    topLeftBoundLatitude: +values.boundsWest,
                    topLeftBoundLongitude: +values.boundsSouth,
                    bottomRightBoundLatitude: +values.boundsEast,
                    bottomRightBoundLongitude: +values.boundsNorth,
                    minZoom: +values.minZoom,
                    zoom: +values.zoom,
                    bearing: +values.bearing,
                    zoomToBounds: values.zoomToBounds == '0',
                    useTextSizeZoomStyling: values.useTextSizeZoomStyling == '0',
                    textSizeDefault: values.textSizeDefault,
                    textSizeStopsZoom1: values.textSizeStopsZoom1,
                    textSizeStopsVal1: values.textSizeStopsVal1,
                    textSizeStopsZoom2: values.textSizeStopsZoom2,
                    textSizeStopsVal2: values.textSizeStopsVal2,
                    useTextColorZoomStyling: values.useTextColorZoomStyling == '0',
                    textColorDefault: values.textColorDefault,
                    textColorStopsZoom1: values.textColorStopsZoom1,
                    textColorStopsVal1: values.textColorStopsVal1,
                    textColorStopsZoom2: values.textColorStopsZoom2,
                    textColorStopsVal2: values.textColorStopsVal2,
                    useTextHaloWidthZoomStyling: values.useTextHaloWidthZoomStyling == '0',
                    textHaloWidthDefault: values.textHaloWidthDefault,
                    textHaloWidthStopsZoom1: values.textHaloWidthStopsZoom1,
                    textHaloWidthStopsVal1: values.textHaloWidthStopsVal1,
                    textHaloWidthStopsZoom2: values.textHaloWidthStopsZoom2,
                    textHaloWidthStopsVal2: values.textHaloWidthStopsVal2,
                    useTextHaloBlurZoomStyling: values.useTextHaloBlurZoomStyling == '0',
                    textHaloBlurDefault: values.textHaloBlurDefault,
                    textHaloBlurStopsZoom1: values.textHaloBlurStopsZoom1,
                    textHaloBlurStopsVal1: values.textHaloBlurStopsVal1,
                    textHaloBlurStopsZoom2: values.textHaloBlurStopsZoom2,
                    textHaloBlurStopsVal2: values.textHaloBlurStopsVal2,
                    useTextHaloColorZoomStyling: values.useTextHaloColorZoomStyling == '0',
                    textHaloColorDefault: values.textHaloColorDefault,
                    textHaloColorStopsZoom1: values.textHaloColorStopsZoom1,
                    textHaloColorStopsVal1: values.textHaloColorStopsVal1,
                    textHaloColorStopsZoom2: values.textHaloColorStopsZoom2,
                    textHaloColorStopsVal2: values.textHaloColorStopsVal2,
                    useTextOpacityZoomStyling: values.useTextOpacityZoomStyling == '0',
                    textOpacityDefault: values.textOpacityDefault,
                    textOpacityStopsZoom1: values.textOpacityStopsZoom1,
                    textOpacityStopsVal1: values.textOpacityStopsVal1,
                    textOpacityStopsZoom2: values.textOpacityStopsZoom2,
                    textOpacityStopsVal2: values.textOpacityStopsVal2,
                } as PrismaZoomLabel

                if(selectedLabel == null) {
                    try {
                        await fetch('http://localhost:3000/api/ZoomLabel', {
                            method: 'POST',
                            headers: {
                                'authorization': props.authToken,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(zoomLabelDBEntry),
                        })
                        .then((response) => {
                        response.json()?.then(parsed => {
                            setExistingLabels([...existingLabels, parsed.zoomLabel]);
                        })
                    });
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                    finally {
                        cancelForm();
                        setIsLoading(false);
                    }
                } else {
                    try {
                        await fetch('http://localhost:3000/api/ZoomLabel/' + selectedLabel.id, {
                            method: 'PUT',
                            headers: {
                                'authorization': props.authToken,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(zoomLabelDBEntry),
                        })
                        .then((response) => {
                        response.json()?.then(parsed => {
                            setExistingLabels([...existingLabels, parsed.zoomLabel]);
                        })
                    });
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                    finally {
                        cancelForm();
                        setIsLoading(false);
                    }
                }
            }
        }
    });

    useEffect(() => {
        fetchData();
    }, []);

    const cancelForm = () => {
        formik.resetForm();
        fetchData();
        setSelectedLabel(null);
        setNewLabelFormOpen(false);
    }

    return (
        <>
        {
            newLabelFormOpen && (
                <form onSubmit={formik.handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="title" style={labelStyling}>Label Title:</label>
                        <input type="text" id="title" name="title" onChange={formik.handleChange} value={formik.values.title} style={boxStyling} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <div id="coordinates">
                            <label htmlFor="centerLong" style={labelStyling}>Longitude:</label>
                            <input type="text" id="centerLong" name="centerLong" onChange={formik.handleChange} value={formik.values.centerLong} style={boxStyling} />
                            <label htmlFor="centerLat" style={labelStyling}>Latitude:</label>
                            <input type="text" id="centerLat" name="centerLat" onChange={formik.handleChange} value={formik.values.centerLat} style={boxStyling} />
                            <label htmlFor="zoom" style={labelStyling}>Zoom:</label>
                            <input type="text" id="zoom" name="zoom" onChange={formik.handleChange} value={formik.values.zoom} style={boxStyling} />
                            <label htmlFor="bearing" style={labelStyling}>Bearing:</label>
                            <input type="text" id="bearing" name="bearing" onChange={formik.handleChange} value={formik.values.bearing} style={boxStyling} />
                        </div>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <div id="boundCoordinates">
                            <label htmlFor="boundsWest" style={labelStyling}>West Bound:</label>
                            <input type="text" id="boundsWest" name="boundsWest" onChange={formik.handleChange} value={formik.values.boundsWest} style={boxStyling} />
                            <label htmlFor="boundsSouth" style={labelStyling}>South Bound:</label>
                            <input type="text" id="boundsSouth" name="boundsSouth" onChange={formik.handleChange} value={formik.values.boundsSouth} style={boxStyling} />
                            <label htmlFor="boundsEast" style={labelStyling}>East Bound:</label>
                            <input type="text" id="boundsEast" name="boundsEast" onChange={formik.handleChange} value={formik.values.boundsEast} style={boxStyling} />
                            <label htmlFor="boundsNorth" style={labelStyling}>North Bound:</label>
                            <input type="text" id="boundsNorth" name="boundsNorth" onChange={formik.handleChange} value={formik.values.boundsNorth} style={boxStyling} />
                        </div>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="minZoom" style={labelStyling}>Minimum Zoom to Show:</label>
                        <input type="text" id="minZoom" name="minZoom" onChange={formik.handleChange} value={formik.values.minZoom} style={boxStyling} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={labelStyling}>Zoom Level Styling Overrides:</label>
                        <div style={{ paddingLeft: 10, marginBottom: '15px' }}>
                            <label htmlFor="textSizeDefault" style={labelStyling}>Text Size:</label>
                            <input type="number" min="9" max="36" id="textSizeDefault" name="textSizeDefault" onChange={formik.handleChange} value={formik.values.textSizeDefault} style={boxStyling} />
                            <div>
                                <label htmlFor="useTextSizeZoomStyling" style={labelStyling}>
                                <input type="checkbox" id="useTextSizeZoomStyling" name="useTextSizeZoomStyling" defaultChecked={selectedLabel?.useTextSizeZoomStyling ?? false} onChange={formik.handleChange} value={'0'} style={checkboxStyling} />
                                    Set Zoom Bounds?
                                </label>
                            </div>
                            {
                                (formik.values.useTextSizeZoomStyling == '0') && (
                                    <div className="row">
                                        <input className="col" type="number" min="9" max="36" id="textSizeStopsVal1" name="textSizeStopsVal1" onChange={formik.handleChange} value={formik.values.textSizeStopsVal1} style={boxStyling} />
                                        <label className="col" style={labelStyling}> at zoom level </label>
                                        <input className="col" type="number" min="1" max="22" id="textSizeStopsZoom1" name="textSizeStopsZoom1" onChange={formik.handleChange} value={formik.values.textSizeStopsZoom1} style={boxStyling} />
                                        <label className="col" style={labelStyling}> AND </label>
                                        <input className="col" type="number" min="9" max="36" id="textSizeStopsVal2" name="textSizeStopsVal2" onChange={formik.handleChange} value={formik.values.textSizeStopsVal2} style={boxStyling} />
                                        <label className="col" style={labelStyling}> at zoom level </label>
                                        <input className="col" type="number" min="1" max="22" id="textSizeStopsZoom2" name="textSizeStopsZoom2" onChange={formik.handleChange} value={formik.values.textSizeStopsZoom2} style={boxStyling} />
                                    </div>
                                )
                            }
                        </div>
                        <div style={{ paddingLeft: 10, marginBottom: '15px' }}>
                            <label htmlFor="textColorDefault" style={labelStyling}>Text Color:</label>
                            <input type="text" id="textColorDefault" name="textColorDefault" onChange={formik.handleChange} value={formik.values.textColorDefault} style={boxStyling} />
                            <div>
                                <label htmlFor="useTextColorZoomStyling" style={labelStyling}>
                                <input type="checkbox" id="useTextColorZoomStyling" name="useTextColorZoomStyling" defaultChecked={selectedLabel?.useTextColorZoomStyling ?? false} onChange={formik.handleChange} value={'0'} style={checkboxStyling} />
                                    Set Zoom Bounds?
                                </label>
                            </div>
                            {
                                (formik.values.useTextColorZoomStyling == '0') && (
                                    <div className="row">
                                        <input className="col" type="text" id="textColorStopsVal1" name="textColorStopsVal1" onChange={formik.handleChange} value={formik.values.textColorStopsVal1} style={boxStyling} />
                                        <label className="col" style={labelStyling}> at zoom level </label>
                                        <input className="col" type="number" min="1" max="22" id="textColorStopsZoom1" name="textColorStopsZoom1" onChange={formik.handleChange} value={formik.values.textColorStopsZoom1} style={boxStyling} />
                                        <label className="col" style={labelStyling}> AND </label>
                                        <input className="col" type="text" id="textColorStopsVal2" name="textColorStopsVal2" onChange={formik.handleChange} value={formik.values.textColorStopsVal2} style={boxStyling} />
                                        <label className="col" style={labelStyling}> at zoom level </label>
                                        <input className="col" type="number" min="1" max="22" id="textColorStopsZoom2" name="textColorStopsZoom2" onChange={formik.handleChange} value={formik.values.textColorStopsZoom2} style={boxStyling} />
                                    </div>
                                )
                            }
                        </div>
                        <div style={{ paddingLeft: 10, marginBottom: '15px' }}>
                            <label htmlFor="textOpacityDefault" style={labelStyling}>Text Opacity:</label>
                            <input type="number" step="0.01" min="0" max="1" id="textOpacityDefault" name="textOpacityDefault" onChange={formik.handleChange} value={formik.values.textOpacityDefault} style={boxStyling} />
                            <div>
                                <label htmlFor="useTextOpacityZoomStyling" style={labelStyling}>
                                <input type="checkbox" id="useTextOpacityZoomStyling" name="useTextOpacityZoomStyling"  defaultChecked={selectedLabel?.useTextOpacityZoomStyling ?? false} onChange={formik.handleChange} value={'0'} style={checkboxStyling} />
                                    Set Zoom Bounds?
                                </label>
                            </div>
                            {
                                (formik.values.useTextOpacityZoomStyling == '0') && (
                                    <div className="row">
                                        <input className="col" type="number" step="0.01" min="0" max="1" id="textOpacityStopsVal1" name="textOpacityStopsVal1" onChange={formik.handleChange} value={formik.values.textOpacityStopsVal1} style={boxStyling} />
                                        <label className="col" style={labelStyling}> at zoom level </label>
                                        <input className="col" type="number" min="1" max="22" id="textOpacityStopsZoom1" name="textOpacityStopsZoom1" onChange={formik.handleChange} value={formik.values.textOpacityStopsZoom1} style={boxStyling} />
                                        <label className="col" style={labelStyling}> AND </label>
                                        <input className="col" type="number" step="0.01" min="0" max="1" id="textOpacityStopsVal2" name="textOpacityStopsVal2" onChange={formik.handleChange} value={formik.values.textOpacityStopsVal2} style={boxStyling} />
                                        <label className="col" style={labelStyling}> at zoom level </label>
                                        <input className="col" type="number" min="1" max="22" id="textOpacityStopsZoom2" name="textOpacityStopsZoom2" onChange={formik.handleChange} value={formik.values.textOpacityStopsZoom2} style={boxStyling} />
                                    </div>
                                )
                            }
                        </div>
                        <div style={{ paddingLeft: 10, marginBottom: '15px' }}>
                            <label htmlFor="textHaloWidthDefault" style={labelStyling}>Text Halo Width:</label>
                            <input type="number" min="1" max="20" id="textHaloWidthDefault" name="textColorDefault" onChange={formik.handleChange} value={formik.values.textHaloWidthDefault} style={boxStyling} />
                            <div>
                                <label htmlFor="useTextHaloWidthZoomStyling" style={labelStyling}>
                                <input type="checkbox" id="useTextHaloWidthZoomStyling" name="useTextHaloWidthZoomStyling"  defaultChecked={selectedLabel?.useTextHaloWidthZoomStyling ?? false} onChange={formik.handleChange} value={'0'} style={checkboxStyling} />
                                    Set Zoom Bounds?
                                </label>
                            </div>
                            {
                                (formik.values.useTextHaloWidthZoomStyling == '0') && (
                                    <div className="row">
                                        <input className="col" type="number" min="1" max="20" id="textHaloWidthStopsVal1" name="textHaloWidthStopsVal1" onChange={formik.handleChange} value={formik.values.textHaloWidthStopsVal1} style={boxStyling} />
                                        <label className="col" style={labelStyling}> at zoom level </label>
                                        <input className="col" type="number" min="1" max="22" id="textHaloWidthStopsZoom1" name="textHaloWidthStopsZoom1" onChange={formik.handleChange} value={formik.values.textHaloWidthStopsZoom1} style={boxStyling} />
                                        <label className="col" style={labelStyling}> AND </label>
                                        <input className="col" type="number" min="1" max="20" id="textHaloWidthStopsVal2" name="textHaloWidthStopsVal2" onChange={formik.handleChange} value={formik.values.textHaloWidthStopsVal2} style={boxStyling} />
                                        <label className="col" style={labelStyling}> at zoom level </label>
                                        <input className="col" type="number" min="1" max="22" id="textHaloWidthStopsZoom2" name="textHaloWidthStopsZoom2" onChange={formik.handleChange} value={formik.values.textHaloWidthStopsZoom2} style={boxStyling} />
                                    </div>
                                )
                            }
                        </div>
                        <div style={{ paddingLeft: 10, marginBottom: '15px' }}>
                            <label htmlFor="textHaloBlurDefault" style={labelStyling}>Text Halo Blur:</label>
                            <input type="number" min="1" max="20" id="textHaloBlurDefault" name="textHaloBlurDefault" onChange={formik.handleChange} value={formik.values.textHaloBlurDefault} style={boxStyling} />
                            <div>
                                <label htmlFor="useTextHaloBlurZoomStyling" style={labelStyling}>
                                <input type="checkbox" id="useTextHaloBlurZoomStyling" name="useTextHaloBlurZoomStyling"  defaultChecked={selectedLabel?.useTextHaloBlurZoomStyling ?? false} onChange={formik.handleChange} value={'0'} style={checkboxStyling} />
                                    Set Zoom Bounds?
                                </label>
                            </div>
                            {
                                (formik.values.useTextHaloBlurZoomStyling == '0') && (
                                    <div className="row">
                                        <input className="col" type="number" min="1" max="20" id="textHaloBlurStopsVal1" name="textHaloBlurStopsVal1" onChange={formik.handleChange} value={formik.values.textHaloBlurStopsVal1} style={boxStyling} />
                                        <label className="col" style={labelStyling}> at zoom level </label>
                                        <input className="col" type="number" min="1" max="22" id="textHaloBlurStopsZoom1" name="textHaloBlurStopsZoom1" onChange={formik.handleChange} value={formik.values.textHaloBlurStopsZoom1} style={boxStyling} />
                                        <label className="col" style={labelStyling}> AND </label>
                                        <input className="col" type="number" min="1" max="20" id="textHaloBlurStopsVal2" name="textHaloBlurStopsVal2" onChange={formik.handleChange} value={formik.values.textHaloBlurStopsVal2} style={boxStyling} />
                                        <label className="col" style={labelStyling}> at zoom level </label>
                                        <input className="col" type="number" min="1" max="22" id="textHaloBlurStopsZoom2" name="textHaloBlurStopsZoom2" onChange={formik.handleChange} value={formik.values.textHaloBlurStopsZoom2} style={boxStyling} />
                                    </div>
                                )
                            }
                        </div>
                        <div style={{ paddingLeft: 10, marginBottom: '15px' }}>
                            <label htmlFor="textHaloColorDefault" style={labelStyling}>Text Halo Color:</label>
                            <input type="text" id="textHaloColorDefault" name="textHaloColorDefault" onChange={formik.handleChange} value={formik.values.textHaloColorDefault} style={boxStyling} />
                            <div>
                                <label htmlFor="useTextHaloColorZoomStyling" style={labelStyling}>
                                <input type="checkbox" id="useTextHaloColorZoomStyling" name="useTextHaloColorZoomStyling"  defaultChecked={selectedLabel?.useTextHaloColorZoomStyling ?? false} onChange={formik.handleChange} value={'0'} style={checkboxStyling} />
                                    Set Zoom Bounds?
                                </label>
                            </div>
                            {
                                (formik.values.useTextHaloColorZoomStyling == '0') && (
                                    <div className="row">
                                        <input className="col" type="text" id="textHaloColorStopsVal1" name="textHaloColorStopsVal1" onChange={formik.handleChange} value={formik.values.textHaloColorStopsVal1} style={boxStyling} />
                                        <label className="col" style={labelStyling}> at zoom level </label>
                                        <input className="col" type="number" min="1" max="22" id="textHaloColorStopsZoom1" name="textHaloColorStopsZoom1" onChange={formik.handleChange} value={formik.values.textHaloColorStopsZoom1} style={boxStyling} />
                                        <label className="col" style={labelStyling}> AND </label>
                                        <input className="col" type="text" id="textHaloColorStopsVal2" name="textHaloColorStopsVal2" onChange={formik.handleChange} value={formik.values.textHaloColorStopsVal2} style={boxStyling} />
                                        <label className="col" style={labelStyling}> at zoom level </label>
                                        <input className="col" type="number" min="1" max="22" id="textHaloColorStopsZoom2" name="textHaloColorStopsZoom2" onChange={formik.handleChange} value={formik.values.textHaloColorStopsZoom2} style={boxStyling} />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                        <label style={labelStyling}>
                            Where Should This Zoom To?
                        </label>
                        <label htmlFor="zoomToBounds" style={labelStyling}>
                        <input type="radio" id="zoomToBounds" name="zoomToBounds" onChange={formik.handleChange} value={'0'} style={checkboxStyling} />
                            Zoom to Bounds
                        </label>
                        <label htmlFor="zoomToBounds" style={labelStyling}>
                            <input type="radio" id="zoomToBounds" name="zoomToBounds" onChange={formik.handleChange} value={'1'} style={checkboxStyling} />
                            Zoom to Center
                        </label>
                    </div>
                    <button type="submit" disabled={!formik.isValid} style={{
                        backgroundColor: '#007aff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '10px 15px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                        marginRight: '15px'
                    }}>
                        Submit
                    </button>
                    <button type="button" onClick={() => cancelForm()} style={{
                        backgroundColor: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '10px 15px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                    }}>
                        Cancel
                    </button>
                </form>
            )
        }
        <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
        }}>
            {!newLabelFormOpen && (
                existingLabels.map((lbl) => {
                if(!lbl) return(<></>)
                return(
                    <div style={{
                        border: '2px solid #ce5c00',
                        marginBottom: '15px',
                        padding: '10px',
                        borderRadius: '5px',
                        backgroundColor: '#fff5e6',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }}
                    key={lbl.title}>
                        <div style={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            margin: 0,
                            padding: '5px',
                            backgroundColor: '#ffd1a4',
                            borderRadius: '3px',
                        }}
                        >{lbl.title}<hr /></div>
                        <div style={{
                            marginTop: '10px',
                            fontSize: '14px',
                            color: '#333'
                        }}>
                            {lbl?.zoomToBounds ? (
                                <p>On Click, Fit Screen To:<br />
                                    W: {lbl.topLeftBoundLongitude}<br />
                                    N: {lbl.topLeftBoundLatitude}<br />
                                    E: {lbl.bottomRightBoundLongitude}<br />
                                    S: {lbl.bottomRightBoundLatitude}</p>
                            ) : (
                                <p>On Click, Fit Screen To Center</p>
                            )}
                            <p>Center: ({lbl.centerLongitude}, {lbl.centerLatitude})</p>
                        </div>
                    <center style={{
                        marginTop: '15px'
                    }}>
                        <button type="button" onClick={() => editLabel(lbl)} style={{
                            backgroundColor: '#007aff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '10px 15px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                            marginRight: '15px'
                        }}>
                            Edit
                        </button>
                        <button type="button" onClick={() => deleteLabel(lbl)} style={{
                            backgroundColor: 'red',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '10px 15px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s'
                        }}>
                            Delete
                        </button>
                    </center>
                    </div>
                )})
            )}
            {!newLabelFormOpen && (
                <div style={{
                    textAlign: 'center',
                    marginTop: '20px',
                }}>
                    <button style={{
                        backgroundColor: '#ce5c00',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '10px 15px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                    }}
                    onClick={() => setNewLabelFormOpen(true)}>
                        New Zoom Label
                    </button>
                </div>
            )}
        </div>
        </>
    );
}

export default ZoomLabelForm;