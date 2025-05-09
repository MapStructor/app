import { CSSProperties } from "react";

export default function MapForm() {


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
    
    return(
        <form style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h2 style={{ paddingBottom: '8px', color: '#333', textAlign: 'center' }}><strong>Add New Map</strong></h2>
        <div style={{ marginBottom: '15px' }}>
            <label style={labelStyling}>Name: </label>
            <input style={boxStyling} type="text" id="style-id" name="style-id"></input>
        </div>
        <div style={{ marginBottom: '15px' }}>
            <label style={labelStyling}>Style Id:</label>
            <input style={boxStyling} type="text" id="style-id" name="style-id"></input>
        </div>

        <button style={buttonStyling} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyling.backgroundColor!}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyling.backgroundColor!}
         type="submit">Submit</button>
    </form>
    )
}