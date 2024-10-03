import { GenericPopUpProps } from "@/app/models/popups/generic-pop-up.model";
import { useEffect, useState } from "react";

type PopUpProps = {
    popUpProps: GenericPopUpProps,
}

const SliderPopUp = (props: PopUpProps) => {
    const [renderedEntity, setRenderedEntity] = useState(null);
    const [nid, setNid] = useState<number | string | undefined>(props.popUpProps.nid);
    useEffect(() => {
        fetch(`https://encyclopedia.nahc-mapping.org/rendered-export-single?nid=${nid}`)
        .then((buffer) => buffer.json())
        .then((res) => {setRenderedEntity(res[0].rendered_entity)})
        .catch((error) => {
            setRenderedEntity(null);
            console.log(error);
        });
    }, [nid]);
  
    if (props.popUpProps.type === "castello-taxlot")
    {
        const hrefUrl: string = "https://encyclopedia.nahc-mapping.org/lots/taxlot" + props.popUpProps.lot2;
        return (
            <div id ='rightInfoBar' className= 'rightInfoBarBorder'>
                <div className="infoLayerElem" id="infoLayerCastello">
                    <h3>Castello Taxlot (1660)</h3>
                    <hr/><br/>
                    <b>Taxlot: </b>{props.popUpProps.lot2}<br/>
                    <b>Property Type: </b>{props.popUpProps.tax_lots_1}
                    <br/><br/>
                    <b>Encyclopedia Page: </b><br/><a href={hrefUrl} target="_blank">https://encyclopedia.nahc-mapping.org/lots/taxlot{props.popUpProps.lot2}</a>
                </div>
            </div>
            
        );
    }   
    // if (props.popUpProps.type === "lot-event")
    //   return (
    //     <div className="infoLayerElem" id="infoLayerGrantLots">
    //         <div className="infoLayerCastelloPopUp"><b>Taxlot (1660):</b><br/>${props.popUpProps.lot2}</div>
    //     </div>
    // );
  
    if (renderedEntity) {
          const html: string = renderedEntity;
        //   console.log("Redered Entity:")
        //   console.log(res[0].rendered_entity);
          // Define the prefix
          var prefix = "https://encyclopedia.nahc-mapping.org";
  
          // Define the regular expression pattern
          var pattern = /(<a\s+href=")([^"]+)(")/g;
          var modifiedHtmlString = "";
          const addOnForLongIslandTribes = `
            <h3>Long Island Tribes</h3>
            <hr/>
            `
            // Uncomment this to see a styling for lots events
            // const addOnForLotEvents = `<h2>Lot:</h2>`
            if(props.popUpProps.type === "long-island-native-groups")
            {
                modifiedHtmlString += addOnForLongIslandTribes;
            }
            // Uncomment this to see a styling for lots events
            /* if(sliderPopupName === "#demoLayerInfo"){
              modifiedHtmlString += addOnForLotEvents;
            } */
          // Replace href attributes with the prefixed version
          modifiedHtmlString += html
            .replace(pattern, (_: any, p1: any, p2: any, p3: any) => {
              if (p2.slice(0, 4) === "http") {
                return p1 + p2 + p3;
              }
              return p1 + prefix + p2 + p3;
            })
            .replace(/(<a\s+[^>]*)(>)/g, (_: any, p1: any, p2: any) => {
              return p1 + ' target="_blank"' + p2;
            });
            
            if(props.popUpProps.type === "long-island-native-groups")
            {
                return (
                    <div id ='rightInfoBar' className= 'rightInfoBarBorder'>
                        <div className="infoLayerElem" id="infoLayerNativeGroups" dangerouslySetInnerHTML={{__html: modifiedHtmlString}}/>
                    </div>
                );
            }
            else if(props.popUpProps.type === "dutch-grant")
            {
                return (
                    <div id ='rightInfoBar' className= 'rightInfoBarBorder'>
                        <div className="infoLayerElem" id="infoLayerDutchGrants" dangerouslySetInnerHTML={{__html: modifiedHtmlString}}/>
                    </div>
                );
            }
            else if(props.popUpProps.type === "lot-event")
                {
                    return (
                        <div id ='rightInfoBar' className= 'rightInfoBarBorder'>
                            <div className="infoLayerElem" id="infoLayerGrantLots" dangerouslySetInnerHTML={{__html: modifiedHtmlString}}/>
                        </div>
                    );
                }
    // } else {
        var popup_html:string = `<h3>Dutch Grant</h3><hr>${props.popUpProps.name}<br><b>Dutch Grant Lot:</b> <a href='https://encyclopedia.nahc-mapping.org/grantlot/${props.popUpProps.Lot}' target='_blank'>${props.popUpProps.Lot}</a><br><br><b>Start:</b> <i>${props.popUpProps.day1} ${props.popUpProps.year1}</i><br><b>End:</b> <i>${props.popUpProps.day2} ${props.popUpProps.year2}</i><br><br><b>Description (partial):</b><br>${props.popUpProps.descriptio}<br><br>`;
    }
    else
    {
        if(props.popUpProps.name === "Fort Amsterdam")
        {
            return (
                <div id='rightInfoBar' className='rightInfoBarBorder'>
                    <div className="infoLayerElem" id="infoLayerDutchGrants">
                    <h3>Dutch Grant</h3>
                    <br/><b>Dutch Grant Lot:</b><a href='https://encyclopedia.nahc-mapping.org/lots/grantlotFort Amsterdam' target='_blank'>Fort Amsterdam</a>
                    <br/><br/><b>From Party:</b> 
                    <i>
                        <a target="_blank" href="https://nahc-mapping.org/mappingNY/encyclopedia/node/3277">DWIC - Corporation - Dutch West India Company (DWIC)</a>
                    </i>
                    <br/><br/><br/>
                    <img src='https://encyclopedia.nahc-mapping.org/sites/default/files/2022-02/Fort%20Amsterdam%20warm%201%20mg%201650%20Len%20Tantillo_0.jpg' width='258' ></img>
                    <br/><br/>
                    </div>
                </div>
            );
        }
        else
        {
            const hrefUrl: string = "https://encyclopedia.nahc-mapping.org/lots/taxlot" + props.popUpProps.Lot;
            return (
            <div id ='rightInfoBar' className= 'rightInfoBarBorder'>
                <div className="infoLayerElem" id="infoLayerDutchGrants">
                    <h3>Dutch Grant</h3>
                    {props.popUpProps.name}
                    <br/><b>Dutch Grant Lot:</b> <a href={hrefUrl} target='_blank'>{props.popUpProps.Lot}</a>
                    <br/><br/>
                    <b>Start:</b> <i>{props.popUpProps.day1} {props.popUpProps.year1}</i>
                    <br/>
                    <b>End:</b> <i>{props.popUpProps.day2} {props.popUpProps.year2}</i>
                    <br/><br/>
                    <b>Description (partial):</b>
                    <br/>{props.popUpProps.descriptio}
                    <br/><br/>
                </div>
            </div>
            );
        }
        
    }
  };
export default SliderPopUp;