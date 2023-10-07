import React, { useState } from 'react';

function ExampleComponent() {
    // Create a state variable to store the input value
    const [inputValue, setInputValue] = useState('');

    // Event handler function for the onChange event
    const handleInputChange = (e) => {
        // Update the state variable (inputValue) with the new value from the input field
        setInputValue(e.target.value);
    };

    return (
        <div>
            <h1>Example Component</h1>
            <input
                type="text"
                value={inputValue} // Bind the input value to the state variable
                onChange={handleInputChange} // Set the onChange event handler
                placeholder="Type something..."
            />
            <p>You typed: {inputValue}</p>
        </div>
    );
}

export default ExampleComponent;
