import React from "react";
import { Outlet } from "react-router-dom";

const UserPage = ({phase, data, input, deleter}) => {
    return (
      <>
        <Outlet context={{
          userStates: { phase, data, input },
          actions: { deleter }
         }} />
      </>
    );
}

export default UserPage;