
type DatePanelComponentProps = {
    currDate: moment.Moment | null;
}

const DatePanelComponent = (props: DatePanelComponentProps) => {

    return (
        <div id="datepanel">
            <b><span id="date">{props.currDate ? props.currDate.format("DD MMM YYYY") : ""}</span></b>
        </div>
    )
}

export default DatePanelComponent