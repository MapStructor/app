import { useState } from "react"
import { HexColorPicker } from "react-colorful";

type ColorPickerButtonProps = {
    callback: (newColor: string) => void
}

const ColorPickerButton = (props: ColorPickerButtonProps) => {
    const [color, setColor] = useState<string>('#ffffff');
    const [showColorModal, setShowColorModal] = useState<boolean>(false);

    const updateColor = (newColor: string) => {
        setColor(newColor);
        props.callback(newColor);
    };

    return (
        <>
        <div style={{
            background: color,
            width: '30px',
            height: '25px',
            border: '1px solid black'
        }} onClick={() => setShowColorModal(!showColorModal)}>
        </div>
        {
            showColorModal && <HexColorPicker color={color} onChange={updateColor} />
        }
        </>
    )
}

export default ColorPickerButton