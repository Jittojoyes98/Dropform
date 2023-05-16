import React from "react";
import { editorStore } from "./EditorStore";


const EditorDesignSettings = () => {
    const closeSettings = editorStore((state)=>state.closeSettings)

    return (
        <div>
            <p>EditorDesignSettings</p>
            <div onClick={closeSettings}>
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" class="close-svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.99931 10.9751L15.0242 16.0014L16 15.027L10.9737 10.0007L16 4.97577L15.0256 4L9.99931 9.0263L4.97439 4L4 4.97577L9.02492 10.0007L4 15.0256L4.97439 16.0014L9.99931 10.9751Z" fill="#8092AC"></path></svg>
            </div>
        </div>
    )
};

export default EditorDesignSettings;
