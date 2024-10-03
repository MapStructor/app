import moment from "moment";
import {Slider} from "@nextui-org/slider";
import { useState } from "react";

type RulerComponentProps = {
    callback: (date: moment.Moment) => void;
}

const RulerComponent = (props: RulerComponentProps) => {
    const [currDate, setCurrDate] = useState<moment.Moment | null>(null);
    var sliderStart: number = moment("01/01/1626").unix();
    var sliderStartDrag: number = sliderStart;
    var sliderEnd: number = moment("01/01/1700").unix();
    var sliderEndDrag: number = sliderEnd;
    var sliderMiddle: number = (sliderStart + sliderEnd) / 2;
    var tooltiPos: number = -100;
  
    var ruler_step: number = (sliderEnd - sliderStart) / 10,
    date_ruler1: number = sliderStart + ruler_step,
    date_ruler2: number = sliderStart + ruler_step * 3,
    date_ruler3: number = sliderStart + ruler_step * 5,
    date_ruler4: number = sliderStart + ruler_step * 7,
    date_ruler5: number = sliderStart + ruler_step * 9; 

    const setAndSerializeDate = (currDate: number) => {
        let newDate = moment.unix(currDate);

        props.callback(newDate);
        setCurrDate(newDate);
    }

    if(currDate == null) {
        setAndSerializeDate(sliderMiddle);
    }

    return (
        <>
        <div id="slider">
            <div id="mobi-year">&nbsp; &#8678; &nbsp; TIME &nbsp; &nbsp; &nbsp; &nbsp; SLIDE &nbsp; &#8680;</div>
            <Slider minValue={sliderStart} maxValue={sliderEnd} step={86400} defaultValue={sliderMiddle} onChange={(date) => setAndSerializeDate(Array.isArray(date) ? date[0] : date)}></Slider>
            <div className="timeline">
                <div className="year">
                    <span id="ruler-date1"> { moment.unix(date_ruler1).year() ?? '...' } </span><span className="timeline-ruler"></span>
                </div>
                <div className="year">
                    <span id="ruler-date2"> { moment.unix(date_ruler2).year() ?? '...' } </span><span className="timeline-ruler"></span>
                </div>
                <div className="year">
                    <span id="ruler-date3"> { moment.unix(date_ruler3).year() ?? '...' } </span><span className="timeline-ruler"></span>
                </div>
                <div className="year">
                    <span id="ruler-date4"> { moment.unix(date_ruler4).year() ?? '...' } </span><span className="timeline-ruler"></span>
                </div>
                <div className="year">
                    <span id="ruler-date5"> { moment.unix(date_ruler5).year() ?? '...' } </span><span className="timeline-ruler"></span>
                </div>
            </div>
        </div>
        </>
    );
}

export default RulerComponent