import { useState } from "react";
import RulerComponent from "./ruler/ruler.component";
import DatePanelComponent from "./date-panel/date-panel.component";

type SliderWithDatePanelProps = {
    callback: (date: moment.Moment | null) => void;
}

const SliderWithDatePanel = (props: SliderWithDatePanelProps) => {
    const [currDate, setCurrDate] = useState<moment.Moment | null>(null)

    const setDateValues = (dateResult: moment.Moment | null) => {
        setCurrDate(dateResult)
        props.callback(dateResult);
    }

    return (
        <>
            <DatePanelComponent currDate={currDate}></DatePanelComponent>

            <div id="footer">
                <RulerComponent callback={(dateResult: moment.Moment | null) => setDateValues(dateResult)}></RulerComponent>
            </div>
        </>
    );
}

export default SliderWithDatePanel;