import React from "react";

const UIMsg = ({ status }) => {
   
    const msgMapper = {
        load: "...loading",
        serverError: "internal server error. Please try again.",
        
    }

    function uimsger() {
        return msgMapper[status];
    }
    return (
      <>
            <p>{uimsger()}</p>
            <button hidden={status!=="serverError"}>retry</button>
            
      </>
    );
}

export default UIMsg;